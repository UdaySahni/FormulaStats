var bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {
      id: {
        type: 'number',
        autoIncrement: true
      },
	    username : {
	    	type: 'string',
	    	required: true,
	    	unique: true
	    },
	    password : {
	        type : 'string',
	        minLength: 6,
	        required: true
	    },
      firstFavouriteDriver : {
        model: 'drivers',
        required: true
      },
      secondFavouriteDriver : {
        model: 'drivers',
        required: true
      },
      favouriteConstructor : {
        model: 'constructors',
        required: true
      }
    },

  customToJSON: function(){
    return _.omit(this, ['password', 'phoneNumber']);
  },

  beforeCreate: async function(user, cb) {

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
              cb(err);
            } else {
              user.password = hash;
              cb();
            }
        });
    });
  }
};
