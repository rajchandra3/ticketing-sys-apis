import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		id: { type: String, unique: true },
		title: String,
		description: String,
		status: { type: String, default: 'open', enum: ['open', 'close'] },
		priority: {
			type: String,
			default: 'low',
			enum: ['low', 'medium', 'high'],
		},
		assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true },
);

const ticket = mongoose.model('Ticket', schema);

export default ticket;
