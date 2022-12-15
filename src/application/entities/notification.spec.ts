import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create notification content', () => {
    const notification = new Notification({
      content: new Content('New friend request notification'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
