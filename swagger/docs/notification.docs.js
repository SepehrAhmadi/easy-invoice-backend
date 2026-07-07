/**
 * @swagger
 * /notification:
 *   get:
 *     tags: [Notification]
 *     summary: Get all notifications
 *     description: Returns a list of all notifications
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Data received successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     notifications:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           userId:
 *                             type: string
 *                             example: "507f1f77bcf86cd799439011"
 *                           type:
 *                             type: string
 *                             example: "info"
 *                           enTitle:
 *                             type: string
 *                             example: "New Update Available"
 *                           faTitle:
 *                             type: string
 *                             example: "به‌روزرسانی جدید موجود است"
 *                           enMessage:
 *                             type: string
 *                             example: "A new version of the app is available"
 *                           faMessage:
 *                             type: string
 *                             example: "نسخه جدید برنامه موجود است"
 *                           createdData:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-15T10:30:00.000Z"
 */
