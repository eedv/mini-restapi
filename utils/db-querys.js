const Database = require('./db-connection');
let database;
Database.connect().then(function(db) {
	database = db;
});

const getAll = async (resType) => {
	const collection = database.collection(resType);
	let docs = await collection.find({"name": "ACEITE ESENCIAL DE MENTA 10 ML -ANF"});
	return await docs.toArray();
};


module.exports = {
	getAll
}