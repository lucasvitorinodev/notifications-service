import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-recipient-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
      ]),
    );
  });
});
