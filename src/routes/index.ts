import { Express } from "express";
import errorHandlerMiddleware from "@/middleware/errorHandler";
import notFoundMiddleware from "@/middleware/notFound";
import authRoutes from "./auth.route";
import adminRoutes from "./admin.route";
import userRoutes from "./user.route";
export const setUpRoutes = (app: Express) => {
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/admin', adminRoutes);
  app.use('/api/v1/user', userRoutes);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);
}