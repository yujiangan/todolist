import express from 'express'
import fs from 'fs'
import path from 'path'
import { render } from '../../src/entry-server.ts'
import cors from 'cors'
const app = express()
const port = process.env.PORT ||3000
app.use(cors({
  origin: ['http://localhost:3000','https://yujiangan.github.io','https://todolist-git-dev-yujiangans-projects.vercel.app','https://todolist-orpin-pi.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type']  
}));
const clientpath = path.resolve(__dirname, '../../dist/client');
app.use(express.static(clientpath)); 


app.use(express.json())
const todos = [
    { id: 1, text: "Learn Vue 3", completed: true },
    { id: 2, text: "Build a Todo App", completed: false },
    { id: 3, text: "Deploy to production", completed: false }
]

app.get('/',async (req,res) => {
    try {
        // 使用固定的初始数据，避免使用可能被修改的共享todos数组
        const initialTodos = [
            { id: 1, text: "Learn Vue 3", completed: true },
            { id: 2, text: "Build a Todo App", completed: false },
            { id: 3, text: "Deploy to production", completed: false }
        ];
        const { partial, initialState } = await render(initialTodos)
        const templatePath = path.resolve(__dirname, '../../dist/client/index.html');
        const template = fs.readFileSync(templatePath, 'utf-8')
        const html = template
            .replace('<div id="app"></div>',
            `<div id="app">${partial}</div>
            <script>window.__INITIAL_STATE__=${JSON.stringify(initialState)};</script>
            `)
        res.send(html);
    } catch (err) {
        console.error(err)
        res.status(500).send({'error':'服务器错误'})
    }
})
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

// 启动服务器
app.listen(port,() => {
    console.log(`server is running at http://localhost:${port}`)
})

export default app