import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.vitalSigns.deleteMany();
  await prisma.triage.deleteMany();

  // minimal sample records
  const triage1 = await prisma.triage.create({
    data: {
      patientId: 1,
      nurseId: 101,
      urgencyLevel: 3,
      isActive: true,
      initialObservations: 'Dolor moderado, consciente',
      vitalSigns: {
        create: [
          {
            temperature: 37.2,
            heartRate: 88,
            respiratoryRate: 16,
            bloodPressure: '120/80',
            oxygenSaturation: 98,
          },
        ],
      },
    },
  });

  const triage2 = await prisma.triage.create({
    data: {
      patientId: 2,
      nurseId: 102,
      urgencyLevel: 1,
      isActive: true,
      initialObservations: 'Insuficiencia respiratoria',
      vitalSigns: {
        create: [
          {
            temperature: 38.6,
            heartRate: 120,
            respiratoryRate: 28,
            bloodPressure: '90/55',
            oxygenSaturation: 90,
          },
        ],
      },
    },
  });

  console.log({ triage1: triage1.id, triage2: triage2.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
