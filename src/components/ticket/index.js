import express from 'express';

import { verifyAndDecodeToken } from '../../shared/utils.js';
import {
	createNewTicket,
	getAllTickets,
	getFilteredData,
	deleteTicket,
	closeTicket,
} from './controller.js';

const ticketRouter = express.Router();

ticketRouter.post('/new', verifyAndDecodeToken, async (req, res) => {
	const { user } = req;
	try {
		const id = await createNewTicket({ ...req.body, user });
		res.status(200).send({
			success: true,
			data: { id },
		});
	} catch (e) {
		console.log(e);
		if (e.code === 11000) {
			res.status(200).send({
				success: false,
				description: 'id cannot be same',
			});
		} else {
			res.status(424).send({
				success: false,
				description: e.message,
			});
		}
	}
});

ticketRouter.get('/all', verifyAndDecodeToken, async (req, res) => {
	try {
		const results = await getAllTickets();
		res.status(200).send({
			success: true,
			data: { tickets: results },
		});
	} catch (e) {
		res.status(424).send({
			success: false,
			description: e.message,
		});
	}
});

ticketRouter.post('/delete', verifyAndDecodeToken, async (req, res) => {
	try {
		await deleteTicket(req.body.ticketID, req.user);
		res.status(200).send({
			success: true,
			message: 'Ticket was deleted successfully',
			data: {},
		});
	} catch (e) {
		res.status(424).send({
			success: false,
			description: e.message,
		});
	}
});

ticketRouter.post('/markAsClosed', verifyAndDecodeToken, async (req, res) => {
	try {
		res.status(200).send(await closeTicket(req.body.ticketID, req.user));
	} catch (e) {
		res.status(424).send({
			success: false,
			description: e.message,
		});
	}
});

ticketRouter.get('/', verifyAndDecodeToken, async (req, res) => {
	try {
		const results = await getFilteredData(req.query);
		res.status(200).send({
			success: true,
			data: { tickets: results },
		});
	} catch (e) {
		res.status(424).send({
			success: false,
			description: e.message,
		});
	}
});
export default ticketRouter;
