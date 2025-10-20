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
    patientId: 101,
    nurseId: 12,
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
    patientId: 102,
    nurseId: 15,
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
    patientId: 103,
    nurseId: 18,
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
];

async function resetTables(): Promise<void> {
  await prisma.$transaction([
    prisma.vitalSigns.deleteMany(),
    prisma.triage.deleteMany(),
  ]);
}

async function seedTriageData(): Promise<void> {
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
}

async function main(): Promise<void> {
  console.info('🌱 Starting triage database seed...');
  await resetTables();
  await seedTriageData();
  console.info(
    `✅ Seed complete: ${TRIAGE_SEED_DATA.length} triage records inserted.`,
  );
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
