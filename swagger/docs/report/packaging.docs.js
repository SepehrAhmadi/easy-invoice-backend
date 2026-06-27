/**
 * @swagger
 * /report/packaging:
 *   get:
 *     tags: [Packaging Report]
 *     summary: Get packaging report summary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Packaging report retrieved successfully
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       packagingId:
 *                         type: string
 *                         example: "64abc123def456789012345"
 *                       packagingName:
 *                         type: string
 *                         example: "Box"
 *                       packagingType:
 *                         type: integer
 *                         example: 1
 *                       totalPrice:
 *                         type: number
 *                         example: 250000
 *                       totalPage:
 *                         type: number
 *                         example: 500
 *                       count:
 *                         type: integer
 *                         example: 15
 *
 * /report/packaging/{id}:
 *   get:
 *     tags: [Packaging Report]
 *     summary: Get packaging report detail by packaging ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64abc123def456789012345"
 *     responses:
 *       200:
 *         description: Packaging report detail retrieved successfully
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
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64abc123def456789012347"
 *                           invoiceId:
 *                             type: string
 *                             example: "64abc123def456789012346"
 *                           isEdit:
 *                             type: boolean
 *                             example: false
 *                           productId:
 *                             type: string
 *                             example: "64abc123def456789012348"
 *                           productName:
 *                             type: string
 *                             example: "Product A"
 *                           brandId:
 *                             type: string
 *                             example: "64abc123def456789012349"
 *                           brandName:
 *                             type: string
 *                             example: "Nike"
 *                           categoryId:
 *                             type: string
 *                             example: "64abc123def456789012350"
 *                           categoryName:
 *                             type: string
 *                             example: "Electronics"
 *                           packagingId:
 *                             type: string
 *                             example: "64abc123def456789012345"
 *                           packagingName:
 *                             type: string
 *                             example: "Box"
 *                           unitId:
 *                             type: string
 *                             example: "64abc123def456789012352"
 *                           unitName:
 *                             type: string
 *                             example: "Kilogram"
 *                           amount:
 *                             type: number
 *                             example: 500
 *                           unitCount:
 *                             type: number
 *                             example: 10
 *                           pageCount:
 *                             type: number
 *                             example: 100
 *                           singlePrice:
 *                             type: number
 *                             example: 500
 *                           totalPrice:
 *                             type: number
 *                             example: 50000
 *                           localDate:
 *                             type: string
 *                             example: "1403/01/15"
 *                           createdDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-04-04T10:30:00.000Z"
 *                           lastUpdateDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-04-05T14:00:00.000Z"
 *                     totalPrice:
 *                       type: number
 *                       example: 250000
 *                     totalPage:
 *                       type: number
 *                       example: 500
 *       400:
 *         description: ID required
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
 *                   example: "ID is required"
 */
