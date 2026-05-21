import { Router } from "express";

const router = Router();

/**
 * Simple health check endpoint
 */
router.get("/", (req: any, res: any) => {
  return res.json({
    status: "ok",
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
