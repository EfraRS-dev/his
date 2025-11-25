export * from './patient-registered.event';
export * from './patient-updated.event';
export * from './patient-archived.event';

export type PatientEvent =
  | ReturnType<
      import('./patient-registered.event').PatientRegisteredEvent['toJSON']
    >
  | ReturnType<import('./patient-updated.event').PatientUpdatedEvent['toJSON']>
  | ReturnType<
      import('./patient-archived.event').PatientArchivedEvent['toJSON']
    >;
