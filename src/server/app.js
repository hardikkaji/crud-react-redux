const express = require('express');
const mongoDb = require('mongodb');
const bodyParser = require('body-parser');
const dbInstance = require('./mongo-db-instance').getDbInstance();
const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

dbInstance.then((db) => {
	app.get('/api/games', (req, res) => {
		db.collection('games').find({}).toArray((err, games) => {
			res.json({ games });
		});
	});

	app.get('/api/games/:_id', (req, res) => {
		db.collection('games').findOne({ _id: new mongoDb.ObjectId(req.params._id) }, (err, game) => {
			res.json({ game });
		});
	});

	app.put('/api/games/:_id', (req, res) => {
		const { title, coverUrl } = req.body;
		db.collection('games').findOneAndUpdate(
			{ _id: new mongoDb.ObjectId(req.params._id) },
			{ $set: { title, coverUrl } },
			{ returnOriginal: false },
			(err, result) => {
				if (err) {
					res.status(500)
						.json({
							errors: {
								global: "Something went wrong while saving data. Please try again!"
							}
						});
				} else {
					res.json({ game: result.value });
				}
			}
		);
	});

	app.delete("/api/games/:_id", (req, res) => {
		db.collection('games').deleteOne({ _id: new mongoDb.ObjectId(req.params._id) }, (err, result) => {
			if (err) {
				res.status(500)
					.json({
						errors: {
							global: "Something went wrong while saving data. Please try again!"
						}
					});
			} else {
				res.json({ success: true });
			}
		});
	});

	app.post("/api/games", (req, res) => {
		const { title, coverUrl } = req.body;
		db.collection('games').insertOne({ title, coverUrl }, (err, result) => {
			if (err) {
				res.status(500)
					.json({
						errors: {
							global: "Something went wrong while saving data. Please try again!"
						}
					});
			} else {
				res.json({ game: result.ops[0] });
			}
		});
	});

	app.use((req, res) => res.status(404).json({ errors: { global: "Something went wrong." } }));
	app.listen(5000, () => console.log("App is running on port 5000"));
});
