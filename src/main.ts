import { createApp } from './shared';
import './index.css';
import 'vant/es/style/base.css';
import { TodoItem } from './api/axios-apilist';

declare global {
  interface Window {
    __INITIAL_STATE__: { todos: TodoItem[] };
  }
}

const initialState = window.__INITIAL_STATE__ || { todos: [] };

createApp(initialState).mount('#app', true);
