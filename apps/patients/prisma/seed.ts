import { PrismaClient, Gender, Status } from './generated/client';

const prisma = new PrismaClient();

/**
 * Limpia las tablas relacionadas antes de insertar nuevos datos
 */
async function resetTables(): Promise<void> {
  console.info('🗑️  Limpiando tablas existentes...');
  await prisma.patient.deleteMany();
  console.info('✅ Tablas limpiadas correctamente');
}

/**
 * Crea los pacientes del sistema
 */
async function seedPatients(): Promise<void> {
  console.info('🏥 Creando pacientes...');

  await prisma.patient.createMany({
    data: [
      {
        patientId: 1,
        userId: 7, // Vinculado con patient.doe del microservicio de usuarios
        documentType: 'DNI',
        documentNumber: '12345678',
        firstName: 'John',
        lastName: 'Doe',
        birthDate: new Date('1985-03-15'),
        gender: Gender.Male,
        address: '123 Main St, Springfield',
        phone: '+1-555-0101',
        email: 'john.doe@email.com',
        emergencyContact: '+1-555-0102 (Jane Doe)',
        status: Status.active,
      },
      {
        patientId: 2,
        userId: 8, // Vinculado con patient.rodriguez del microservicio de usuarios
        documentType: 'DNI',
        documentNumber: '23456789',
        firstName: 'Maria',
        lastName: 'Rodriguez',
        birthDate: new Date('1990-07-22'),
        gender: Gender.Female,
        address: '456 Oak Ave, Springfield',
        phone: '+1-555-0201',
        email: 'maria.rodriguez@email.com',
        emergencyContact: '+1-555-0202 (Carlos Rodriguez)',
        status: Status.active,
      },
      {
        patientId: 3,
        userId: null, // Sin cuenta de usuario
        documentType: 'Passport',
        documentNumber: 'AB123456',
        firstName: 'Robert',
        lastName: 'Chen',
        birthDate: new Date('1978-11-30'),
        gender: Gender.Male,
        address: '789 Pine Rd, Springfield',
        phone: '+1-555-0301',
        email: 'robert.chen@email.com',
        emergencyContact: '+1-555-0302 (Lisa Chen)',
        status: Status.active,
      },
      {
        patientId: 4,
        userId: null,
        documentType: 'DNI',
        documentNumber: '34567890',
        firstName: 'Sarah',
        lastName: 'Williams',
        birthDate: new Date('1995-05-10'),
        gender: Gender.Female,
        address: '321 Elm St, Springfield',
        phone: '+1-555-0401',
        email: 'sarah.williams@email.com',
        emergencyContact: '+1-555-0402 (Tom Williams)',
        status: Status.active,
      },
      {
        patientId: 5,
        userId: null,
        documentType: 'DNI',
        documentNumber: '45678901',
        firstName: 'Ahmed',
        lastName: 'Hassan',
        birthDate: new Date('1982-09-18'),
        gender: Gender.Male,
        address: '654 Maple Dr, Springfield',
        phone: '+1-555-0501',
        email: 'ahmed.hassan@email.com',
        emergencyContact: '+1-555-0502 (Fatima Hassan)',
        status: Status.active,
      },
    ],
  });

  console.info('✅ 5 pacientes creados correctamente');
}

/**
 * Función principal de seeding
 */
async function main(): Promise<void> {
  console.info('🌱 Iniciando seed de base de datos de pacientes...\n');

  try {
    await resetTables();
    await seedPatients();

    console.info('\n✅ Seed completado exitosamente');
    console.info('\n📊 Resumen:');
    console.info('  - 5 pacientes registrados');
    console.info('  - 2 pacientes vinculados a cuentas de usuario');
    console.info('  - 3 pacientes sin cuenta de usuario');
    console.info('\n🔍 Pacientes para pruebas de Triage:');
    console.info('  - Paciente 1 (John Doe): Dolor moderado en pecho');
    console.info('  - Paciente 2 (Maria Rodriguez): ACV - Urgencia crítica');
    console.info('  - Paciente 3 (Robert Chen): Cefalea persistente');
    console.info('  - Paciente 4 (Sarah Williams): Fractura expuesta');
    console.info('  - Paciente 5 (Ahmed Hassan): Control de rutina');
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
