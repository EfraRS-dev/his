export * from './triage-created.event';
export * from './triage-updated.event';
export * from './priority-changed.event';
export * from './vital-signs-registered.event';
export * from './triage-deleted.event';

export type TriageEvent =
  | ReturnType<import('./triage-created.event').TriageCreatedEvent['toJSON']>
  | ReturnType<import('./triage-updated.event').TriageUpdatedEvent['toJSON']>
  | ReturnType<
      import('./priority-changed.event').PriorityChangedEvent['toJSON']
    >
  | ReturnType<
      import('./vital-signs-registered.event').VitalSignsRegisteredEvent['toJSON']
    >
  | ReturnType<import('./triage-deleted.event').TriageDeletedEvent['toJSON']>;
