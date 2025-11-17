import { PrismaClient } from './generated/client';

const prisma = new PrismaClient();

type SeedTriage = {
  patientId: number;
  nurseId: number;
  urgencyLevel: 1 | 2 | 3 | 4 | 5;
  initialObservations: string;
  vitalSigns: {
    temperature: number;
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    additionalNotes?: string;
  };
};

const TRIAGE_SEED_DATA: SeedTriage[] = [
  {
    patientId: 1, // Cambia por IDs reales del microservicio de pacientes
    nurseId: 1, // Cambia por IDs reales del microservicio de usuarios (enfermeros)
    urgencyLevel: 3,
    initialObservations: 'Paciente con dolor moderado en el pecho.',
    vitalSigns: {
      temperature: 37.4,
      bloodPressure: '125/82',
      heartRate: 84,
      respiratoryRate: 18,
      oxygenSaturation: 97,
      additionalNotes: 'Sin antecedentes relevantes.',
    },
  },
  {
    patientId: 2,
    nurseId: 1,
    urgencyLevel: 1,
    initialObservations: 'Paciente inconsciente, posible ACV.',
    vitalSigns: {
      temperature: 36.9,
      bloodPressure: '160/100',
      heartRate: 110,
      respiratoryRate: 24,
      oxygenSaturation: 89,
      additionalNotes: 'Respiración irregular.',
    },
  },
  {
    patientId: 3,
    nurseId: 2,
    urgencyLevel: 4,
    initialObservations: 'Paciente con cefalea persistente de 48 horas.',
    vitalSigns: {
      temperature: 37.1,
      bloodPressure: '135/88',
      heartRate: 76,
      respiratoryRate: 17,
      oxygenSaturation: 98,
      additionalNotes: 'Refiere sensibilidad a la luz.',
    },
  },
  {
    patientId: 4,
    nurseId: 2,
    urgencyLevel: 2,
    initialObservations: 'Fractura expuesta en brazo derecho tras caída.',
    vitalSigns: {
      temperature: 36.8,
      bloodPressure: '130/85',
      heartRate: 92,
      respiratoryRate: 20,
      oxygenSaturation: 96,
      additionalNotes: 'Hemorragia controlada.',
    },
  },
  {
    patientId: 5,
    nurseId: 3,
    urgencyLevel: 5,
    initialObservations: 'Control de rutina, sin síntomas agudos.',
    vitalSigns: {
      temperature: 36.5,
      bloodPressure: '120/80',
      heartRate: 72,
      respiratoryRate: 16,
      oxygenSaturation: 99,
      additionalNotes: 'Paciente estable.',
    },
  },
];

/**
 * Limpia las tablas relacionadas antes de insertar nuevos datos
 */
async function resetTables(): Promise<void> {
  console.info('🗑️  Limpiando tablas existentes...');
  await prisma.$transaction([
    prisma.vitalSigns.deleteMany(),
    prisma.triage.deleteMany(),
  ]);
  console.info('✅ Tablas limpiadas correctamente');
}

/**
 * Inserta los datos de triage y signos vitales
 */
async function seedTriageData(): Promise<void> {
  console.info('📝 Insertando datos de triage...');

  await prisma.$transaction(
    TRIAGE_SEED_DATA.map((triage) =>
      prisma.triage.create({
        data: {
          patientId: triage.patientId,
          nurseId: triage.nurseId,
          urgencyLevel: triage.urgencyLevel,
          initialObservations: triage.initialObservations,
          vitalSigns: {
            create: {
              temperature: triage.vitalSigns.temperature,
              bloodPressure: triage.vitalSigns.bloodPressure,
              heartRate: triage.vitalSigns.heartRate,
              respiratoryRate: triage.vitalSigns.respiratoryRate,
              oxygenSaturation: triage.vitalSigns.oxygenSaturation,
              additionalNotes: triage.vitalSigns.additionalNotes,
            },
          },
        },
      }),
    ),
  );

  console.info(`✅ ${TRIAGE_SEED_DATA.length} registros de triage insertados`);
}

/**
 * Función principal de seeding
 */
async function main(): Promise<void> {
  console.info('🌱 Iniciando seed de base de datos de triage...\n');

  try {
    await resetTables();
    await seedTriageData();

    console.info('\n✅ Seed completado exitosamente');
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
