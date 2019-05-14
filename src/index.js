const app = require('./app');
const dbQuerys = require('./db-querys');
const utils = require('./utils');
const _ = require('lodash');

app.get('/products', async (req, res) => {
	try {
		let query
		if(req.query.period) {
			query = {};
			query.year = Number(req.query.year || new Date().getFullYear());
			query.period = Number(req.query.period || utils.getFourWeekMonth());
			query.week = Number(req.query.week || utils.getYearWeek());
		}

		let productList = query
			? await dbQuerys.getPeriod(query)
			: await dbQuerys.getLastPeriod();

		res.json(productList);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});
app.get('/products/:priceListId', async (req, res) => {
	try {
		const query = {id: req.params.priceListId}
		let productList = await dbQuerys.getPeriod(query)

		res.json(productList);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});

app.get('/orders', async (req, res) => {
	try {
		let query = {};
		_.forEach(req.query, ((value, key) => query[key] = Number(value)));
		let orders = await dbQuerys.getOrders(query);
		res.json(orders);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);

	}
});
app.get('/orders/:orderId', async (req, res) => {
	try {
		const query = {id: req.params.orderId}
		let orders = await dbQuerys.getOrders(query);
		res.json(orders);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});
app.patch('/orders/:orderId', async (req, res) => {
	try {
		let orders = await dbQuerys.updateOrder(req.params.orderId, req.body);
		res.json(orders);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});
app.post('/orders', async (req, res) => {
	try {
		let order = await dbQuerys.createOrder();
		res.json(order);
	} catch (err) {
		console.log(err);
		if(err.code == 20) {
			res.status(412).send(err);
		}
		else {
			res.status(404).send(err);
		}
	}
});
app.get('/config', async (req, res) => {
	try {
		let config = await dbQuerys.getConfig();
		res.json(config);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});
app.put('/config', async (req, res) => {
	try {
		let config = await dbQuerys.saveConfig(req.body);
		res.json(config);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
});