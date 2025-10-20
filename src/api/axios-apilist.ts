import axios from 'axios';

// 定义待办事项接口
export interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
// 请求拦截器
apiClient.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
// 响应拦截器
apiClient.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        console.error('API 请求错误：',error)
    }
)

// 获取待办事项列表
export const fetchTodos = async ():Promise<TodoItem[]> => {
    try {
        return await apiClient.get('./list')
    } catch (error) {
        console.error('获取待办事项失败:', error);
        throw error;
    }
}
// 添加待办事项
export const addTodo = async (text:string):Promise<TodoItem> => {
    try {
        return await apiClient.post('./add',{text})
    } catch (error) {
        console.error('添加待办事项失败:', error);
        throw error;
    }
}
// 更新待办事项
export const updateTodo = async (todo:TodoItem):Promise<TodoItem> => {
    try {
        return await apiClient.put('./update', todo)
    } catch (error) {
        console.error('更新待办事项失败:', error);
        throw error;
    }
}
// 删除待办事项
export const deleteTodo = async (id:number):Promise<TodoItem[]> => {
    try {
        return await apiClient.delete('./delete', {data:{id}})
    } catch (error) {
        console.error('删除待办事项失败:', error);
        throw error;
    }
}
// 全选改变全部完成状态
export const toggleAllTodos = async (allCompleted:boolean):Promise<TodoItem[]> => {
    try {
        return await apiClient.put('./toggle-all',{allCompleted})
    } catch (error) {
        console.error('切换所有待办事项状态失败:', error);
        throw error;
    }
}

 
// 删除所有已完成的待办事项  
export const deleteCompletedTodos = async ():Promise<TodoItem[]> => {
    try {
        return await apiClient.delete('./delete-completed')
    } catch (error) {
        console.error('删除所有已完成待办事项失败:', error);
        throw error;
    }
}