import Ticket from '../../schemas/ticket.js';

const createNewTicket = async ({ title, description, user }) => {
	if (user.role === 'admin') {
		const ticket = await Ticket.create({
			title,
			description,
		});

		return ticket.id;
	} else {
		throw new Error(`You don't have access to perform this action`);
	}
};

export { createNewTicket };
