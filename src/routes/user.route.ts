import { groupChatController, privateChatController } from "@/controllers/chat.controller";
import { leaveGroupController, requestToJoinGroupController } from "@/controllers/group.controller";
import { authMiddleware, roleMiddleware } from "@/middleware/auth.middleware";
import { RequestHandler, Router } from "express";

const userRoutes = Router();
userRoutes.use(authMiddleware);
userRoutes.use(roleMiddleware('user') as RequestHandler);

userRoutes.route('/groups/:groupId/join').post(requestToJoinGroupController);
userRoutes.route('/groups/:groupId/leave').post(leaveGroupController);
userRoutes.route('/private/:userId').get(privateChatController);
userRoutes.route('/groups/:groupName').get(groupChatController);

export default userRoutes;