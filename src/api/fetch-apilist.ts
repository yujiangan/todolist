export interface TodoTtem {
    id:number
    text:string
    completed:boolean
}

const BASE_URL = 'http://localhost:3000'

// 获取待办事项
export const fetchTodos = async ()=> {
    try {
        const response = await fetch(`${BASE_URL}/list`)
        if(!response.ok){
            throw new Error(`获取待办事项失败: ${response.status}`)
        }
        return await response.json()
    } catch (error){
        console.error('获取待办事项出错:', error);
        throw error;
    }
}
// 获取新待办事项
export const addTodo = async (text:string) => {
    try{
        const response = await fetch(`${BASE_URL}/add`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({text})
        })
        if(!response.ok){
            throw new Error(`添加待办事项:${response.status}`)
        }
        return await response.json()
    }catch(error){
        console.error('添加待办事项出错:', error)
        throw error
    }
}
// 更新待办事项
export const updateTodo = async (id:number,updates:Partial<TodoTtem>) => {
    try{
        const response = await fetch(`${BASE_URL}/update`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id,...updates})
        })
        if(!response.ok){
            throw new Error(`更新失败:${response.status}`)
        }
        return await response.json()
    } catch(error) {
        console.error('更新待办事项出错:', error)
        throw error
    }
}
// 删除待办事项
export const deleteTodo = async (id:number) => {
    try{
        const response = await fetch(`${BASE_URL}/delete`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id})
        })
        if(!response.ok){
            throw new Error(`删除失败:${response.status}`)
        }
    }
    catch(error){
        console.error('删除待办事项出错:', error)
        throw error
    }
}