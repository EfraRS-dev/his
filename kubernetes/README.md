# HIS Kubernetes Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Ingress                              │
│                    (his.local / HTTPS)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
                  ┌────────────────┐
                  │  API Gateway   │ (3 replicas)
                  └────────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
    ┌─────────┐      ┌─────────┐    ┌─────────┐
    │Patients │      │  Users  │    │ Triage  │
    │Service  │      │ Service │    │ Service │
    │(2 rep)  │      │ (2 rep) │    │ (2 rep) │
    └────┬────┘      └────┬────┘    └────┬────┘
         │                │              │
         ▼                ▼              ▼
    ┌─────────┐      ┌─────────┐    ┌─────────┐
    │patients-│      │users-db │    │triage-db│
    │   db    │      │(StatefulSet)  │(StatefulSet)
    │(StatefulSet)   └─────────┘    └─────────┘
    └─────────┘
```

## Prerequisites

1. **Kubernetes cluster** (1.24+)
   - Minikube (local)
   - Docker Desktop with Kubernetes
   - Cloud provider (AKS, EKS, GKE)

2. **kubectl** CLI installed and configured

3. **NGINX Ingress Controller** installed

   ```powershell
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.4/deploy/static/provider/cloud/deploy.yaml
   ```

4. **Docker images built** for all services

   ```powershell
   # Build all images
   docker build -t his-patients:latest -f apps/patients/Dockerfile .
   docker build -t his-users:latest -f apps/users/Dockerfile .
   docker build -t his-triage:latest -f apps/triage/Dockerfile .
   docker build -t his-ehr:latest -f apps/ehr/Dockerfile .
   docker build -t his-api-gateway:latest -f apps/api-gateway/Dockerfile .
   ```

## Deployment Steps

### Step 1: Create Namespace

```powershell
kubectl apply -f kubernetes/00-namespace.yaml
```

**What it does:**

- Creates the `his` namespace
- Isolates all HIS resources from other workloads
- Provides better organization and RBAC

**Verify:**

```powershell
kubectl get namespace his
```

---

### Step 2: Deploy Secrets and ConfigMaps

```powershell
kubectl apply -f kubernetes/01-secrets-configmaps.yaml
```

**What it does:**

- Creates Secrets for database credentials (encoded in base64)
- Creates ConfigMaps for non-sensitive configuration
- Separates sensitive data from application code

**Contains:**

- 4 Database Secrets (patients, users, triage, ehr)
- 4 Application ConfigMaps with connection settings

**Verify:**

```powershell
kubectl get secrets -n his
kubectl get configmaps -n his
```

**Security Note:** In production, use external secret managers like:

- Azure Key Vault
- AWS Secrets Manager
- HashiCorp Vault
- Sealed Secrets

---

### Step 3: Deploy PostgreSQL Databases

```powershell
kubectl apply -f kubernetes/02-postgres-statefulsets-and-services.yaml
```

**What it does:**

- Creates 4 PostgreSQL StatefulSets (one per microservice)
- Creates persistent volumes for data storage
- Creates headless Services for stable network identity
- Sets up health checks (liveness/readiness probes)

**StatefulSets provide:**

- Stable, unique network identifiers
- Stable, persistent storage
- Ordered, graceful deployment and scaling

**Wait for databases to be ready:**

```powershell
kubectl get statefulsets -n his
kubectl get pods -n his -l app=patients-db
kubectl get pods -n his -l app=users-db
kubectl get pods -n his -l app=triage-db
kubectl get pods -n his -l app=ehr-db
```

**All pods should show `1/1 RUNNING`**

---

### Step 4: Run Database Migrations (Important!)

Before deploying services, run Prisma migrations:

```powershell
# Option A: Run migrations from a temporary pod
kubectl run prisma-migrate-patients --rm -it --restart=Never `
  --image=his-patients:latest `
  --namespace=his `
  --env="PATIENTS_DB_URL=postgresql://patients_user:patients_pass@patients-db:5432/patients" `
  -- npx prisma migrate deploy --schema=apps/patients/prisma/schema.prisma

kubectl run prisma-migrate-users --rm -it --restart=Never `
  --image=his-users:latest `
  --namespace=his `
  --env="USER_DB_URL=postgresql://users_user:users_pass@users-db:5432/users" `
  -- npx prisma migrate deploy --schema=apps/users/prisma/schema.prisma

kubectl run prisma-migrate-triage --rm -it --restart=Never `
  --image=his-triage:latest `
  --namespace=his `
  --env="TRIAGE_DB_URL=postgresql://triage_user:triage_pass@triage-db:5432/triage" `
  -- npx prisma migrate deploy --schema=apps/triage/prisma/schema.prisma

kubectl run prisma-migrate-ehr --rm -it --restart=Never `
  --image=his-ehr:latest `
  --namespace=his `
  --env="EHR_DB_URL=postgresql://ehr_user:ehr_pass@ehr-db:5432/ehr" `
  -- npx prisma migrate deploy --schema=apps/ehr/prisma/schema.prisma
```

---

### Step 5: Deploy Microservices

```powershell
kubectl apply -f kubernetes/03-services-deployments.yaml
```

**What it does:**

- Creates Deployments for 5 microservices
- Creates ClusterIP Services for internal communication
- Configures environment variables from Secrets/ConfigMaps
- Sets up health checks and resource limits

**Deployments:**

- Patients: 2 replicas
- Users: 2 replicas
- Triage: 2 replicas
- EHR: 2 replicas
- API Gateway: 3 replicas (public-facing)

**Verify:**

```powershell
kubectl get deployments -n his
kubectl get pods -n his
kubectl get services -n his
```

**Wait for all pods to be ready:**

```powershell
kubectl wait --for=condition=ready pod -l app=patients -n his --timeout=120s
kubectl wait --for=condition=ready pod -l app=users -n his --timeout=120s
kubectl wait --for=condition=ready pod -l app=triage -n his --timeout=120s
kubectl wait --for=condition=ready pod -l app=ehr -n his --timeout=120s
kubectl wait --for=condition=ready pod -l app=api-gateway -n his --timeout=120s
```

---

### Step 6: Deploy Ingress

```powershell
kubectl apply -f kubernetes/04-ingress.yaml
```

**What it does:**

- Exposes API Gateway to external traffic
- Provides routing rules for microservices
- Enables CORS and rate limiting
- Maps `his.local` domain to the cluster

**Add to hosts file (for local testing):**

Windows: `C:\Windows\System32\drivers\etc\hosts`

```powershell
127.0.0.1  his.local
```

**Get Ingress address:**

```powershell
kubectl get ingress -n his
```

**For Minikube, enable ingress addon:**

```powershell
minikube addons enable ingress
minikube tunnel  # Run in separate terminal
```

---

## Verification & Testing

### 1. Check All Resources

```powershell
# Overview
kubectl get all -n his

# Detailed status
kubectl get pods -n his -o wide
kubectl get services -n his
kubectl get ingress -n his
```

### 2. Check Pod Logs

```powershell
# API Gateway logs
kubectl logs -f deployment/api-gateway -n his

# Triage service logs
kubectl logs -f deployment/triage -n his

# Database logs
kubectl logs -f statefulset/patients-db -n his
```

### 3. Test Endpoints

**Via Ingress:**

```powershell
# Health check
curl http://his.local/health

# API Gateway
curl http://his.local/

# Triage service
curl http://his.local/triage/health

# Patients service
curl http://his.local/patients/health
```

**Direct Service Access (for debugging):**

```powershell
# Port forward API Gateway
kubectl port-forward -n his service/api-gateway-service 8080:80

# Test locally
curl http://localhost:8080/health

# Port forward Triage
kubectl port-forward -n his service/triage-service 8081:3000
curl http://localhost:8081/triage/health
```

### 4. Database Connection Test

```powershell
# Connect to patients database
kubectl exec -it -n his patients-db-0 -- psql -U patients_user -d patients

# Inside psql:
\dt                    # List tables
SELECT * FROM "Patient" LIMIT 5;
\q                     # Quit
```

---

## Monitoring & Troubleshooting

### View Resource Usage

```powershell
kubectl top nodes
kubectl top pods -n his
```

### Describe Resources (for errors)

```powershell
kubectl describe pod <pod-name> -n his
kubectl describe deployment <deployment-name> -n his
```

### Check Events

```powershell
kubectl get events -n his --sort-by='.lastTimestamp'
```

### Common Issues

**1. ImagePullBackOff**

- Images not built locally
- Solution: Build images or use `imagePullPolicy: Never` for local

**2. CrashLoopBackOff**

- Database not ready
- Migration not run
- Solution: Check logs, verify DB connection, run migrations

**3. Pods stuck in Pending**

- Insufficient cluster resources
- PVC not bound
- Solution: Check node capacity, verify storage class

**4. Connection Refused to Database**

- Database pod not ready
- Wrong connection string
- Solution: Verify StatefulSet status, check Service DNS

---

## Scaling

### Scale Deployments

```powershell
# Scale API Gateway to 5 replicas
kubectl scale deployment api-gateway -n his --replicas=5

# Auto-scale based on CPU
kubectl autoscale deployment triage -n his --cpu-percent=70 --min=2 --max=10
```

### Scale Databases (Carefully!)

```powershell
# NOT recommended without proper backup/replication setup
kubectl scale statefulset patients-db -n his --replicas=3
```

---

## Cleanup

### Delete Everything

```powershell
# Delete all resources in namespace
kubectl delete namespace his

# Or individually:
kubectl delete -f kubernetes/04-ingress.yaml
kubectl delete -f kubernetes/03-services-deployments.yaml
kubectl delete -f kubernetes/02-postgres-statefulsets-and-services.yaml
kubectl delete -f kubernetes/01-secrets-configmaps.yaml
kubectl delete -f kubernetes/00-namespace.yaml
```

### Delete PVCs (Persistent data)

```powershell
kubectl delete pvc -n his --all
```

---

## Production Considerations

### 1. Database Backups

- Set up scheduled CronJobs for pg_dump
- Use Velero for cluster-level backups
- Consider managed database services (Azure Database, RDS)

### 2. Secrets Management

```yaml
# Use external secrets operator
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: patients-db-secret
spec:
  secretStoreRef:
    name: azure-keyvault
  target:
    name: patients-db-secret
  data:
  - secretKey: POSTGRES_PASSWORD
    remoteRef:
      key: patients-db-password
```

### 3. TLS/HTTPS

- Install cert-manager
- Use Let's Encrypt for certificates
- Update Ingress with TLS config (see commented section in 04-ingress.yaml)

### 4. Monitoring

```powershell
# Install Prometheus + Grafana
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/bundle.yaml

# Or use Helm
helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring
```

### 5. Logging

- Deploy ELK/EFK stack
- Use cloud-native solutions (Azure Monitor, CloudWatch)
- Configure log aggregation from all pods

### 6. Resource Limits

- Always set requests and limits
- Use PodDisruptionBudgets for HA
- Configure Horizontal Pod Autoscaler (HPA)

### 7. Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: patients-network-policy
  namespace: his
spec:
  podSelector:
    matchLabels:
      app: patients
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: api-gateway
    ports:
    - protocol: TCP
      port: 3000
```

---

## Quick Reference Commands

```powershell
# Deploy everything
kubectl apply -f kubernetes/

# Watch rollout
kubectl rollout status deployment/triage -n his

# Restart deployment
kubectl rollout restart deployment/api-gateway -n his

# Get pod shell
kubectl exec -it <pod-name> -n his -- /bin/sh

# Copy files
kubectl cp <pod-name>:/path/to/file ./local-file -n his

# Describe everything
kubectl get all -n his -o yaml > his-snapshot.yaml
```

---

## Architecture Decisions

### Why StatefulSets for Databases?

- Stable network identity (patients-db-0, patients-db-1)
- Ordered deployment and scaling
- Persistent storage tied to pod identity
- Better for stateful applications

### Why Headless Services?

- Direct pod-to-pod communication
- DNS returns pod IPs instead of load balancer IP
- Required for StatefulSet DNS resolution

### Why Multiple Replicas?

- High availability
- Zero-downtime deployments
- Load distribution
- Better resource utilization

### Why ConfigMaps + Secrets?

- Separation of concerns
- Easy updates without rebuilding images
- Better security (Secrets encrypted at rest)
- Environment-specific configuration

---

## Next Steps

1. **Set up CI/CD Pipeline**
   - GitHub Actions / Azure DevOps / Jenkins
   - Automated builds and deployments
   - Blue-green or canary deployments

2. **Implement Service Mesh**
   - Istio or Linkerd
   - Advanced traffic management
   - mTLS between services
   - Distributed tracing

3. **Add Observability**
   - Prometheus metrics
   - Grafana dashboards
   - Jaeger tracing
   - ELK logging

4. **Harden Security**
   - Pod Security Standards
   - Network Policies
   - RBAC rules
   - Image scanning

5. **Disaster Recovery**
   - Multi-region deployment
   - Automated backups
   - Failover procedures
   - Chaos engineering tests

---

## Support & Resources

- Kubernetes Docs: https://kubernetes.io/docs/
- NGINX Ingress: https://kubernetes.github.io/ingress-nginx/
- Prisma K8s: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-kubernetes
- Helm Charts: https://helm.sh/
