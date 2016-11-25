var express = require('express');
var router = express.Router();
var Track = require('../models/track');

router.get('/', function(req, res) {
  Track.find( function(err, tracks) {
    res.send(tracks);
  });
});


router.post('/track_template', function(req, res){
  var track = req.body;
  res.render('track', {
    id: track.id,
    title: track.title,
    complete: track.complete
  });
})


router.post('/', function(req, res) {
  new Track({
    title:req.body.title
  }).save( function( err, track) {
      res.send(track);
  });
});


router.put('/:id', function(req, res) {
  Track.findByIdAndUpdate(
    req.params.id, {
      $set: {
        complete: req.body.complete
      }
    },
    function(err, track) {
      res.send(track);
    });
});

router.delete('/:id', function(req, res) {
  Track.findById(req.params.id, function( err, track) {
    track.remove();
    res.status(200).send({
      success: true
    });
  });
});


module.exports = router;
