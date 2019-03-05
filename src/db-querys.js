const db = require('./db-connection');
const utils = require('./utils');
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
const createOrder = async () => {
	const order = {
		name: 'New order',
		creationDate: new Date(),
		year: new Date().getFullYear(),
		period: utils.getMonth(),
		week: utils.getWeek(),
		products: []
	}
	return await db.orders.insertOne(order)
}
module.exports = {
	search,
	getPeriod,
	getAll,
	getOrders,
	createOrder,
	getLastPeriod,
	getAll
}