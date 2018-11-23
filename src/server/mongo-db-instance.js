const mongoClient = require('mongodb').MongoClient;
const dbUrl = "mongodb://localhost:27017";
const dbName = "gamesDb";
let dbInstance = null;

const dbConnectPromise = new Promise((resolve, reject) => {
	if (dbInstance !== null) {
		return resolve(dbInstance);
	}
	mongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
		if (err) {
			console.error("Failed to connect with Database", err);
			return reject(err);
		} else {
			dbInstance = client.db(dbName);
			return resolve(dbInstance);
		}
	});
});

function getDbInstance() {
	return dbConnectPromise;
}

module.exports = {
	getDbInstance: getDbInstance
};
