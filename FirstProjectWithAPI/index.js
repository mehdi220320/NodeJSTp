const express=require('express')
const app=express()
app.use(express.json());
let todos = [{ id: 1, title: "hello" },{ id: 2, title: "test app" }]
app.post('/api/todos/create',(req,res)=>{
    todos.push(req.body)
    res.send(todos)
})

app.put('/api/todos/update/:id',(req,res)=>{
    const id=req.params.id;
    if(todos.length===0){
        res.send("empty")
    }
    else{
        obj=req.body
        todos=todos.map((todo)=>{todo.id ===Number(id)?{...todo,...req.body}:todo})
        res.send(todos)
    }
})


app.get('/',(req,res)=>{
    res.send({message:todos})
    // res.json({message:"hello to my website"})
    res.end()
})
app.get('/file',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})
app.listen(5000,()=>{
    console.log('serverl listening on port 5000')
})
