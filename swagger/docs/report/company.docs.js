/**
 * @swagger
 * /report/company:
 *   get:
 *     tags: [Company Report]
 *     summary: Get company report summary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company report retrieved successfully
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
 *                     totalPrice:
 *                       type: number
 *                       example: 1500000
 *                     totalPaidPrice:
 *                       type: number
 *                       example: 1150000
 *                     totalAwaitingPrice:
 *                       type: number
 *                       example: 350000
 *                     invoicesCount:
 *                       type: integer
 *                       example: 42
 *                     paidInvoicesCount:
 *                       type: integer
 *                       example: 32
 *                     awaitingInvoicesCount:
 *                       type: integer
 *                       example: 10
 *                     companies:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           companyId:
 *                             type: string
 *                             example: "64abc123def456789012345"
 *                           companyName:
 *                             type: string
 *                             example: "Acme Corp"
 *                           companyType:
 *                             type: integer
 *                             example: 1
 *                           companyTypeTitle:
 *                             type: string
 *                             example: "legal entity"
 *                           totalPrice:
 *                             type: number
 *                             example: 500000
 *                           totalPaidPrice:
 *                             type: number
 *                             example: 400000
 *                           totalAwaitingPrice:
 *                             type: number
 *                             example: 100000
 *                           invoicesCount:
 *                             type: integer
 *                             example: 15
 *                           paidInvoicesCount:
 *                             type: integer
 *                             example: 12
 *                           awaitingInvoicesCount:
 *                             type: integer
 *                             example: 3
 *
 * /report/company/invoices/{companyId}:
 *   get:
 *     tags: [Company Report]
 *     summary: Get invoices for a company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64abc123def456789012345"
 *     responses:
 *       200:
 *         description: Company invoices retrieved successfully
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
 *                       id:
 *                         type: string
 *                         example: "64abc123def456789012346"
 *                       invoiceNumber:
 *                         type: integer
 *                         example: 1001
 *                       companyId:
 *                         type: string
 *                         example: "64abc123def456789012345"
 *                       companyName:
 *                         type: string
 *                         example: "Acme Corp"
 *                       companyType:
 *                         type: integer
 *                         example: 1
 *                       companyTypeTitle:
 *                         type: string
 *                         example: "legal entity"
 *                       paymentStatus:
 *                         type: integer
 *                         example: 2
 *                       paymentStatusName:
 *                         type: string
 *                         example: "Awaiting payment"
 *                       totalPrice:
 *                         type: string
 *                         example: "50000"
 *                       localDate:
 *                         type: string
 *                         example: "1403/01/15"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-04-04T00:00:00.000Z"
 *                       createdDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-04-04T10:30:00.000Z"
 *                       lastUpdateDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-04-05T14:00:00.000Z"
 *       400:
 *         description: Company ID required
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
 *
 * /report/company/invoiceItems/{invoiceId}:
 *   get:
 *     tags: [Company Report]
 *     summary: Get invoice items for an invoice
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64abc123def456789012346"
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "64abc123def456789012347"
 *                       invoiceId:
 *                         type: string
 *                         example: "64abc123def456789012346"
 *                       isEdit:
 *                         type: boolean
 *                         example: false
 *                       productId:
 *                         type: string
 *                         example: "64abc123def456789012348"
 *                       productName:
 *                         type: string
 *                         example: "Product A"
 *                       brandId:
 *                         type: string
 *                         example: "64abc123def456789012349"
 *                       brandName:
 *                         type: string
 *                         example: "Nike"
 *                       categoryId:
 *                         type: string
 *                         example: "64abc123def456789012350"
 *                       categoryName:
 *                         type: string
 *                         example: "Electronics"
 *                       packagingId:
 *                         type: string
 *                         example: "64abc123def456789012351"
 *                       packagingName:
 *                         type: string
 *                         example: "Box"
 *                       unitId:
 *                         type: string
 *                         example: "64abc123def456789012352"
 *                       unitName:
 *                         type: string
 *                         example: "Kilogram"
 *                       amount:
 *                         type: number
 *                         example: 500
 *                       unitCount:
 *                         type: number
 *                         example: 10
 *                       pageCount:
 *                         type: number
 *                         example: 100
 *                       singlePrice:
 *                         type: number
 *                         example: 500
 *                       totalPrice:
 *                         type: number
 *                         example: 50000
 *                       localDate:
 *                         type: string
 *                         example: "1403/01/15"
 *                       createdDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-04-04T10:30:00.000Z"
 *                       lastUpdateDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-04-05T14:00:00.000Z"
 *                       description:
 *                         type: string
 *                         example: "Sample description"
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
 */
