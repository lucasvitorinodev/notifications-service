import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const notification1 = makeNotification({
      recipientId: 'example-recipient-id',
    });
    const notification2 = makeNotification({
      recipientId: 'example-recipient-id',
    });
    const notification3 = makeNotification({
      recipientId: 'example-recipient-id-2',
    });

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);
    await notificationsRepository.create(notification3);

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'example-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
