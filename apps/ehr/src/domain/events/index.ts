export * from './medical-history-created.event';
export * from './medical-history-archived.event';
export * from './medical-history-unarchived.event';
export * from './antecedent-created.event';
export * from './antecedent-updated.event';
export * from './antecedent-deleted.event';

export type EhrEvent =
  | ReturnType<
      import('./medical-history-created.event').MedicalHistoryCreatedEvent['toJSON']
    >
  | ReturnType<
      import('./medical-history-archived.event').MedicalHistoryArchivedEvent['toJSON']
    >
  | ReturnType<
      import('./medical-history-unarchived.event').MedicalHistoryUnarchivedEvent['toJSON']
    >
  | ReturnType<
      import('./antecedent-created.event').AntecedentCreatedEvent['toJSON']
    >
  | ReturnType<
      import('./antecedent-updated.event').AntecedentUpdatedEvent['toJSON']
    >
  | ReturnType<
      import('./antecedent-deleted.event').AntecedentDeletedEvent['toJSON']
    >;
