var express = require('express');
var router = express.Router();

var User = require('../models/user');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//'hard coded' Millie
router.get('/millie', function(req, res) {
  var millie = new User({
    name: 'Millie',
    username: 'millie11',
    password: 'reallybadpassword'
  });

  millie.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('User saved successfully!');
      res.sendStatus(200);
    }
  });
});//end millie get route

router.put('/updateMillie', function(req, res) {
  console.log('hit put route - updateMillie');

  //Hard coded to find one user with name Millie
  User.findOne({name: 'Millie'}, function(err, userResult) {
    console.log('find user result = ', userResult);

    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      userResult.name = "Millie Walsh";
      userResult.admin = false;

      userResult.save(function(err) {
        if(err){
          console.log(err);
          res.sendStatus(500);
        }else{
          console.log('Update user = ', userResult._id);
          res.sendStatus(userResult);
        }
      });
    }
  });
}); //end update Millie route

// delete Millie route
router.delete('/deleteMillie', function(req, res) {
  console.log('delete route');

  User.findOne({username: 'millie11'}, function(err, userResult) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      User.remove({_id: userResult._id}, function(err) {});
      res.sendStatus(200);
    }
  });
});// end delete route

module.exports = router;
