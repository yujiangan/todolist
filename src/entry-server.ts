
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export default async function render(url: string) {
    const { app } = createApp()
    const html = await renderToString(app)
    return html
}