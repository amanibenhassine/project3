//Get all employees


Routes.get('/employes', function(req, res){
  Employe.find(function(err, employes){
    if(err)
      res.send(err);
    res.json(employes);
  })
});

//Get employee by id
Routes.get('/employes/:id', function(req, res){
	Employe.findOne({_id:req.params.id}, function(err, employe){
		if(err)
			res.send(err);
		res.json(employe);
	});
});

//Create new employee
Routes.post('/employes', function(req, res){
	Employe.create( req.body, function(err, employes){
		if(err)
			res.send(err);
		res.json(employes);
	});
});

//Remove selected employee
Routes.delete('/employes/:id', function(req, res){
	Employe.findOneAndRemove({_id:req.params.id}, function(err, employes){
		if(err)
			res.send(err);
		res.json(employes);
	});
});

//Update selected employee
Routes.put('/employes/:id', function(req, res){
	var query = {
		idUser:req.body.idUser,
		nom:req.body.nom,
		prenom:req.body.prenom,
		phone:req.body.phone,
		email:req.body.email,
		photo:req.body.photo
	};

	Employe.findOneAndUpdate({_id:req.params.id}, query, function(err, employees){
		if(err)
			res.send(err);
		res.json(employes);
	});
});






















//Create new user
Routes.post('/users', function(req, res){
	var username = req.body.username;
	var firstname = req.body.fname;
	var lastname = req.body.lname;
	var admin = false;
	if(req.body.role == "Admin"){
		admin = true;
	}
	
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		var user = new User({username: username, password: hash, firstname: firstname, lastname: lastname, admin: admin});
		User.create(user, function(err, users){
			if(err)
				res.send(err);
			res.json(users);
		});
	});
});

//Get all users
Routes.get('/users', function(req, res){
  User.find(function(err, users){
    if(err)
      res.send(err);
    res.json(users);
  })
});

//Get user by id
Routes.get('/users/:id', function(req, res){
	User.findOne({_id:req.params.id}, function(err, user){
		if(err)
			res.send(err);
		res.json(user);
	});
});

//Remove selected user
Routes.delete('/users/:id', function(req, res){
	User.findOneAndRemove({_id:req.params.id}, function(err, user){
		if(err)
			res.send(err);
		res.json(user);
	});
});

//Update selected user
Routes.put('/users/:id', function(req, res){
	var admin = false;
	if(req.body.role == "Admin"){
		admin = true;
	}
	var query = {
		username:req.body.username,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		admin:admin
	};

	User.findOneAndUpdate({_id:req.params.id}, query, function(err, user){
		if(err)
			res.send(err);
		res.json(user);
	});
});

app.use('/api', Routes);

