import "./index.css"
import { createApp, Todo } from './main'

// 修复类型错误，确保初始状态总是有效的
const initialState = (window.__INITIAL_STATE__ as { todos?: Todo[] }) || { todos: [] };
const todos = initialState.todos || [];

createApp(todos).mount("#app", true);