import { AntecedentType } from '../entities/antecedent.entity';

export class AntecedentUpdatedEvent {
  constructor(
    public readonly antecedentId: number,
    public readonly historyId: number,
    public readonly type?: AntecedentType,
    public readonly description?: string,
    public readonly metadata?: {
      timestamp?: Date;
      userId?: number;
      source?: string;
    },
  ) {}

  toJSON() {
    return {
      eventType: 'antecedent.updated',
      antecedentId: this.antecedentId,
      historyId: this.historyId,
      type: this.type,
      description: this.description,
      metadata: {
        timestamp: this.metadata?.timestamp || new Date(),
        userId: this.metadata?.userId,
        source: this.metadata?.source || 'ehr-service',
      },
    };
  }
}
