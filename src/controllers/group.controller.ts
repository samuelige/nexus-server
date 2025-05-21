import { AuthenticatedRequest } from "@/interface/auth";
import logger from "@/server/logger";
import { GroupService } from "@/services/group.service";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const groupService = new GroupService();
export const createGroupController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const group = await groupService.create(name);
    res.status(StatusCodes.OK).json({ message: 'Group created', group })
  } catch (error) {
    logger.info(error)
    throw new Error('Group creation failed')
  }
};

export const requestToJoinGroupController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const groupId = req.params.groupId;
    const userId = req?.user?.userId as string;
    await groupService.request(userId,groupId);
    res.status(StatusCodes.OK).json({ message: 'Join request sent' })
  } catch (error) {
    logger.info(error)
    throw new Error('Failed to join group')
  }
};
export const acceptJoinGroupController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const groupId = req.params.groupId;
    const userId = req?.params.userId;
    await groupService.accept(userId,groupId);
    res.status(StatusCodes.OK).json({ message: 'User added to group' })
  } catch (error) {
    logger.info(error)
    throw new Error('Failed to accept request')
  }
};
export const leaveGroupController = async (req: Request, res: Response): Promise<void> => {
  try {
    const groupId = req.params.groupId;
    const userId = req.params.userId;
    await groupService.leave(userId,groupId);
    res.status(StatusCodes.OK).json({ message: 'Left group successfully' })
  } catch (error) {
    logger.info(error)
    throw new Error('Failed to leave group')
  }
};