var express = require('express');
var bp = require('body-parser');
var _ = require('underscore');
var db = require('./db.js')
var app = express(); //object of express

app.use(express.static('public'));

app.use(bp.json());
var nextId=1;

var todoTask = [
    {
        description: "First Description",
        completed: true
    },
    {
        description: "Second Description",
        completed: true
    },
    {
        description: "Third Description very good",
        completed: true
    },
    {
        description: "Fourth Description very bad",
        completed: true
    }
]

app.get('/getmytask', function (req, res) {
    res.json(todoTask);
});
app.post('/todos',function(req,res) {
var body =_.pick(req.body,'description','completed');
db.todo.create(body).then(function (todo) {
  res.json(todo.toJSON());
}, function (e) {
  res.status(400).json(e);
})
app.get('/getmytask/:id',function(req,res) {
  var todoId=parseInt(req.params.id,10);
//  var matchedTodo;
  //todoTask.forEach(function(todo) {
    //if(todoId===todo.id) {
      //matchedTodo=todo;
    //}
    var matchedTodo = _.findWhere(todoTask,{id:todoId});
  //});
  if(matchedTodo) {
    res.json(matchedTodo);
  }
  else {
    res.status(404).send();
  }
});
app.delete('/deleteData/:id',function(req, res) {
  var todoId = parseInt(req.params.id,10);
  var matchedTodo=_.findWhere(todoTask,{id:todoId});
  if(!matchedTodo) {
    res.status(404).json({"error":"id not found"});
  }
  else {
    todoTask=_.without(todoTask,matchedTodo);
    res.json(matchedTodo);
  }
});
app.listen(3000, function () {
    console.log("Application running at Port 3000");
})
