const app = require('../../utils/app');
const dbQuerys = require('../../utils/db-querys');
app.get('/products', async (req, res) => {
	try {
		let productList;
		if(req.query.query) {
			productList = await dbQuerys.search(req.query.query);
		}
		else {
			productList = await dbQuerys.getAll();
		}
		res.json(productList);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});