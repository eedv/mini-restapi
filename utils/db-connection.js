const MongoClient = require('mongodb').MongoClient;

// Database Name
const dbName = 'justooldb';

// Create a new MongoClient
const client = new MongoClient(process.env.DB_CONNECTION_URI, { useNewUrlParser: true });

module.exports = {
	connect() {
		return new Promise(function(resolve, reject) {
			client.connect(function(err) {
				if(err) return reject(err);
				console.log("Connected successfully to database");

				resolve(client.db(dbName));

			});
		})
	}
}
// module.exports = {
// 	connect: async () => {
// 		return await client.connect();
// 	}
// }