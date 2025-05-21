import mongoose, { Document, Schema } from 'mongoose';

export interface ChatMessage extends Document {
  sender: mongoose.Types.ObjectId;
  recipient?: mongoose.Types.ObjectId;
  group?: mongoose.Types.ObjectId;
  message: string;
  timestamp: Date;
}

const chatSchema = new Schema<ChatMessage>({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ChatMessage>('Chat', chatSchema);