const MONGODB_URL = process.env.MONGODB_URL;
const port = 4000;
const link = `http://localhost:${port}`;

module.exports = {
	url: MONGODB_URL,
	port: port,
	link: link,
};
