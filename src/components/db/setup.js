import mongoose from 'mongoose';
import config from '../../../config.js';

mongoose.set('useCreateIndex', true);

const production = config.appEnv === 'production';
const dbUrl = config.dbUrl;
const connect = () => {
	// CONNECTING TO MONGODB ON START
	mongoose.connect(
		dbUrl,
		{
			useNewUrlParser: true,
			retryWrites: false,
			useUnifiedTopology: true,
		},
		(e) => {
			if (e) {
				console.log('e', e);
				process.exit(1);
			} else if (production) {
				console.log('Database ready to use.');
			} else if (!production) {
				console.log('DB ready to use -> ', dbUrl);
			}
		},
	);
};

export default connect;
