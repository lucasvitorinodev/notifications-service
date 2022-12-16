import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { Content } from '@application/entities/content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('New friend request notification 1111'),
    recipientId: 'example-recipient-id',
    ...override,
  });
}
