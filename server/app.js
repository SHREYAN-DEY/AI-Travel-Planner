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

// Necessary for rate-limiting to track real IPs behind proxies
app.set("trust proxy", 1);

app.use(helmet());
app.use(compression());
app.use(cookieParser());

// Parse JSON request bodies
app.use(express.json());

// Get api url on console
if (process.env.NODE_ENV === "developement") {
    app.use(morgan("dev"));
}

// CORS: Allowing your Vite frontend to communicate
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

const generateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15mins
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many request, please try again later" },
});

// Auth Routes
app.use("/api/auth", generateLimiter, authRoutes);
// Trip Routes
app.use("/api/trip", generateLimiter, tripRoutes);
// budgetSchema
app.use("/api/budget", generateLimiter, budgetRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(`[${new Date().toLocaleString()}] Error:`, err.stack);

    // Gemini api key issue / billing error
    if (err.status === 401 || (err.response.status === 401)) {
        return res.status(500).json({ error: "AI Service configuration error. check API key....." });
    }

    res.status(statusCode).json({
        status: "Error",
        message: statusCode === 500 & process.env.NODE_ENV === "production" 
        ? "Internal Server Error" : err.message, 
        ...(process.env.NODE_ENV === "developement" && { stack: err.stack }),
    });
});

export default app;