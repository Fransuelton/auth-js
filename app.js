const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const login = require("./routes/login");
const register = require("./routes/register");
const profile = require("./routes/profile");
const verifyEmail = require("./routes/verify-email");
const { connectToDatabase } = require("./database/db");
const {
  loginLimiter,
  registerLimiter,
} = require("./middlewares/rateLimit.middleware");
const auditLoggerInterceptResponse = require("./middlewares/audit-log.middleware");

app.use(cors());
app.use(express.json());
app.set('trust proxy', 1);

app.use(helmet());
app.use(auditLoggerInterceptResponse);
app.use("/login", loginLimiter, login);
app.use("/register", registerLimiter, register);
app.use("/verify-email", verifyEmail);
app.use(profile);

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
