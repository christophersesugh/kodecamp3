# Helmet

Securing your Express.js application by setting secure HTTP headers is a crucial part of web application security. The `helmet` package is a popular middleware for Express.js that helps you easily implement these secure headers. Here's how to use `helmet` to set secure headers in your Express.js application:

1. **Install the `helmet` Package:**
   Start by installing the `helmet` package if you haven't already. You can do this using npm or yarn:

   ```bash
   npm install helmet
   ```

   For `yarn` users

   ```bash
   yarn add helmet
   ```

2. **Import and Use `helmet` Middleware:**
   In your Express.js application, import and use the `helmet` middleware. Add the following lines to your code:

   ```javascript
   import express from "express";
   import helmet from "helmet";

   const app = express();

   // Use helmet middleware to set secure HTTP headers
   app.use(helmet());
   ```

   By calling `app.use(helmet())`, you enable the default set of secure headers provided by `helmet`.

3. **Customize Helmet Middleware:**
   While the default settings provided by `helmet` are generally secure, you can customize the middleware to enable or disable specific headers based on your application's requirements. For example:

   ```javascript
   import express from "express";
   import helmet from "helmet";

   const app = express();

   // Enable specific helmet features as needed
   app.use(
     helmet({
       contentSecurityPolicy: {
         directives: {
           defaultSrc: ["'self'"],
           scriptSrc: ["'self'", "trusted-cdn.com"],
           // Add more directives as needed
         },
       },
     })
   );
   ```

   In this example, we've enabled the Content Security Policy (CSP) feature and provided custom directives. This allows you to specify trusted sources for scripts, styles, images, and other resources, helping to prevent Cross-Site Scripting (XSS) attacks.

The `helmet` middleware simplifies the process of adding secure HTTP headers to your Express.js application, enhancing its security against common web vulnerabilities. It's a good practice to use `helmet` along with other security measures to ensure the safety of your web application and its users.
