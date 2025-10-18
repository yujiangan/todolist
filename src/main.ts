import { createSSRApp } from 'vue'
import App from "./App.vue";

export type Todo = {
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