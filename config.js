import dotenv from 'dotenv';

dotenv.config({ silent: true });

const config = {
	appEnv: process.env.APP_ENV,
	dbUrl: process.env.ATLAS_URL,
};

export default config;
