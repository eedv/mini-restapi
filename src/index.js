const app = require('./app');
const dbQuerys = require('./db-querys');
const utils = require('./utils');
const _ = require('lodash');

app.get('/products', async (req, res) => {
	res.header({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	})
	try {
		let query = {};
		query.period = Number(req.query.period || utils.getMonth());
		query.week = Number(req.query.week || utils.getWeek());

		let productList = await dbQuerys.getPeriod(query);
		res.json(productList);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});
app.get('/orders', async (req, res) => {
	res.header({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	})
	try {
		let orders = await dbQuerys.getAll('orders');
		res.json(orders);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});
app.get('/orders/:year/:period/:week', async (req, res) => {
	res.header({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	})
	try {
		_.forEach(req.params, ((value, key) => req.params[key] = Number(value)));
		let orders = await dbQuerys.getOrders(req.params);
		res.json(orders);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});
app.post('/orders/', async (req, res) => {
	res.header({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	})
	try {
		let order = await dbQuerys.createOrder();
		res.json(order);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});