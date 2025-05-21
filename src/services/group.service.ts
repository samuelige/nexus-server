import Group from "@/model/group.model";
import mongoose from "mongoose";

export class GroupService {
  async create (name: string) {
    const group = await Group.create({ name, members: [], joinRequests: [] });
    return group;
  }
  async request (userId:string, groupId: string) {
    const group = await Group.findById(groupId);
    if (!group) throw new Error('Group not found');

    const userIdObj = new mongoose.Types.ObjectId(userId);
    if (group.joinRequests.includes(userIdObj) || group.members.includes(userIdObj)) {
      throw new Error('Already requested or member');
    }

    group.joinRequests.push(userIdObj);
    await group.save();
    return group;
  }
  async accept (userId:string, groupId: string) {
    const group = await Group.findById(groupId);
    if (!group) throw new Error('Group not found');

    console.log({userId})

    const userIdObj = new mongoose.Types.ObjectId(userId);
    if (!group.joinRequests.includes(userIdObj)) {
      throw new Error('No such join request');
    }

    group.joinRequests = group.joinRequests.filter(id => id.toString() !== userId);
    group.members.push(userIdObj);
    return await group.save();
  }
  async leave (userId:string, groupId: string) {
    const group = await Group.findById(groupId);
    if (!group) throw new Error('Group not found');

    const userIdObj = new mongoose.Types.ObjectId(userId);
    if (!group.members.includes(userIdObj)) {
      throw new Error('User not a group member');
    }

    group.members = group.members.filter(id => id.toString() !== userId);
    return await group.save();
  }
}