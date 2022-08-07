import jwt from 'jsonwebtoken';
import User from '../schemas/user.js';

export const generateToken = (username, role, userSecret) => {
	return jwt.sign({ username, role }, userSecret);
};

export const verifyAndDecodeToken = async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		const token = req.headers.authorization.split(' ')[1];
		try {
			const decodedData = jwt.decode(token);
			const user = await User.findOne({ username: decodedData.username });

			//verify token holder
			const isValidToken = jwt.verify(token, user.secret);

			if (isValidToken) {
				req.user = user;
			}

			next();
		} catch (e) {
			console.log(e);
			res.status(424).send({
				success: false,
				description: 'Unauthorized access',
			});
		}
	} else {
		res.status(403).send({
			success: false,
			description: 'Unauthorized access',
		});
	}
};
