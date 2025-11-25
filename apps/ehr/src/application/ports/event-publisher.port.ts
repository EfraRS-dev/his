import { EhrEvent } from '../../domain/events';

export interface IEventPublisher {
  publishEvent(event: EhrEvent): void;
}
