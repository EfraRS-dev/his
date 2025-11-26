import { PrismaClient } from './generated/client';

const prisma = new PrismaClient();

/**
 * Limpia las tablas relacionadas antes de insertar nuevos datos
 */
async function resetTables(): Promise<void> {
  console.info('🗑️  Limpiando tablas existentes...');
  await prisma.$transaction([
    prisma.clinicalDocument.deleteMany(),
    prisma.antecedent.deleteMany(),
    prisma.clinicalEntry.deleteMany(),
    prisma.medicalHistory.deleteMany(),
  ]);
  console.info('✅ Tablas limpiadas correctamente');
}

/**
 * Crea las historias médicas y entradas clínicas
 */
async function seedMedicalHistories(): Promise<void> {
  console.info('📋 Creando historias médicas...');

  // Historia médica del Paciente 1 - John Doe (Dolor en pecho)
  await prisma.medicalHistory.create({
    data: {
      historyId: 1,
      patientId: 1,
      openedAt: new Date('2020-01-15'),
      status: true,
      antecedents: {
        create: [
          {
            type: 'Personal',
            description: 'Hipertensión diagnosticada en 2018',
          },
          {
            type: 'Familiar',
            description: 'Padre con enfermedad cardíaca',
          },
        ],
      },
      clinicalEntries: {
        create: [
          {
            date: new Date('2023-06-10'),
            type: 'Consulta',
            reasonForVisit: 'Control anual',
            diagnosis: 'Hipertensión controlada',
            notes: 'Continuar medicación actual',
            doctorId: 2, // dr.smith
            clinicalDocuments: {
              create: [
                {
                  type: 'Resultados de laboratorio',
                  fileUrl: '/documents/patient1-lab-2023-06-10.pdf',
                  metadata: { testType: 'Análisis de sangre', normal: true },
                },
              ],
            },
          },
          {
            date: new Date('2025-11-15'),
            type: 'Emergencia',
            reasonForVisit: 'Dolor en el pecho',
            diagnosis: 'Angina - requiere evaluación adicional',
            notes: 'Referido a cardiología. Iniciado tratamiento sintomático.',
            doctorId: 3, // dr.garcia
          },
        ],
      },
    },
  });

  // Historia médica del Paciente 2 - Maria Rodriguez (ACV)
  await prisma.medicalHistory.create({
    data: {
      historyId: 2,
      patientId: 2,
      openedAt: new Date('2021-03-20'),
      status: true,
      antecedents: {
        create: [
          {
            type: 'Personal',
            description: 'Sin antecedentes relevantes',
          },
        ],
      },
      clinicalEntries: {
        create: [
          {
            date: new Date('2025-11-16'),
            type: 'Emergencia',
            reasonForVisit: 'Paciente inconsciente, posible ACV',
            diagnosis: 'Accidente cerebrovascular isquémico agudo',
            notes: 'Código ACV activado. Administrado tPA. Paciente en UCI.',
            doctorId: 2, // dr.smith
            clinicalDocuments: {
              create: [
                {
                  type: 'Imagen',
                  fileUrl: '/documents/patient2-mri-2025-11-16.dcm',
                  metadata: {
                    imagingType: 'Resonancia magnética cerebral',
                    findings: 'ACV isquémico hemisferio derecho',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Historia médica del Paciente 3 - Robert Chen (Cefalea)
  await prisma.medicalHistory.create({
    data: {
      historyId: 3,
      patientId: 3,
      openedAt: new Date('2019-08-05'),
      status: true,
      antecedents: {
        create: [
          {
            type: 'Personal',
            description: 'Migrañas crónicas desde 2015',
          },
          {
            type: 'Alergias',
            description: 'Alergia a la penicilina',
          },
        ],
      },
      clinicalEntries: {
        create: [
          {
            date: new Date('2025-11-14'),
            type: 'Consulta',
            reasonForVisit: 'Cefalea persistente de 48 horas',
            diagnosis: 'Migraña con aura',
            notes: 'Prescrito sumatriptán. Seguimiento en 2 semanas.',
            doctorId: 3, // dr.garcia
          },
        ],
      },
    },
  });

  // Historia médica del Paciente 4 - Sarah Williams (Fractura)
  await prisma.medicalHistory.create({
    data: {
      historyId: 4,
      patientId: 4,
      openedAt: new Date('2022-11-12'),
      status: true,
      antecedents: {
        create: [
          {
            type: 'Personal',
            description: 'Sin antecedentes médicos relevantes',
          },
        ],
      },
      clinicalEntries: {
        create: [
          {
            date: new Date('2025-11-16'),
            type: 'Emergencia',
            reasonForVisit: 'Fractura expuesta en brazo derecho tras caída',
            diagnosis: 'Fractura abierta de radio y cúbito',
            notes:
              'Reducción cerrada realizada. Inmovilización con yeso. Antibióticos profilácticos.',
            doctorId: 2, // dr.smith
            clinicalDocuments: {
              create: [
                {
                  type: 'Imagen',
                  fileUrl: '/documents/patient4-xray-2025-11-16.dcm',
                  metadata: {
                    imagingType: 'Radiografía de antebrazo',
                    findings: 'Fractura desplazada de radio y cúbito',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Historia médica del Paciente 5 - Ahmed Hassan (Control rutina)
  await prisma.medicalHistory.create({
    data: {
      historyId: 5,
      patientId: 5,
      openedAt: new Date('2023-05-25'),
      status: true,
      antecedents: {
        create: [
          {
            type: 'Personal',
            description: 'Hipercolesterolemia leve',
          },
        ],
      },
      clinicalEntries: {
        create: [
          {
            date: new Date('2025-11-16'),
            type: 'Consulta',
            reasonForVisit: 'Control de rutina',
            diagnosis: 'Paciente sano, sin hallazgos patológicos',
            notes: 'Control de colesterol en 6 meses. Mantener dieta saludable.',
            doctorId: 3, // dr.garcia
          },
        ],
      },
    },
  });

  console.info('✅ 5 historias médicas creadas correctamente');
}

/**
 * Función principal de seeding
 */
async function main(): Promise<void> {
  console.info('🌱 Iniciando seed de base de datos de EHR...\n');

  try {
    await resetTables();
    await seedMedicalHistories();

    const historyCount = await prisma.medicalHistory.count();
    const entryCount = await prisma.clinicalEntry.count();
    const antecedentCount = await prisma.antecedent.count();
    const documentCount = await prisma.clinicalDocument.count();

    console.info('\n✅ Seed completado exitosamente');
    console.info('\n📊 Resumen:');
    console.info(`  - ${historyCount} historias médicas`);
    console.info(`  - ${entryCount} entradas clínicas`);
    console.info(`  - ${antecedentCount} antecedentes`);
    console.info(`  - ${documentCount} documentos clínicos`);
    console.info('\n🔍 Historias por paciente:');
    console.info('  - Paciente 1 (John Doe): Hipertensión + Angina');
    console.info('  - Paciente 2 (Maria Rodriguez): ACV isquémico agudo');
    console.info('  - Paciente 3 (Robert Chen): Migrañas crónicas');
    console.info('  - Paciente 4 (Sarah Williams): Fractura abierta');
    console.info('  - Paciente 5 (Ahmed Hassan): Control rutinario');
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
