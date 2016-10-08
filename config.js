module.exports = {
	mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/my-cool-app',
	serverPort: process.env.PORT || 8000,
};
