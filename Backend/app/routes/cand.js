


  //Create 
Router.post('/cand', function(req, res){
	Candidat.create( req.body, function(err, candidats){
		if(err)
			res.send(err);
		res.json(candidats);
	});
});

Routes.get('/cand', function(req, res){
  Candidat.find(function(err, candidats){
    if(err)
      res.send(err);
    res.json(candidats);
  })
});

app.use('/api', Router);
