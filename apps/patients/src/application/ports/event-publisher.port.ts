import { PatientEvent } from '../../domain/events';

export interface IEventPublisher {
  publishEvent(event: PatientEvent): void;
}
