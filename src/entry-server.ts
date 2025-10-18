import { renderToString } from 'vue/server-renderer';
import { createApp, Todo } from './main';  
 
// 导出一个渲染函数，接收初始化数据，返回 HTML 片段
export async function render(initialState: Todo[] ) {
  const app = createApp(initialState);
  // 渲染 App 为 HTML 字符串
  const partial = await renderToString(app);
  return { partial, initialState };
}