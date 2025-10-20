import { createSSRApp } from 'vue'
import App from "./App.vue";
import type { TodoItem } from './api/axios-apilist';

 

export  function createApp(initialState: { todos?: TodoItem[] }) {
    const app = createSSRApp(App,{
        todos: initialState.todos || [] 
    })
    return  app
}