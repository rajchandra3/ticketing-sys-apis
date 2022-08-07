import { nanoid } from 'nanoid';

import Ticket from '../../schemas/ticket.js';

//added priority to help in creating new docs with different priorities
const createNewTicket = async ({ title, description, priority, user }) => {
	if (user.role === 'admin') {
		const ticket = await Ticket.create({
			id: nanoid(),
			title,
			description,
			priority,
			assignedTo: user._id,
		});

		return ticket.id;
	} else {
		throw new Error(`You don't have access to perform this action`);
	}
};

const getAllTickets = async () => {
	return await Ticket.find();
};

const getFilteredData = (query) => {
	return Ticket.find(query);
};

const deleteTicket = (id, user) => {
	if (user.role === 'admin') {
		return Ticket.deleteOne({ id });
	} else {
		throw new Error('Unauthorized Access!');
	}
};

const closeTicket = async (id, user) => {
	const ticketsAssigned = await Ticket.find({ assignedTo: user._id }).lean();
	const highPriorityTickets = await Ticket.find({ priority: 'high' });
	const mediumPriorityTickets = await Ticket.find({ priority: 'medium' });

	let ticketToClose = ticketsAssigned.filter((t) => t.id == id);
	ticketToClose = ticketToClose[0];

	if (!ticketToClose) {
		return {
			success: false,
			description: 'Ticket not found',
		};
	}

	if (
		ticketToClose.priority === 'low' &&
		(highPriorityTickets.length > 0 || mediumPriorityTickets.length > 0)
	) {
		return {
			success: false,
			description: 'A higher priority task remains to be closed',
			data: {
				mediumPriorityTickets,
				highPriorityTickets,
			},
		};
	} else if (
		ticketToClose.priority === 'medium' &&
		highPriorityTickets.length > 0
	) {
		return {
			success: false,
			description: 'A higher priority task remains to be closed',
			data: {
				highPriorityTickets,
			},
		};
	} else {
		await Ticket.updateOne({ id }, { status: 'close' });
		return {
			success: true,
			data: {
				message: `Marked task with id - ${id} as close`,
			},
		};
	}
};

export {
	createNewTicket,
	getAllTickets,
	getFilteredData,
	closeTicket,
	deleteTicket,
};
