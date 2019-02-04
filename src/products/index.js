const app = require('../app');
const dbQuerys = require('../db-querys');
app.get('*', async (req, res) => {
	res.header({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	})
	try {
		let productList;
		if(req.query.query) {
			productList = await dbQuerys.search('products', req.query.query);
		}
		else {
			productList = await dbQuerys.getAll('products');
		}
		res.json(productList);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});
