import { TriageEvent } from '../../domain/events';

export interface IEventPublisher {
  publishEvent(event: TriageEvent): void;
}
