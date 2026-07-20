/**
 * @swagger
 * /notification/widget:
 *   get:
 *     tags: [Notification]
 *     summary: Get latest notifications for header widget
 *     description: Returns the latest 3 notifications for the header bell/menu. No pagination or date filters. Unread items are sorted first, then by date descending. Each item includes isRead based on the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Widget notifications retrieved successfully
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
 *                   example: "data successfully received"
 *                 data:
 *                   type: object
 *                   properties:
 *                     notifications:
 *                       type: array
 *                       maxItems: 3
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "507f1f77bcf86cd799439011"
 *                           userId:
 *                             type: string
 *                             example: "507f1f77bcf86cd799439012"
 *                           username:
 *                             type: string
 *                             example: "admin"
 *                           action:
 *                             type: string
 *                             enum: [add, update, delete, change_status]
 *                             example: "add"
 *                           type:
 *                             type: string
 *                             example: "brand_created"
 *                           enTitle:
 *                             type: string
 *                             example: "New Brand"
 *                           faTitle:
 *                             type: string
 *                             example: "برند جدید"
 *                           enMessage:
 *                             type: string
 *                             example: "Brand \"Nike\" has been created."
 *                           faMessage:
 *                             type: string
 *                             example: "برند \"Nike\" با موفقیت ثبت شد."
 *                           isRead:
 *                             type: boolean
 *                             example: false
 *                           date:
 *                             type: string
 *                             example: "1/15/2024 10:30"
 *                           localDate:
 *                             type: string
 *                             example: "1402/10/25 10:30"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Faild to add data"
 */
