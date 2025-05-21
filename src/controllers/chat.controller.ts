import { Request, Response } from "express";
import { ChatService } from "@/services/chat.service";
import { RequestHandler } from "express";
import { AuthenticatedRequest } from "@/interface/auth";
import { IChatPrivate } from "@/interface/chat.interface";

const chatService = new ChatService();
export const privateChatController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const currentUserId = req?.user?.userId;
  const targetUserId = req?.params?.userId;
  const data = {
    currentUserId,
    targetUserId,
  } as IChatPrivate;

  const messages = await chatService.private(data);
  res.json(messages);
};

export const groupChatController: RequestHandler = async (req, res) => {
  const groupName = req.params.groupName;
  const data = {
    groupName
  };
  const messages = await chatService.group(data);
  res.json(messages);
};
