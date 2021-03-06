const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { requireAuth } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Profiles
 */

/**
 * @swagger
 * /profile:
 *  get:
 *    summary: Returns user's profile
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: Returns user's profile
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User (Password Projected)"
 *      401:
 *        description: Returns "Unauthorized!"
 */

router.get("/profile", requireAuth, userController.getUserProfile);

/**
 * @swagger
 * /profile:
 *  patch:
 *    summary: Updates user's profile
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: Updates user's profile
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User (Password Projected)"
 *      404:
 *        description: Returns "User not found!"
 *      401:
 *        description: Returns "Unauthorized!"
 */

router.patch("/profile", requireAuth, userController.updateProfile);

/**
 * @swagger
 * /profile/{id}:
 *  get:
 *    summary: Returns another user's profile
 *    tags: [Users]
 *    parameters: 
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *          required: true
 *          description: Requested User's Id
 *    responses:
 *      200:
 *        description: Returns another user's profile
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User (Password Projected)"
 *      404:
 *        description: Returns "User not found!"
 *      401:
 *        description: Returns "Unauthorized!"
 */

router.get("/profile/:id", userController.getProfile);

module.exports = router;
