/**
 * @swagger
 * /operation/invoice/{invoiceId}/items:
 *   get:
 *     tags: [Invoice]
 *     summary: Get all items for an invoice
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64abc123def456789012345"
 *     responses:
 *       200:
 *         description: Invoice items retrieved successfully
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
 *                     invoiceItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64abc123def456789012347"
 *                           invoiceId:
 *                             type: string
 *                             example: "64abc123def456789012345"
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
 *                             example: "64abc123def456789012351"
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
 *                           description:
 *                             type: string
 *                             example: "Sample description"
 *       400:
 *         description: Invoice ID required
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
 *                   example: "Not found"
 *   post:
 *     tags: [Invoice]
 *     summary: Add an item to an invoice
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64abc123def456789012345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - brandId
 *               - categoryId
 *               - packagingId
 *               - unitId
 *               - amount
 *               - unitCount
 *               - pageCount
 *               - singlePrice
 *               - localDate
 *             properties:
 *               isEdit:
 *                 type: boolean
 *                 example: false
 *               localDate:
 *                 type: string
 *                 description: Jalali date (jYYYY/jMM/jDD)
 *                 example: "1403/01/15"
 *               productId:
 *                 type: string
 *                 example: "64abc123def456789012348"
 *               brandId:
 *                 type: string
 *                 example: "64abc123def456789012349"
 *               categoryId:
 *                 type: string
 *                 example: "64abc123def456789012350"
 *               packagingId:
 *                 type: string
 *                 example: "64abc123def456789012351"
 *               unitId:
 *                 type: string
 *                 example: "64abc123def456789012352"
 *               amount:
 *                 type: number
 *                 example: 500
 *               unitCount:
 *                 type: number
 *                 example: 10
 *               pageCount:
 *                 type: number
 *                 example: 100
 *               singlePrice:
 *                 type: number
 *                 example: 500
 *               description:
 *                 type: string
 *                 example: "Sample description"
 *     responses:
 *       200:
 *         description: Invoice item added successfully
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
 *                   example: "Added successfully"
 *       400:
 *         description: Required fields missing or invalid reference IDs
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
 *                   example: "Required fields are missing"
 *       500:
 *         description: Failed to add invoice item
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
 *                   example: "Failed to add"
 *
 * /operation/invoice/{invoiceId}/items/{itemId}:
 *   get:
 *     tags: [Invoice]
 *     summary: Get a single invoice item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64abc123def456789012345"
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64abc123def456789012347"
 *     responses:
 *       200:
 *         description: Invoice item retrieved successfully
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
 *                     id:
 *                       type: string
 *                       example: "64abc123def456789012347"
 *                     invoiceId:
 *                       type: string
 *                       example: "64abc123def456789012345"
 *                     isEdit:
 *                       type: boolean
 *                       example: false
 *                     productId:
 *                       type: string
 *                       example: "64abc123def456789012348"
 *                     productName:
 *                       type: string
 *                       example: "Product A"
 *                     brandId:
 *                       type: string
 *                       example: "64abc123def456789012349"
 *                     brandName:
 *                       type: string
 *                       example: "Nike"
 *                     categoryId:
 *                       type: string
 *                       example: "64abc123def456789012350"
 *                     categoryName:
 *                       type: string
 *                       example: "Electronics"
 *                     packagingId:
 *                       type: string
 *                       example: "64abc123def456789012351"
 *                     packagingName:
 *                       type: string
 *                       example: "Box"
 *                     unitId:
 *                       type: string
 *                       example: "64abc123def456789012352"
 *                     unitName:
 *                       type: string
 *                       example: "Kilogram"
 *                     amount:
 *                       type: number
 *                       example: 500
 *                     unitCount:
 *                       type: number
 *                       example: 10
 *                     pageCount:
 *                       type: number
 *                       example: 100
 *                     singlePrice:
 *                       type: number
 *                       example: 500
 *                     totalPrice:
 *                       type: number
 *                       example: 50000
 *                     localDate:
 *                       type: string
 *                       example: "1403/01/15"
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-04-04T10:30:00.000Z"
 *                     lastUpdateDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-04-05T14:00:00.000Z"
 *                     description:
 *                       type: string
 *                       example: "Sample description"
 *       400:
 *         description: Invoice ID or item ID required
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
 *       404:
 *         description: Invoice item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Not found"
 *   put:
 *     tags: [Invoice]
 *     summary: Update an invoice item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64abc123def456789012345"
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64abc123def456789012347"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - brandId
 *               - categoryId
 *               - packagingId
 *               - unitId
 *               - amount
 *               - unitCount
 *               - pageCount
 *               - singlePrice
 *               - localDate
 *             properties:
 *               isEdit:
 *                 type: boolean
 *                 example: true
 *               localDate:
 *                 type: string
 *                 description: Jalali date (jYYYY/jMM/jDD)
 *                 example: "1403/01/20"
 *               productId:
 *                 type: string
 *                 example: "64abc123def456789012348"
 *               brandId:
 *                 type: string
 *                 example: "64abc123def456789012349"
 *               categoryId:
 *                 type: string
 *                 example: "64abc123def456789012350"
 *               packagingId:
 *                 type: string
 *                 example: "64abc123def456789012351"
 *               unitId:
 *                 type: string
 *                 example: "64abc123def456789012352"
 *               amount:
 *                 type: number
 *                 example: 500
 *               unitCount:
 *                 type: number
 *                 example: 10
 *               pageCount:
 *                 type: number
 *                 example: 100
 *               singlePrice:
 *                 type: number
 *                 example: 500
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *     responses:
 *       200:
 *         description: Invoice item updated successfully
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
 *                   example: "Added successfully"
 *       400:
 *         description: Required fields missing or item not found
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
 *                   example: "Required fields are missing"
 *       500:
 *         description: Failed to update invoice item
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
 *                   example: "Failed to add"
 *   delete:
 *     tags: [Invoice]
 *     summary: Delete an invoice item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64abc123def456789012345"
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64abc123def456789012347"
 *     responses:
 *       200:
 *         description: Invoice item deleted successfully
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
 *                   example: "Deleted successfully"
 *       400:
 *         description: Invoice ID or item ID required, or item not found
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
 *                   example: "Not found"
 *       500:
 *         description: Failed to delete invoice item
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
 *                   example: "Failed to delete"
 */
