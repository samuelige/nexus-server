import { IChatGroup, IChatPrivate } from "@/interface/chat.interface";
import Chat from "@/model/chat.model";

export class ChatService {
  async private (data: IChatPrivate) {
    const {currentUserId, targetUserId} = data;
    const messages = await Chat.find({
      type: 'private',
      $or: [
        { from: currentUserId, to: targetUserId },
        { from: targetUserId, to: currentUserId }
      ]
    }).sort({ createdAt: 1 });
    return messages;
  }
  async group(group: IChatGroup) {
    const {groupName} = group;
    const messages = await Chat.find({ type: 'group', to: groupName }).sort({ createdAt: 1 });
    return messages;
  }
}
