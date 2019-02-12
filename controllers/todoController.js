var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

var mongoose = require('mongoose');
mongoose.connect('xxxxx', {useNewUrlParser: true });
// create a schema 
var todoSchema = new mongoose.Schema({
	item: String 
});
var Todo = mongoose.model('Todo', todoSchema); 


module.exports = function(app){

	app.get('/todo', function(req,res){  
		// get data from mongoDB and pass it to view
		Todo.find({}, function(err, data){ 
			if (err) throw err;
	    	res.render('todo', {todos: data});
		});
	});	

	app.post('/todo', urlencodedParser, function(req,res){  
		// get data from the view and add it to mongoDB
		var newTodo = Todo(req.body).save(function(err, data){ 
			if (err) throw err;
	    	res.json(data); 
		})
	});	

	app.delete('/todo/:item', function(req,res){  
		// delete the requested item from mongoDB
		Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
			if (err) throw err;
	    	res.json(data);
		});
	});	

}