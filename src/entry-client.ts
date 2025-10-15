import { createApp } from './main'
import "./index.css"


const initialStateElement = document.getElementById('__INITIAL_STATE__');
const initialState = initialStateElement ? JSON.parse(initialStateElement.textContent!) : [];
const { app } = createApp(initialState)

app.mount('#app')
