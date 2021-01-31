import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import { ObjectID } from 'mongodb';

export default class FakeNotificationsRepository
    implements INotificationsRepository {
    private notifications: Notification[] = [];

    public async create({
        content,
        recipient_id,
    }: ICreateNotificationDTO): Promise<Notification> {
        const notification = new Notification();
        Object.assign(notification, {
            content,
            recipient_id,
            id: new ObjectID(),
        });

        this.notifications.push(notification);

        return notification;
    }
}
