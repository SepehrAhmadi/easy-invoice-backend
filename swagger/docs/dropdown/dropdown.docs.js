/**
 * @swagger
 * /dropdown/packagings:
 *   get:
 *     tags: [Dropdown]
 *     summary: Get all packagings for dropdown
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Packagings retrieved successfully
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
 *                     packagings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64abc123def456789012345"
 *                           name:
 *                             type: string
 *                             example: "Box"
 *                           type:
 *                             type: integer
 *                             example: 1
 *
 * /dropdown/units:
 *   get:
 *     tags: [Dropdown]
 *     summary: Get all units for dropdown
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Units retrieved successfully
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
 *                     units:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64abc123def456789012345"
 *                           name:
 *                             type: string
 *                             example: "Kilogram"
 *
 * /dropdown/companies:
 *   get:
 *     tags: [Dropdown]
 *     summary: Get all companies for dropdown
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Companies retrieved successfully
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
 *                     companies:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64abc123def456789012345"
 *                           name:
 *                             type: string
 *                             example: "Acme Corp"
 *                           type:
 *                             type: integer
 *                             example: 1
 *                           typeTitle:
 *                             type: string
 *                             example: "legal entity"
 *
 * /dropdown/brands:
 *   get:
 *     tags: [Dropdown]
 *     summary: Get all brands for dropdown
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Brands retrieved successfully
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
 *                     brands:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64abc123def456789012345"
 *                           name:
 *                             type: string
 *                             example: "Nike"
 *
 * /dropdown/products:
 *   get:
 *     tags: [Dropdown]
 *     summary: Get all products for dropdown
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64abc123def456789012345"
 *                           name:
 *                             type: string
 *                             example: "Product A - Box 500 Kilogram"
 *                           packagingId:
 *                             type: string
 *                             example: "64abc123def456789012346"
 *                           unitId:
 *                             type: string
 *                             example: "64abc123def456789012347"
 *                           unitAmount:
 *                             type: number
 *                             example: 500
 *                           brandId:
 *                             type: string
 *                             example: "64abc123def456789012348"
 *
 * /dropdown/categories:
 *   get:
 *     tags: [Dropdown]
 *     summary: Get all categories for dropdown
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64abc123def456789012345"
 *                           name:
 *                             type: string
 *                             example: "Electronics"
 *
 * /dropdown/companyType:
 *   get:
 *     tags: [Dropdown]
 *     summary: Get company type options for dropdown
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company types retrieved successfully
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
 *                     companyType:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Legal entity"
 *
 * /dropdown/paymentStatus:
 *   get:
 *     tags: [Dropdown]
 *     summary: Get payment status options for dropdown
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment statuses retrieved successfully
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
 *                     paymentStatus:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Paid"
 */
