import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courseRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import connectToDatabase from "./db/db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
    res.json({ status: "ok", service: "superteacher-backend" });
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api", async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        next(error);
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/grades", gradeRoutes);

app.use((error, req, res, next) => {
    console.error("Request failed:", error);
    if (res.headersSent) {
        return next(error);
    }
    if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({
            message: "PDF files must be 30 MB or smaller",
        });
    }
    res.status(500).json({
        message: "Backend request failed",
        error: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
});

if (!process.env.VERCEL) {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
}

export default app;