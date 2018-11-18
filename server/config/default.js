
const PORT = process.env.PORT || 3000;
module.exports = {
	app:
    {
    	name: 'sample-server',
    	port: PORT,
    	baseUrl: `http://localhost:${PORT}`,
    }
};
