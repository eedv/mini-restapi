const app = require('../../utils/app');
const dbQuerys = require('../../utils/db-querys');
app.get('*', async (req, res) => {
	try {
		let productList = await dbQuerys.getAll('products');
		res.send(productList);
	} catch (error) {
		res.status(404).send(err);
	}
});