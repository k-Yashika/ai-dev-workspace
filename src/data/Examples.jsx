const EXAMPLE_CODE = `// Express + JWT auth route
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('./db'); // generic DB wrapper

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Warning SQL injection vulnerability below
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    if (hash !== user.password_hash) return res.status(401).json({ message: 'Invalid credentials' });
    
    // Warning: no expiry set on token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
`;

const EXAMPLE_LOG = `TypeError: Cannot read properties of undefined (reading 'map')
    at ProductList (ProductList.jsx:23:18)
    at renderWithHooks (react-dom.development.js:14985:18)
    at mountIndeterminateComponent (react-dom.development.js:17811:13)

Component state: { products: undefined, loading: false, error: null }
API call: GET /api/products returned 200 OK
Response body: { "data": { "items": [...] }, "total": 42 }`;

const EXAMPLE_PR = `diff --git a/src/auth/middleware.js b/src/auth/middleware.js
@@ -1,12 +1,18 @@
-const authenticate = (req, res, next) => {
-  const token = req.headers.authorization;
-  if (!token) return res.status(401).send('Unauthorized');
-  jwt.verify(token, SECRET, (err, user) => {
-    if (err) return res.status(403).send('Forbidden');
+const authenticate = async (req, res, next) => {
+  const token = req.headers.authorization?.split(' ')[1];
+  if (!token) return res.status(401).json({ error: 'No token' });
+  try {
+    const user = jwt.verify(token, process.env.JWT_SECRET);
     req.user = user;
     next();
-  });
+  } catch(e) {
+    return res.status(403).json({ error: 'Invalid token' });
+  }
 };`;

const EXAMPLE_REPO = `React + Express SaaS Application
Files: src/App.jsx, src/components/Auth.jsx, src/components/Dashboard.jsx,
server/index.js, server/routes/auth.js, server/routes/api.js, server/middleware/auth.js,
server/models/User.js, server/models/Product.js,
package.json, .env.example, db/schema.sql

Dependencies: react@18, react-router-dom, axios, express, jsonwebtoken, crypto (built-in), sqlite3`;
