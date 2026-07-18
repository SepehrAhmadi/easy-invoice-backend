/**
 * @swagger
 * /notification:
 *   get:
 *     tags: [Notification]
 *     summary: Get all notifications
 *     description: Returns notifications ordered by newest first, plus an unreadCount for the authenticated user. Optionally filter by Jalali date range. Each item includes isRead based on the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *         description: Jalali start date (jYYYY/jMM/jDD). Required together with toDate.
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *         description: Jalali end date (jYYYY/jMM/jDD). Required together with fromDate.
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
 *                   example: "data successfully received"
 *                 data:
 *                   type: object
 *                   properties:
 *                     unreadCount:
 *                       type: integer
 *                       example: 10
 *                       description: Number of unread notifications in the result set
 *                     notifications:
 *                       type: array
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
 *       400:
 *         description: Invalid date filter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid Date"
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

/**
 * @swagger
 * /notification/{id}/read:
 *   post:
 *     tags: [Notification]
 *     summary: Mark a notification as read
 *     description: Marks the given notification as read for the authenticated user and returns the notification payload.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Notification marked as read successfully
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
 *                   example: "Notification read successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     userId:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439012"
 *                     username:
 *                       type: string
 *                       example: "admin"
 *                     action:
 *                       type: string
 *                       enum: [add, update, delete, change_status]
 *                       example: "add"
 *                     type:
 *                       type: string
 *                       example: "brand_created"
 *                     enTitle:
 *                       type: string
 *                       example: "New Brand"
 *                     faTitle:
 *                       type: string
 *                       example: "برند جدید"
 *                     enMessage:
 *                       type: string
 *                       example: "Brand \"Nike\" has been created."
 *                     faMessage:
 *                       type: string
 *                       example: "برند \"Nike\" با موفقیت ثبت شد."
 *                     isRead:
 *                       type: boolean
 *                       example: true
 *                     date:
 *                       type: string
 *                       example: "1/15/2024 10:30"
 *                     localDate:
 *                       type: string
 *                       example: "1402/10/25 10:30"
 *       400:
 *         description: Missing ID or notification not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "No data found"
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

/**
 * @swagger
 * /notification/readAll:
 *   post:
 *     tags: [Notification]
 *     summary: Mark all notifications as read
 *     description: Marks every unread notification as read for the authenticated user. Already-read notifications are skipped.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read successfully
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
 *                   example: "All notifications read successfully"
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
