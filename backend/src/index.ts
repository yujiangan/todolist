import express from 'express'
import cors from 'cors'
const app = express()
// const port = process.env.PORT ||3000
app.use(cors({
  origin: 'https://yujiangan.github.io',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type']  
}));
app.use(express.json())
const todos = [
    { id: 1, text: "Learn Vue 3", completed: true },
    { id: 2, text: "Build a Todo App", completed: false },
    { id: 3, text: "Deploy to production", completed: false }
]
// 查
app.get('/list',(req,res) => {
    res.json(todos)
})
// 增
app.post('/add',(req,res) => {
    const {text} = req.body
    if(!text){
        return res.status(400).json({error:'输入为空'})
    }
    const newTodo = {id:Date.now(),text,completed:false}
    todos.push(newTodo)
    res.status(201).json(newTodo)
})
// 删
app.delete('/delete',(req,res) => {
    const {id} = req.body;
    const index = todos.findIndex(t => t.id === id)
    if(index === -1){
        return res.status(404).json({error:'未找到该任务'})
    }
    todos.splice(index,1)
    res.json(todos)
})
// 改
app.put('/update',(req,res) => {    
    const {id,text,completed} = req.body
    const todo = todos.find(t=>t.id === id)
    if(!todo){
        return res.status(404).json({error:'未找到该任务'})
    }
    if(text !== undefined) todo.text = text
    if(completed !== undefined) todo.completed = completed
    res.json(todo)
})
// 全选改变全部完成状态
app.put('/toggle-all',(req,res) => {
    const {allCompleted} = req.body
    todos.forEach(todo => todo.completed = !allCompleted)
    res.json(todos)
})
// 删除已完成事项
app.delete('/delete-completed',(req,res) => {
   const activeTodos = todos.filter(todo => !todo.completed);
   todos.splice(0, todos.length, ...activeTodos);
   res.json(todos);
})

 

export default app