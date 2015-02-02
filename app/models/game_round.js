exports.definition = {
	config: {
		columns: {
		    "game_id": "TEXT",
		    "rounds": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "game_round",
			idAttribute:'game_id',
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