import User from '../../schemas/user.js';
import { generateToken } from '../../shared/utils.js';

const createNewUser = async ({ username, role }) => {
	if (username && role) {
		const user = await User.create({
			username,
			role,
		});

		const token = generateToken(username, role, user.secret);

		return token;
	} else {
		throw new Error('Username and Role is required');
	}
};

export { createNewUser };
