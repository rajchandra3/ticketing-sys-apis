import express from 'express';

import { verifyAndDecodeToken } from '../../shared/utils.js';
import { createNewTicket } from './controller.js';

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

export default ticketRouter;
