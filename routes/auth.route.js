const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Signup, Login & Logout
 */

/**
 * @swagger
 * /signup:
 *  post:
 *    summary: User Signup
 *    tags: [Authentication]
 *    requestBody:
 *      description: New User Registeration
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              _id:
 *                type: objectId 
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              username:
 *                type: string
 *              image_url:
 *                type: string
 *              bio:
 *                type: string
 *              date:
 *                type: date
 *    responses:
 *      200:
 *        description: Returns user's profile
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User (Password Projected)"
 *      404:
 *        description: Returns array of error messages
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example:
 *                ["The Email is not valid!", "Username is required!", "Password should be more than 6 characters!", "Passwords don't match!", "This email is already registered!"]
 */

router.post("/signup", authController.signup);

/**
 * @swagger
 * /login:
 *  post:
 *    summary: User Login
 *    tags: [Authentication]
 *    requestBody:
 *      description: Send Email & Password to login
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - email
 *              - password
 *            properties: 
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Returns user's profile
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User (Password Projected)"
 *      404:
 *        description: Returns "Incorrect email or password"
 */

router.post("/login", authController.login);

/**
 * @swagger
 * /logout:
 *  delete: 
 *    summary: Logs the user out
 *    tags: [Authentication]
 *    responses:
 *      200:
 *        description: Returns "Logged out!"
 */

router.delete("/logout", authController.logout);

module.exports = router;
