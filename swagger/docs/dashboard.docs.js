/**
 * @swagger
 * /dashboard:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get dashboard statistics and summaries
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
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
 *                     invoicesCount:
 *                       type: integer
 *                       example: 42
 *                     awaitingPaymentInvoicesCount:
 *                       type: integer
 *                       example: 10
 *                     paidInvoicesCount:
 *                       type: integer
 *                       example: 32
 *                     totalPrice:
 *                       type: number
 *                       example: 1500000
 *                     awaitingPaymentTotalPrice:
 *                       type: number
 *                       example: 350000
 *                     paidTotalPrice:
 *                       type: number
 *                       example: 1150000
 *                     valueByCompany:
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
 *                           count:
 *                             type: integer
 *                             example: 15
 *                     invoicesByPaymentStatus:
 *                       type: object
 *                       properties:
 *                         awatintPayment:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: "64abc123def456789012345"
 *                               invoiceNumber:
 *                                 type: integer
 *                                 example: 1001
 *                               companyId:
 *                                 type: string
 *                                 example: "64abc123def456789012346"
 *                               companyName:
 *                                 type: string
 *                                 example: "Acme Corp"
 *                               companyType:
 *                                 type: integer
 *                                 example: 1
 *                               companyTypeTitle:
 *                                 type: string
 *                                 example: "legal entity"
 *                               paymentStatus:
 *                                 type: integer
 *                                 example: 2
 *                               paymentStatusName:
 *                                 type: string
 *                                 example: "Awaiting payment"
 *                               totalPrice:
 *                                 type: string
 *                                 example: "50000"
 *                               localDate:
 *                                 type: string
 *                                 example: "1403/01/15"
 *                               date:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2024-04-04T00:00:00.000Z"
 *                               createdDate:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2024-04-04T10:30:00.000Z"
 *                               lastUpdateDate:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2024-04-05T14:00:00.000Z"
 *                         paid:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: "64abc123def456789012347"
 *                               invoiceNumber:
 *                                 type: integer
 *                                 example: 1002
 *                               companyId:
 *                                 type: string
 *                                 example: "64abc123def456789012346"
 *                               companyName:
 *                                 type: string
 *                                 example: "Acme Corp"
 *                               companyType:
 *                                 type: integer
 *                                 example: 1
 *                               companyTypeTitle:
 *                                 type: string
 *                                 example: "legal entity"
 *                               paymentStatus:
 *                                 type: integer
 *                                 example: 1
 *                               paymentStatusName:
 *                                 type: string
 *                                 example: "Paid"
 *                               totalPrice:
 *                                 type: string
 *                                 example: "75000"
 *                               localDate:
 *                                 type: string
 *                                 example: "1403/01/20"
 *                               date:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2024-04-09T00:00:00.000Z"
 *                               createdDate:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2024-04-09T09:00:00.000Z"
 *                               lastUpdateDate:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2024-04-10T11:00:00.000Z"
 *                     productByPackaging:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           packagingId:
 *                             type: string
 *                             example: "64abc123def456789012348"
 *                           packagingName:
 *                             type: string
 *                             example: "Box"
 *                           packagingType:
 *                             type: integer
 *                             example: 1
 *                           count:
 *                             type: integer
 *                             example: 25
 */
