const mongoose = require('mongoose')
const schemas = require('./schemas');
const User = mongoose.model('user', schemas.userSchema, 'user')

function createUser({userId}) {
    if(typeof(userId) !== 'string') {
        return Promise.reject(new Error('User empty or not string'))
    } else {
        return new User({
            userId,
            created: Date.now()
        }).save()
    }
}
function findUserById(userId) {
    return User.find({userId})
    // .then(doc => {
    //     if (doc) return doc;
    //     else throw `User (${username}), not found!`;
    // })
}
function getAllUsers() {
    return User.find({})
    .then(docs => {
        if (docs) {
            let docsMap = {};
            docs.forEach(function(doc) {
                docsMap[doc._id] = doc;
              });
              return docsMap; 
        }
        else throw `Error`;
    })
}

exports.createUser = createUser;
exports.findUserById = findUserById;
exports.getAllUsers = getAllUsers;