/**
 * @swagger
 * /operation/invoice:
 *   get:
 *     tags: [Invoice]
 *     summary: Get all invoices with optional filters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *         description: Jalali start date (jYYYY/jMM/jDD)
 *         example: "1403/01/01"
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *         description: Jalali end date (jYYYY/jMM/jDD)
 *         example: "1403/12/29"
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: integer
 *         description: "1 = Paid, 2 = Awaiting payment"
 *         example: 1
 *       - in: query
 *         name: companyType
 *         schema:
 *           type: integer
 *         description: "1 = legal entity, 2 = individual"
 *         example: 1
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
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
 *                     invoices:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64abc123def456789012345"
 *                           invoiceNumber:
 *                             type: integer
 *                             example: 1001
 *                           companyId:
 *                             type: string
 *                             example: "64abc123def456789012346"
 *                           companyName:
 *                             type: string
 *                             example: "Acme Corp"
 *                           companyType:
 *                             type: integer
 *                             example: 1
 *                           companyTypeTitle:
 *                             type: string
 *                             example: "legal entity"
 *                           paymentStatus:
 *                             type: integer
 *                             example: 2
 *                           paymentStatusName:
 *                             type: string
 *                             example: "Awaiting payment"
 *                           totalPrice:
 *                             type: string
 *                             example: "50000"
 *                           localDate:
 *                             type: string
 *                             example: "1403/01/15"
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-04-04T00:00:00.000Z"
 *                           createdDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-04-04T10:30:00.000Z"
 *                           lastUpdateDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-04-05T14:00:00.000Z"
 *       400:
 *         description: Invalid date format
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
 *                   example: "Invalid date"
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
 *                   example: "Server error"
 *   post:
 *     tags: [Invoice]
 *     summary: Create a new invoice
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyId
 *               - localDate
 *             properties:
 *               companyId:
 *                 type: string
 *                 example: "64abc123def456789012346"
 *               localDate:
 *                 type: string
 *                 description: Jalali date (jYYYY/jMM/jDD)
 *                 example: "1403/01/15"
 *     responses:
 *       200:
 *         description: Invoice created successfully
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
 *                 id:
 *                   type: string
 *                   example: "64abc123def456789012345"
 *       400:
 *         description: Required fields missing, invalid company or date
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
 *         description: Failed to create invoice
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
 * /operation/invoice/{id}:
 *   get:
 *     tags: [Invoice]
 *     summary: Get invoice by ID
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
 *         description: Invoice retrieved successfully
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
 *                       example: "64abc123def456789012345"
 *                     invoiceNumber:
 *                       type: integer
 *                       example: 1001
 *                     companyId:
 *                       type: string
 *                       example: "64abc123def456789012346"
 *                     companyName:
 *                       type: string
 *                       example: "Acme Corp"
 *                     companyType:
 *                       type: integer
 *                       example: 1
 *                     companyTypeTitle:
 *                       type: string
 *                       example: "legal entity"
 *                     paymentStatus:
 *                       type: integer
 *                       example: 2
 *                     paymentStatusName:
 *                       type: string
 *                       example: "Awaiting payment"
 *                     totalPrice:
 *                       type: string
 *                       example: "50000"
 *                     localDate:
 *                       type: string
 *                       example: "1403/01/15"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-04-04T00:00:00.000Z"
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-04-04T10:30:00.000Z"
 *                     lastUpdateDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-04-05T14:00:00.000Z"
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
 *       404:
 *         description: Invoice not found
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
 *     summary: Update invoice by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - companyId
 *               - localDate
 *             properties:
 *               companyId:
 *                 type: string
 *                 example: "64abc123def456789012346"
 *               localDate:
 *                 type: string
 *                 description: Jalali date (jYYYY/jMM/jDD)
 *                 example: "1403/01/20"
 *     responses:
 *       200:
 *         description: Invoice updated successfully
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
 *                   example: "Edited successfully"
 *       400:
 *         description: ID required, not found, or invalid fields
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
 *         description: Failed to update invoice
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
 *                   example: "Failed to edit"
 *   delete:
 *     tags: [Invoice]
 *     summary: Delete invoice by ID
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
 *         description: Invoice deleted successfully
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
 *         description: ID required or invoice not found
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
 *
 * /operation/invoice/{id}/status:
 *   post:
 *     tags: [Invoice]
 *     summary: Change invoice payment status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - paymentStatus
 *             properties:
 *               paymentStatus:
 *                 type: integer
 *                 description: "1 = Paid, 2 = Awaiting payment"
 *                 example: 1
 *     responses:
 *       200:
 *         description: Payment status changed successfully
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
 *                   example: "Status changed successfully"
 *       400:
 *         description: ID required or invalid payment status
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
 *         description: Failed to change status
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
 *                   example: "Failed to edit"
 *
 * /operation/invoice/{id}/print:
 *   get:
 *     tags: [Invoice]
 *     summary: Get invoice print data with items
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
 *         description: Print data retrieved successfully
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
 *                       example: "64abc123def456789012345"
 *                     invoiceNumber:
 *                       type: integer
 *                       example: 1001
 *                     companyId:
 *                       type: string
 *                       example: "64abc123def456789012346"
 *                     companyName:
 *                       type: string
 *                       example: "Acme Corp"
 *                     companyType:
 *                       type: integer
 *                       example: 1
 *                     companyTypeTitle:
 *                       type: string
 *                       example: "legal entity"
 *                     paymentStatus:
 *                       type: integer
 *                       example: 2
 *                     paymentStatusName:
 *                       type: string
 *                       example: "Awaiting payment"
 *                     localDate:
 *                       type: string
 *                       example: "1403/01/15"
 *                     totalPrice:
 *                       type: number
 *                       example: 50000
 *                     count:
 *                       type: integer
 *                       example: 3
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-04-04T00:00:00.000Z"
 *                     invoiceItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64abc123def456789012347"
 *                           prroduntDisplayName:
 *                             type: string
 *                             example: "Design Electronics 500 Kilogram - Nike - Product A"
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
 *       404:
 *         description: Invoice not found
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
 */
