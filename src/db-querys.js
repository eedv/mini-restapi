const db = require('./db-connection');
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
const getAll = async (collectionName) => {
	return await db[collectionName].find({});
}

module.exports = {
	search,
	getPeriod,
	getAll
}