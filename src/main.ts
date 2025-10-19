import { createSSRApp } from 'vue'
import App from "./App.vue";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
};

export  function createApp(initialState: Todo[]) {
    const app = createSSRApp(App,{
        todos:initialState
    })
    return  app
}