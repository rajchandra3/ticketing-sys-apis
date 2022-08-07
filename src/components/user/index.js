import express from 'express';
import { createNewUser } from './controller.js';

const userRouter = express.Router();

// template route
userRouter.post('/new', async (req, res) => {
	try {
		const token = await createNewUser(req.body);
		res.status(201).send({
			success: true,
			data: { token },
		});
	} catch (e) {
		console.log(e);
		if (e.code === 11000) {
			res.status(200).send({
				success: false,
				description: 'Username is already taken',
			});
		} else {
			res.status(424).send({
				success: false,
				description: e.message,
			});
		}
	}
});

export default userRouter;
