export interface NotificationEvent {
  id: string;
  eventType: string;
  timestamp: string;
  data: any;
  metadata?: {
    userId?: number;
    source: string;
  };
  read: boolean;
  receivedAt: Date;
}

export class NotificationStore {
  private notifications: NotificationEvent[] = [];
  private maxSize = 1000; // Keep last 1000 notifications

  addNotification(event: any): void {
    const notification: NotificationEvent = {
      id: this.generateId(),
      eventType: event.eventType || event.pattern || 'unknown',
      timestamp: event.timestamp || new Date().toISOString(),
      data: event.data || event,
      metadata: event.metadata || { source: 'unknown' },
      read: false,
      receivedAt: new Date(),
    };

    this.notifications.unshift(notification);

    // Keep only the last maxSize notifications
    if (this.notifications.length > this.maxSize) {
      this.notifications = this.notifications.slice(0, this.maxSize);
    }
  }

  getNotifications(filter?: {
    eventType?: string;
    read?: boolean;
    limit?: number;
    source?: string;
  }): NotificationEvent[] {
    let filtered = [...this.notifications];

    if (filter?.eventType) {
      filtered = filtered.filter((n) => n.eventType === filter.eventType);
    }

    if (filter?.read !== undefined) {
      filtered = filtered.filter((n) => n.read === filter.read);
    }

    if (filter?.source) {
      filtered = filtered.filter((n) => n.metadata?.source === filter.source);
    }

    if (filter?.limit) {
      filtered = filtered.slice(0, filter.limit);
    }

    return filtered;
  }

  getNotificationById(id: string): NotificationEvent | undefined {
    return this.notifications.find((n) => n.id === id);
  }

  markAsRead(id: string): boolean {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
      return true;
    }
    return false;
  }

  markAllAsRead(): number {
    let count = 0;
    this.notifications.forEach((n) => {
      if (!n.read) {
        n.read = true;
        count++;
      }
    });
    return count;
  }

  deleteNotification(id: string): boolean {
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
      return true;
    }
    return false;
  }

  clearAll(): void {
    this.notifications = [];
  }

  getStats() {
    const total = this.notifications.length;
    const unread = this.notifications.filter((n) => !n.read).length;
    const byType = this.notifications.reduce(
      (acc, n) => {
        acc[n.eventType] = (acc[n.eventType] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    const bySource = this.notifications.reduce(
      (acc, n) => {
        const source = n.metadata?.source || 'unknown';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      total,
      unread,
      read: total - unread,
      byType,
      bySource,
    };
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
