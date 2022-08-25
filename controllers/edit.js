const TodoTask = require('../models/todotask')

module.exports = {
    getEdit: (req,res)=>{
        const id = req.params.id;
        TodoTask.find({}, (err,list) =>{
            res.render('edit.ejs',{
              Todo:list, idTask :id })
          })
    },
    deleteTask : (req,res, next)=>{
        const id = req.params.id;
        TodoTask.findOneAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
            next()
            
        });
    },
    updateTask : (req,res, next) =>{
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
        next()
      })
    }
}