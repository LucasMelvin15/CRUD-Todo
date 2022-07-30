//npm init 
//npm install express dotenv cors mongoose
//npm install nodemon --sav-dev
//change the start to nodemon server js so you can run npm start


//declare variables
const  express = require ('express')
const app = express()
PORT = 8000
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
//add model variable
const TodoTask = require('./models/todotask')
const { Router } = require('express')


//set middlewares
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.DB_CONNECTION,
  {useNewUrlParser:true},
  ()=>{console.log('Connected to Database')})
//GET METHOD
  app.get("/", async (req, res) => {
    try {
        TodoTask.find({}, (err, list) => { //finds all tasks and renders all of them according to your database
            res.render("index.ejs", { Todo: list });
        });
    // console.log(todoTasks)
    } catch (err) {
        if (err) return res.status(500).send({message: error.meassag});
    }
});
//POST METHOD
app.post('/', async(req,res) =>{
   const todoTask = new TodoTask(
    {
      title:req.body.title,
      content: req.body.content
    }
   )
   try{
     await todoTask.save()
     console.log(todoTask)
     res.redirect('/')
   }catch (err){
    if (err) return res.status(500).send({message: error.meassag});
    res.redirect('/')
   }
})
//UPDATE/EDIT METHOD
app
  .route('/edit/:id')
  .get((req,res) =>{
      const id = req.params.id
      TodoTask.find({}, (err,list) =>{
        res.render('edit.ejs',{
          Todo:list, idTask :id })
      })
    })

  .post((req,res) =>{
    const id = req.params.id
    TodoTask.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        content: req.body.content
      },
      err =>{
        if(err)return res.status(500).send(err)
        res.redirect('/')
      })
  })
  //DELETE METHOD
  app
    .route("/remove/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.findOneAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });


app.listen(PORT,() => console.log(`server is running on ${PORT}`))