import mongoose, { Schema, Document } from 'mongoose';

interface Group extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  joinRequests: mongoose.Types.ObjectId[];
}

const groupSchema = new Schema<Group>({
  name: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  joinRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<Group>('Group', groupSchema);