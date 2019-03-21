const db = require('./db-connection');
const utils = require('./utils');
const customError = require('./custom-error')
const search = async (collectionName, query) => {
	let docs = await db[collectionName].findAsCursor(
		{$text: { $search: query }},
		{score: {$meta: "textScore"}}
	).sort( { score: { $meta: "textScore" } } ).toArray();
	return docs;
};
const getPeriod = async ({period, week}) => {
	return await db.products.findOne({period, week})
}
const getLastPeriod = async () => {
	let matchPeriod = await db.products.findAsCursor({}).sort({_id:-1}).limit(1).toArray();
	return matchPeriod[0];
}
const getAll = async (collectionName) => {
	return await db[collectionName].find({});
}
const getOrders = async (params) => {
	return await db.orders.find(params);
}

const canInsertNewOrder = async (query) => {
	let order = await db.orders.findOne(query, {_id: 1});
	let periodProducts = await db.products.findOne(query, {_id: 1});
	return !order && periodProducts;
}
const createOrder = async () => {
	const year = new Date().getFullYear();
	const period = utils.getFourWeekMonth();
	const week = utils.getWeek();
	const order = {
		name: 'Nuevo Pedido',
		periodWeek: `${year}-${period}`.padStart(2, '0') + '-' + `${week}`.padStart(2, '0'),
		creationDate: new Date(),
		year: year,
		period: period,
		week: week,
		config: await getConfig(),
		products: []
	}
	let canInsert = await canInsertNewOrder({ year, period, week});
	if(canInsert) {
		return await db.orders.insertOne(order)
	}
	else {
		throw new customError('Order already exists or there is not data for requested week', 20);
	}
}
const updateOrder = async (queryParams, products) => {
	return await db.orders.update(queryParams, {$set: {products: products}});
};

const getConfig = async () => {
	return await db.config.findOne({});
}
const saveConfig = async (config) => {
	return await db.config.update({}, {$set: config}, {upsert: true});
}
module.exports = {
	search,
	getPeriod,
	getAll,
	getOrders,
	createOrder,
	getLastPeriod,
	getAll,
	updateOrder,
	getConfig,
	saveConfig
}