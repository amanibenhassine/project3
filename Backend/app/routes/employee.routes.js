//Get all employees


Routes.get('/employees', function(req, res){
  Employee.find(function(err, employees){
    if(err)
      res.send(err);
    res.json(employees);
  })
});

//Get employee by id
Routes.get('/employees/:id', function(req, res){
	Employee.findOne({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

//Create new employee
Routes.post('/employees', function(req, res){
	Employee.create( req.body, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Remove selected employee
Routes.delete('/employees/:id', function(req, res){
	Employee.findOneAndRemove({_id:req.params.id}, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Update selected employee
Routes.put('/employees/:id', function(req, res){
	var query = {
		name:req.body.name,
		dept:req.body.dept,
		area:req.body.area,
		status:req.body.status,
		contact:req.body.contact,
		salary:req.body.salary
	};

	Employee.findOneAndUpdate({_id:req.params.id}, query, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Get all departments
Routes.get('/departments', function(req, res){
	Departments.find(function(err, departmens){
	  if(err)
		res.send(err);
	  res.json(departmens);
	})
});

//Create new department
Routes.post('/departments', function(req, res){
	Departments.create(req.body, function(err, departments){
		if(err)
			res.send(err);
		res.json(departments);
	});
});

//Remove selected departemt
Routes.delete('/departments/:id', function(req, res){
	Departments.findOneAndRemove({_id:req.params.id}, function(err, departments){
		if(err)
			res.send(err);
		res.json(departments);
	});
});

//Get Department by id
Routes.get('/departments/:id', function(req, res){
	Departments.findOne({_id:req.params.id}, function(err, departments){
		if(err)
			res.send(err);
		res.json(departments);
	});
});

//Update selected department
Routes.put('/departments/:id', function(req, res){
	var query = {
		name:req.body.name,
	};

	Departments.findOneAndUpdate({_id:req.params.id}, query, function(err, departments){
		if(err)
			res.send(err);
		res.json(departments);
	});
});

//Get all positions
Routes.get('/positions', function(req, res){
	Positions.find(function(err, positions){
	  if(err)
		res.send(err);
	  res.json(positions);
	})
});

//Create new positions
Routes.post('/positions', function(req, res){
	Positions.create(req.body, function(err, positions){
		if(err)
			res.send(err);
		res.json(positions);
	});
});

//Remove selected position
Routes.delete('/positions/:id', function(req, res){
	Positions.findOneAndRemove({_id:req.params.id}, function(err, positions){
		if(err)
			res.send(err);
		res.json(positions);
	});
});

//Get position by id
Routes.get('/positions/:id', function(req, res){
	Positions.findOne({_id:req.params.id}, function(err, positions){
		if(err)
			res.send(err);
		res.json(positions);
	});
});

//Update selected position
Routes.put('/positions/:id', function(req, res){
	var query = {
		name:req.body.name,
	};

	Positions.findOneAndUpdate({_id:req.params.id}, query, function(err, t){
		if(err)
			res.send(err);
		res.json(t);
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

