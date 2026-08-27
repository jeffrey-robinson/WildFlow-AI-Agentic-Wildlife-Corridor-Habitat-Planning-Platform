const notificationService = require('../services/notificationService');

exports.getNotifications = async (req, res) => {
  try {
    const list = await notificationService.getNotifications(req.user?.id);
    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const updated = await notificationService.markAsRead(req.params.id);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
