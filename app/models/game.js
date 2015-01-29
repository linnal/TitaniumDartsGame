exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "player": "TEXT",
		    "score":"TEXT",
		    "timestamp": "TEXT",
		    "color": "TEXT",
		    "round": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "game",
			idAttribute:'id',
			db_name:'db'
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};