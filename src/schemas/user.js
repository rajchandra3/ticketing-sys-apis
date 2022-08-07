import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const schema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		role: { type: String, required: true, enum: ['admin', 'employee'] },
		secret: { type: String, default: nanoid() },
	},
	{ timestamps: true },
);

const user = mongoose.model('User', schema);

export default user;
