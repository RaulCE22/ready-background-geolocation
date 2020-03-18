const mongoose = require('mongoose')
const schemas = require('./schemas');

const Position = mongoose.model('position', schemas.positionSchema, 'position')

function newPosition(position) {
    if(typeof(position) !== 'object')
        return Promise.reject(new Error('Position empty or not object'))
    
    return new Position(position).save()
}
function getPositionsByUserId(userId) {
    console.log('getPositionsByUserId', userId);
    if(typeof(userId) !== 'string')
        return Promise.reject(new Error('UserId empty or not string'))
    return Position.find({userId: userId})
    .then(positions => {
        if (positions) {
              return positions; 
        }
        else throw `Error`;
    })

}
function deleteDB() {
    return Position.deleteMany({})
}
exports.newPosition = newPosition;
exports.getPositionsByUserId = getPositionsByUserId;
exports.deleteDB = deleteDB;