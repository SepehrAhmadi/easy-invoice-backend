/**
 * @swagger
 * /base/product:
 *   get:
 *     tags: [Product]
 *     summary: Get all products
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
 *                             example: "Product A"
 *                           brandId:
 *                             type: string
 *                             example: "64abc123def456789012346"
 *                           brandName:
 *                             type: string
 *                             example: "Nike"
 *                           packagingId:
 *                             type: string
 *                             example: "64abc123def456789012347"
 *                           packagingName:
 *                             type: string
 *                             example: "Box"
 *                           packagingType:
 *                             type: integer
 *                             example: 1
 *                           unitId:
 *                             type: string
 *                             example: "64abc123def456789012348"
 *                           unitName:
 *                             type: string
 *                             example: "Kilogram"
 *                           amount:
 *                             type: number
 *                             example: 500
 *   post:
 *     tags: [Product]
 *     summary: Add a new product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - brandId
 *               - packagingId
 *               - unitId
 *               - amount
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product A"
 *               brandId:
 *                 type: string
 *                 example: "64abc123def456789012346"
 *               packagingId:
 *                 type: string
 *                 example: "64abc123def456789012347"
 *               unitId:
 *                 type: string
 *                 example: "64abc123def456789012348"
 *               amount:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Product added successfully
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
 *         description: Failed to add product
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
 * /base/product/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Get product by ID
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
 *         description: Product retrieved successfully
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
 *                     name:
 *                       type: string
 *                       example: "Product A"
 *                     brandId:
 *                       type: string
 *                       example: "64abc123def456789012346"
 *                     brandName:
 *                       type: string
 *                       example: "Nike"
 *                     packagingId:
 *                       type: string
 *                       example: "64abc123def456789012347"
 *                     packagingName:
 *                       type: string
 *                       example: "Box"
 *                     packagingType:
 *                       type: integer
 *                       example: 1
 *                     unitId:
 *                       type: string
 *                       example: "64abc123def456789012348"
 *                     unitName:
 *                       type: string
 *                       example: "Kilogram"
 *                     amount:
 *                       type: number
 *                       example: 500
 *       400:
 *         description: ID required or product not found
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
 *     tags: [Product]
 *     summary: Update product by ID
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
 *               - name
 *               - brandId
 *               - packagingId
 *               - unitId
 *               - amount
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product A Updated"
 *               brandId:
 *                 type: string
 *                 example: "64abc123def456789012346"
 *               packagingId:
 *                 type: string
 *                 example: "64abc123def456789012347"
 *               unitId:
 *                 type: string
 *                 example: "64abc123def456789012348"
 *               amount:
 *                 type: number
 *                 example: 750
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *         description: Failed to update product
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
 *     tags: [Product]
 *     summary: Delete product by ID
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
 *         description: Product deleted successfully
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
 *         description: ID required or product not found
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
