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

const orderExists = async (query) => {
	let canInsert = await Promise.all([
		db.orders.findOne(query, {_id: 1}),
		db.products.findOne(query, {_id: 1})
	])
	return canInsert.every((doc) => !!doc);
}
const createOrder = async () => {
	const year = new Date().getFullYear();
	const period = utils.getFourWeekMonth();
	const week = utils.getWeek();
	const order = {
		name: 'New order',
		periodWeek: `${year}-${period}`.padStart(2, '0') + '-' + `${week}`.padStart(2, '0'),
		creationDate: new Date(),
		year: year,
		period: period,
		week: week,
		products: []
	}
	let canInsert = await orderExists({ year, period, week});
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

module.exports = {
	search,
	getPeriod,
	getAll,
	getOrders,
	createOrder,
	getLastPeriod,
	getAll,
	updateOrder
}