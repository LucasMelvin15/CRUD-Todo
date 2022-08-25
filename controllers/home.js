const TodoTask = require('../models/todotask')


module.exports = {
    getIndex: async (req,res) =>{
        try{
          const list = await 
          TodoTask.find({}, (err, list) => { //finds all tasks and renders all of them according to your database
            res.render("index.ejs", { Todo: list });
        });
        }catch(err){
            if (err) return res.status(500).send(err);
        }

    },
    createTask: async (req, res, next)=>{

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
            if (err) return res.status(500).send(err);
            res.redirect('/')
            next()
           }
    }
}