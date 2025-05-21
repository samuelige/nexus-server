import { acceptJoinGroupController, createGroupController } from "@/controllers/group.controller";
import { authMiddleware, roleMiddleware } from "@/middleware/auth.middleware";
import { RequestHandler, Router } from "express";

const adminRoutes = Router();
adminRoutes.use(authMiddleware);
adminRoutes.use(roleMiddleware('admin') as RequestHandler);

adminRoutes.route('/groups').post(createGroupController);
adminRoutes.route('/groups/:groupId/accept/:userId').post(acceptJoinGroupController);

export default adminRoutes;