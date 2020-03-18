
// NPM
const mongoose        = require('mongoose')
const express         = require('express')
const bodyParser      = require("body-parser");
const path            = require('path');

// ME
const userController  = require('./controllers/user');
const positionController  = require('./controllers/position');


mongoose.connect('mongodb+srv://admin:12345@cluster0-xkvkh.mongodb.net/raspberry?retryWrites=true&w=majority',  { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', handleError);
db.once('open', function() {
    console.log("Connection Successful!");
});

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/api/users',function(req,res){
  return userController.getAllUsers()
  .then( users => res.json(users))
  .catch( err => res.status(401).send(err))
});
app.post('/api/users',function(req,res){
  const user = req.body;
  console.log(user);
  return userController.createUser(user)
  .then( user => res.json(user))
  .catch( err => res.status(401).send(err))
});

app.post('/api/positions/:userId',function(req,res){
  const newPositions = req.body;
  const userId = req.params.userId;
  console.log(newPositions);
  return Promise.all(newPositions.map(newPosition => positionController.newPosition({...newPosition, userId})))
  .then( position => res.json(position))
  .catch( err => res.status(401).send(err))
});
app.get('/api/positions/:userId',function(req,res){
  const userId = req.params.userId;
  return positionController.getPositionsByUserId(userId)
  .then( users => res.json(users))
  .catch( err => res.status(401).send(err))
});
app.delete('/api/positions', function(re,res){
  return positionController.deleteDB()
  .then( users => res.json(users))
  .catch( err => res.status(401).send(err))
});

var htmlPath = path.join(__dirname, 'html');
app.use('/:userId', express.static(htmlPath));

var server = app.listen(process.env.PORT,function(){
  var port = server.address().port;
  console.log('listening on port:'+port);
})

function handleError(error){
  console.error(new Date().toLocaleString() + ' (ERROR): ', JSON.stringify(error || 'unknow'));
}
function handleSuccess(data){
  console.log(new Date().toLocaleString() + ' (SUCCESS):', JSON.stringify(data || 'null'));
}

