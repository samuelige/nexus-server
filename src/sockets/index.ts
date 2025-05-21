import { Server, Socket } from 'socket.io';
import Chat from "@/model/chat.model";

export const initSocketEvents = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;
    if (!userId) return;

    socket.join(userId); // for private messaging

    socket.on('private_message', async ({ recipientId, message }) => {
      const chat = await Chat.create({ sender: userId, recipient: recipientId, message });
      socket.to(recipientId).emit('private_message', chat);
    });

    socket.on('join_group', ({ groupId }) => {
      socket.join(groupId);
    });

    socket.on('group_message', async ({ groupId, message }) => {
      const chat = await Chat.create({ sender: userId, group: groupId, message });
      io.to(groupId).emit('group_message', chat);
    });

    socket.on('leave_group', ({ groupId }) => {
      if (!groupId) return;
      socket.leave(groupId);
    });
  });
};


// const userSockets: Record<string, string> = {};
// const groupRooms: Record<string, Set<string>> = {};

// export const initSocketEvents = (io: Server) => {
//   io.on('connection', async (socket: Socket) => {
//     const userId = (socket as any).user.userId;
//     userSockets[userId] = socket.id;

//     socket.on('private_message', async ({ to, message }) => {
//       const toSocket = userSockets[to];
//       await Chat.create({ from: userId, to, message, type: 'private' });
//       if (toSocket) {
//         io.to(toSocket).emit('private_message', { from: userId, message });
//       }
//     });

//     socket.on('join_group', ({ group }) => {
//       if (!groupRooms[group]) groupRooms[group] = new Set();
//       groupRooms[group].add(userId);
//       socket.join(group);
//     });

//     socket.on('leave_group', ({ group }) => {
//       if (groupRooms[group]) groupRooms[group].delete(userId);
//       socket.leave(group);
//     });

//     socket.on('group_message', async ({ group, message }) => {
//       if (groupRooms[group]?.has(userId)) {
//         await Chat.create({ from: userId, to: group, message, type: 'group' });
//         io.to(group).emit('group_message', { from: userId, message });
//       }
//     });

//     socket.on('disconnect', () => {
//       delete userSockets[userId];
//       Object.values(groupRooms).forEach(set => set.delete(userId));
//     });
//   });
// };
