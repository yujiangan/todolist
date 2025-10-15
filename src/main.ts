import { createSSRApp } from "vue";
import App from "./App.vue";

export  function createApp(initialState = []) {
    const app = createSSRApp(App,{
        todos:initialState
    })
    return {app}
}
