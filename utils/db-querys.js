const db = require('./db-connection');
const search = async (query) => {
	let docs = await db.products.findAsCursor(
		{$text: { $search: query }},
		{score: {$meta: "textScore"}}
	).sort( { score: { $meta: "textScore" } } ).toArray();
	return docs;
};


module.exports = {
	search
}