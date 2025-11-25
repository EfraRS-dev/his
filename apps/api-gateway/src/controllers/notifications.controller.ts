import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { NotificationConsumerService } from '../services/notification-consumer.service';

@Controller('notifications')
@ApiTags('Notifications')
export class NotificationsController {
  constructor(
    private readonly notificationService: NotificationConsumerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications with optional filters' })
  @ApiQuery({
    name: 'eventType',
    required: false,
    description: 'Filter by event type',
  })
  @ApiQuery({
    name: 'read',
    required: false,
    description: 'Filter by read status (true/false)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit number of results',
  })
  @ApiQuery({
    name: 'source',
    required: false,
    description: 'Filter by source microservice',
  })
  @ApiOkResponse({ description: 'List of notifications' })
  getNotifications(
    @Query('eventType') eventType?: string,
    @Query('read') read?: string,
    @Query('limit') limit?: string,
    @Query('source') source?: string,
  ) {
    const store = this.notificationService.getNotificationStore();

    const filter: any = {};
    if (eventType) filter.eventType = eventType;
    if (read !== undefined) filter.read = read === 'true';
    if (limit) filter.limit = parseInt(limit, 10);
    if (source) filter.source = source;

    const notifications = store.getNotifications(filter);

    return {
      notifications,
      count: notifications.length,
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get notification statistics' })
  @ApiOkResponse({ description: 'Notification statistics' })
  getStats() {
    const store = this.notificationService.getNotificationStore();
    return store.getStats();
  }

  @Get('unread')
  @ApiOperation({ summary: 'Get only unread notifications' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit number of results',
  })
  @ApiOkResponse({ description: 'List of unread notifications' })
  getUnread(@Query('limit') limit?: string) {
    const store = this.notificationService.getNotificationStore();
    const filter: any = { read: false };
    if (limit) filter.limit = parseInt(limit, 10);

    const notifications = store.getNotifications(filter);

    return {
      notifications,
      count: notifications.length,
    };
  }

  @Get('clinical')
  @ApiOperation({
    summary: 'Get clinical notifications (Triage + EHR + Vital Signs)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit number of results',
  })
  @ApiOkResponse({ description: 'List of clinical notifications' })
  getClinical(@Query('limit') limit?: string) {
    const store = this.notificationService.getNotificationStore();
    const allNotifications = store.getNotifications({});

    const clinicalSources = ['triage-service', 'ehr-service'];
    const clinicalNotifications = allNotifications.filter((n) =>
      clinicalSources.includes(n.metadata?.source || ''),
    );

    const limitNum = limit ? parseInt(limit, 10) : clinicalNotifications.length;
    const notifications = clinicalNotifications.slice(0, limitNum);

    return {
      category: 'clinical',
      notifications,
      count: notifications.length,
      total: clinicalNotifications.length,
    };
  }

  @Get('administrative')
  @ApiOperation({ summary: 'Get administrative notifications (Patients)' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit number of results',
  })
  @ApiOkResponse({ description: 'List of administrative notifications' })
  getAdministrative(@Query('limit') limit?: string) {
    const store = this.notificationService.getNotificationStore();
    const allNotifications = store.getNotifications({});

    const adminNotifications = allNotifications.filter(
      (n) => n.metadata?.source === 'patients-service',
    );

    const limitNum = limit ? parseInt(limit, 10) : adminNotifications.length;
    const notifications = adminNotifications.slice(0, limitNum);

    return {
      category: 'administrative',
      notifications,
      count: notifications.length,
      total: adminNotifications.length,
    };
  }

  @Get('security')
  @ApiOperation({
    summary: 'Get security notifications (Users, Auth, Roles)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit number of results',
  })
  @ApiOkResponse({ description: 'List of security notifications' })
  getSecurity(@Query('limit') limit?: string) {
    const store = this.notificationService.getNotificationStore();
    const allNotifications = store.getNotifications({});

    const securityNotifications = allNotifications.filter(
      (n) => n.metadata?.source === 'users-service',
    );

    const limitNum = limit ? parseInt(limit, 10) : securityNotifications.length;
    const notifications = securityNotifications.slice(0, limitNum);

    return {
      category: 'security',
      notifications,
      count: notifications.length,
      total: securityNotifications.length,
    };
  }

  @Get('services/:serviceName')
  @ApiOperation({ summary: 'Get notifications by microservice' })
  @ApiParam({
    name: 'serviceName',
    description: 'Service name (triage, patients, users, ehr)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit number of results',
  })
  @ApiOkResponse({ description: 'List of notifications from service' })
  getByService(
    @Param('serviceName') serviceName: string,
    @Query('limit') limit?: string,
  ) {
    const store = this.notificationService.getNotificationStore();
    const source = `${serviceName}-service`;
    const filter: any = { source };
    if (limit) filter.limit = parseInt(limit, 10);

    const notifications = store.getNotifications(filter);

    return {
      service: serviceName,
      source,
      notifications,
      count: notifications.length,
    };
  }

  @Get('events/:eventType')
  @ApiOperation({ summary: 'Get notifications by event type' })
  @ApiParam({ name: 'eventType', description: 'Event type to filter' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit number of results',
  })
  @ApiOkResponse({ description: 'List of notifications for event type' })
  getByEventType(
    @Param('eventType') eventType: string,
    @Query('limit') limit?: string,
  ) {
    const store = this.notificationService.getNotificationStore();
    const filter: any = { eventType };
    if (limit) filter.limit = parseInt(limit, 10);

    const notifications = store.getNotifications(filter);

    return {
      eventType,
      notifications,
      count: notifications.length,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific notification by ID' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiOkResponse({ description: 'Notification details' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  getById(@Param('id') id: string) {
    const store = this.notificationService.getNotificationStore();
    const notification = store.getNotificationById(id);

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return notification;
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiOkResponse({ description: 'Notification marked as read' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  markAsRead(@Param('id') id: string) {
    const store = this.notificationService.getNotificationStore();
    const success = store.markAsRead(id);

    if (!success) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return {
      success: true,
      message: 'Notification marked as read',
    };
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiOkResponse({ description: 'All notifications marked as read' })
  markAllAsRead() {
    const store = this.notificationService.getNotificationStore();
    const count = store.markAllAsRead();

    return {
      success: true,
      message: `${count} notifications marked as read`,
      count,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiOkResponse({ description: 'Notification deleted' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  deleteNotification(@Param('id') id: string) {
    const store = this.notificationService.getNotificationStore();
    const success = store.deleteNotification(id);

    if (!success) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return {
      success: true,
      message: 'Notification deleted',
    };
  }

  @Delete()
  @ApiOperation({ summary: 'Clear all notifications' })
  @ApiOkResponse({ description: 'All notifications cleared' })
  clearAll() {
    const store = this.notificationService.getNotificationStore();
    store.clearAll();

    return {
      success: true,
      message: 'All notifications cleared',
    };
  }
}
