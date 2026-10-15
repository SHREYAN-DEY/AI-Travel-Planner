import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import cookieParser from 'cookie-parser';

// Route importes
import authRoutes from './routes/auth.js'
import tripRoutes from './routes/trip.js'
import budgetRoute from './routes/budget.js'


const app = express();

// Trust reverse proxy (needed for accurate client IP tracking behind Nginx, Render, Railway, etc.)
app.set("trust proxy", 1);

// 1. Security Headers & CORS (Place first) CORS: Allowing your Vite frontend to communicate
app.use(helmet());
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// 2. Logging & Compression
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(compression());
app.use(cookieParser());

// 3. Body Parsing (Single declaration with limit)
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// 4. General API Rate Limiter
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later" },
});

// 5. Routes
app.use("/api/auth", authRoutes);  // Auth Routes
app.use("/api/trip", generalLimiter, tripRoutes);  // Trip Routes
app.use("/api/budget", generalLimiter, budgetRoute);   // budgetSchema

// 6. 404 Route Catch-All
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(`[${new Date().toISOString()}] Error:`, err.stack || err.message);

    // Identify true Gemini API Key / Upstream Quota / Auth issues
    const isGeminiAuthError = 
        err.name === 'GoogleGenAIError' ||
        err.message?.includes('API_KEY_INVALID') ||
        err.message?.includes('API key not valid') ||
        (err.isGeminiError && (err.status === 401 || err.status === 403));

    if (isGeminiAuthError) {
        return res.status(500).json({
            status: "Error",
            message: "AI service configuration error. Please contact support or check server API keys.",
        });
    }

    // Standard user 401 (e.g., from authMiddleware) remains an authentic 401
    if (statusCode === 401) {
        return res.status(401).json({
            status: "Fail",
            message: err.message || "Unauthorized access. Invalid or expired token.",
        });
    }

    // Fallback for all other errors
    res.status(statusCode).json({
        status: "Error",
        message: statusCode === 500 && process.env.NODE_ENV === "production" 
            ? "Internal Server Error" 
            : err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
});

export default app;