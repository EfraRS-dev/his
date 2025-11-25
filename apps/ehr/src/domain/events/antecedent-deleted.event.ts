export class AntecedentDeletedEvent {
  constructor(
    public readonly antecedentId: number,
    public readonly historyId: number,
    public readonly metadata?: {
      timestamp?: Date;
      userId?: number;
      source?: string;
    },
  ) {}

  toJSON() {
    return {
      eventType: 'antecedent.deleted',
      antecedentId: this.antecedentId,
      historyId: this.historyId,
      metadata: {
        timestamp: this.metadata?.timestamp || new Date(),
        userId: this.metadata?.userId,
        source: this.metadata?.source || 'ehr-service',
      },
    };
  }
}
