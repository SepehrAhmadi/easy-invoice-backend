/**
 * @swagger
 * /base/company:
 *   get:
 *     tags: [Company]
 *     summary: Get all companies
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
 *                           type:
 *                             type: integer
 *                             example: 1
 *                           typeTitle:
 *                             type: string
 *                             example: "legal entity"
 *                           name:
 *                             type: string
 *                             example: "Acme Corp"
 *                           address:
 *                             type: string
 *                             example: "123 Main St, Tehran"
 *                           phone:
 *                             type: string
 *                             example: "021-12345678"
 *   post:
 *     tags: [Company]
 *     summary: Add a new company
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - name
 *               - address
 *               - phone
 *             properties:
 *               type:
 *                 type: integer
 *                 description: "1 = legal entity, 2 = individual"
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Acme Corp"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Tehran"
 *               phone:
 *                 type: string
 *                 example: "021-12345678"
 *     responses:
 *       201:
 *         description: Company added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Added successfully"
 *       400:
 *         description: Required fields missing
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
 *         description: Failed to add company
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
 * /base/company/{id}:
 *   get:
 *     tags: [Company]
 *     summary: Get company by ID
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
 *         description: Company retrieved successfully
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
 *                     type:
 *                       type: integer
 *                       example: 1
 *                     typeTitle:
 *                       type: string
 *                       example: "legal entity"
 *                     name:
 *                       type: string
 *                       example: "Acme Corp"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, Tehran"
 *                     phone:
 *                       type: string
 *                       example: "021-12345678"
 *       400:
 *         description: ID required or company not found
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
 *   put:
 *     tags: [Company]
 *     summary: Update company by ID
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
 *               - type
 *               - name
 *               - address
 *               - phone
 *             properties:
 *               type:
 *                 type: integer
 *                 description: "1 = legal entity, 2 = individual"
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Acme Corp Updated"
 *               address:
 *                 type: string
 *                 example: "456 New Ave, Tehran"
 *               phone:
 *                 type: string
 *                 example: "021-87654321"
 *     responses:
 *       200:
 *         description: Company updated successfully
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
 *         description: ID required, not found, or required fields missing
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
 *         description: Failed to update company
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
 *     tags: [Company]
 *     summary: Delete company by ID
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
 *         description: Company deleted successfully
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
 *         description: ID required or company not found
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
