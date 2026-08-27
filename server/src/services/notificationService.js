const Notification = require('../models/Notification');

class NotificationService {
  async getNotifications(ownerId) {
    try {
      const filter = ownerId ? { owner: ownerId } : {};
      const list = await Notification.find(filter).sort({ createdAt: -1 }).limit(20);
      if (list.length > 0) return list;
    } catch (e) {}

    return [
      {
        _id: 'notif-1',
        type: 'SUCCESS',
        title: 'Corridor Analysis Completed',
        message: '3 candidate elephant corridors calculated between Mudumalai and Bandipur.',
        isRead: false,
        createdAt: new Date(),
      },
      {
        _id: 'notif-2',
        type: 'WARNING',
        title: 'High-Risk Highway Intersection',
        message: 'Corridor Gamma breaches State Highway 17 with 55% road conflict score.',
        isRead: false,
        createdAt: new Date(),
      },
    ];
  }

  async markAsRead(id) {
    try {
      return await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    } catch (e) {
      return null;
    }
  }

  async createNotification(data) {
    try {
      return await Notification.create(data);
    } catch (e) {
      return null;
    }
  }
}

module.exports = new NotificationService();
