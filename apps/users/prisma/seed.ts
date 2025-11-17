import { PrismaClient, RolesName, Status } from './generated/client';

const prisma = new PrismaClient();

/**
 * Limpia las tablas relacionadas antes de insertar nuevos datos
 */
async function resetTables(): Promise<void> {
  console.info('🗑️  Limpiando tablas existentes...');
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.role.deleteMany(),
  ]);
  console.info('✅ Tablas limpiadas correctamente');
}

/**
 * Crea los roles del sistema
 */
async function seedRoles(): Promise<void> {
  console.info('👔 Creando roles...');

  await prisma.role.createMany({
    data: [
      {
        roleId: 1,
        name: RolesName.Admin,
        permissions: 'all',
      },
      {
        roleId: 2,
        name: RolesName.Doctor,
        permissions: 'read,write,diagnose,prescribe',
      },
      {
        roleId: 3,
        name: RolesName.Nurse,
        permissions: 'read,write,triage,vital_signs',
      },
      {
        roleId: 4,
        name: RolesName.Patient,
        permissions: 'read_own',
      },
    ],
  });

  console.info('✅ 4 roles creados correctamente');
}

/**
 * Crea los usuarios del sistema
 */
async function seedUsers(): Promise<void> {
  console.info('👥 Creando usuarios...');

  await prisma.user.createMany({
    data: [
      // Admin
      {
        userId: 1,
        username: 'admin',
        passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456', // "admin123"
        roleId: 1,
        email: 'admin@hospital.com',
        status: Status.active,
      },
      // Doctores
      {
        userId: 2,
        username: 'dr.smith',
        passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456', // "doctor123"
        roleId: 2,
        email: 'dr.smith@hospital.com',
        status: Status.active,
      },
      {
        userId: 3,
        username: 'dr.garcia',
        passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456', // "doctor123"
        roleId: 2,
        email: 'dr.garcia@hospital.com',
        status: Status.active,
      },
      // Enfermeros (usados en Triage)
      {
        userId: 4,
        username: 'nurse.johnson',
        passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456', // "nurse123"
        roleId: 3,
        email: 'nurse.johnson@hospital.com',
        status: Status.active,
      },
      {
        userId: 5,
        username: 'nurse.martinez',
        passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456', // "nurse123"
        roleId: 3,
        email: 'nurse.martinez@hospital.com',
        status: Status.active,
      },
      {
        userId: 6,
        username: 'nurse.brown',
        passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456', // "nurse123"
        roleId: 3,
        email: 'nurse.brown@hospital.com',
        status: Status.active,
      },
      // Pacientes
      {
        userId: 7,
        username: 'patient.doe',
        passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456', // "patient123"
        roleId: 4,
        email: 'john.doe@email.com',
        status: Status.active,
      },
      {
        userId: 8,
        username: 'patient.rodriguez',
        passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456', // "patient123"
        roleId: 4,
        email: 'maria.rodriguez@email.com',
        status: Status.active,
      },
    ],
  });

  console.info('✅ 8 usuarios creados correctamente');
}

/**
 * Función principal de seeding
 */
async function main(): Promise<void> {
  console.info('🌱 Iniciando seed de base de datos de usuarios...\n');

  try {
    await resetTables();
    await seedRoles();
    await seedUsers();

    console.info('\n✅ Seed completado exitosamente');
    console.info('\n📊 Resumen:');
    console.info('  - 4 roles');
    console.info('  - 8 usuarios (1 admin, 2 doctores, 3 enfermeros, 2 pacientes)');
    console.info('\n🔑 Credenciales de prueba:');
    console.info('  Admin: admin / admin123');
    console.info('  Doctor: dr.smith / doctor123');
    console.info('  Enfermero: nurse.johnson / nurse123');
    console.info('  Paciente: patient.doe / patient123');
  } catch (error) {
    console.error('\n❌ Error durante el seed:', error);
    throw error;
  }
}

main()
  .catch((error) => {
    console.error('❌ El seed falló:', error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
