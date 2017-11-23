var mongo = require('mongoose');
var User = mongo.model('User', {
    name: {
        required: true,
        type: String
    },
    phoneno: {
        required: true,
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    },
    token: {
        required: true,
        type: String,
        default: null
    }
}
);
module.exports = { User };