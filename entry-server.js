import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderClass, renderToString } from "vue/server-renderer";
import { defineComponent, ref, computed, mergeProps, useSSRContext, createSSRApp } from "vue";
import { Icon } from "vant/es/index.mjs";
import "vant/es/icon/style/index.mjs";
import axios from "axios";
const currentOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
const originToBackend = {
  // 本地前端 → 本地后端
  "http://localhost:3000": "http://localhost:3000",
  // GitHub Pages前端 → Vercel生产后端
  "https://yujiangan.github.io": "https://todolist-git-dev-yujiangans-projects.vercel.app/",
  // Vercel预览前端 → 同域后端（用相对路径，自动匹配当前域名）
  "https://todolist-git-dev-yujiangans-projects.vercel.app": "/",
  // Vercel生产前端 → 同域后端（用相对路径）
  "https://todolist-orpin-pi.vercel.app": "/"
};
const baseURL = originToBackend[currentOrigin] || "https://todolist-git-dev-yujiangans-projects.vercel.app";
const apiClient = axios.create({
  baseURL,
  timeout: 1e4,
  headers: {
    "Content-Type": "application/json"
  }
});
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("API 请求错误：", error);
  }
);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  __ssrInlineRender: true,
  props: {
    todos: {}
  },
  setup(__props) {
    const newTodo = ref("");
    const props = __props;
    const todos = ref(props.todos);
    const filter = ref("all");
    const remaining = computed(() => {
      return todos.value.filter((todo) => !todo.completed).length;
    });
    const completedCount = computed(() => {
      return todos.value.filter((todo) => todo.completed).length;
    });
    const filteredTodos = computed(() => {
      switch (filter.value) {
        case "active":
          return todos.value.filter((todo) => !todo.completed);
        case "completed":
          return todos.value.filter((todo) => todo.completed);
        default:
          return todos.value;
      }
    });
    const editingId = ref(null);
    const editingText = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_van_icon = Icon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto my-0 flex min-h-[130px] max-w-[550px] flex-col leading-[1.4rem] font-light" }, _attrs))} data-v-8e12c3f0><section class="relative left-0 mx-0 mt-[130px] mb-[40px] h-[65px] w-full" data-v-8e12c3f0><header class="h-full w-full" data-v-8e12c3f0><a href="#" class="absolute top-[-80px] w-full no-underline" data-v-8e12c3f0><h1 class="block text-center text-[60px] font-normal text-[#b83f45]" data-v-8e12c3f0>todos</h1></a><input type="text" class="w-full border-none p-4 pl-[60px] text-[22px] font-extralight focus:outline-none focus:shadow-[0_0_0_2px_#b83f45] placeholder:text-[#aaa] placeholder:italic placeholder:font-light" placeholder="What needs to be done?"${ssrRenderAttr("value", newTodo.value)} data-v-8e12c3f0></header><main class="relative box-border w-full border-x-[1px] border-[#aaa]" data-v-8e12c3f0><input class="absolute bottom-full box-border h-[65px] w-[45px] border-0 caret-[transparent] focus:border-2 focus:border-[#b83f45] focus:outline-0" id="toggle-all-input" style="${ssrRenderStyle(todos.value.length > 0 ? null : { display: "none" })}" data-v-8e12c3f0><label for="toggle-all-input" class="absolute top-[-65px] flex h-[65px] w-[45px] rotate-90 items-center justify-center text-[22px] text-[#949494]" style="${ssrRenderStyle(todos.value.length > 0 ? null : { display: "none" })}" data-v-8e12c3f0><div data-v-8e12c3f0>❯</div></label><ul class="list-none" data-v-8e12c3f0><!--[-->`);
      ssrRenderList(filteredTodos.value, (todo) => {
        _push(`<li class="relative flex h-[65px] items-center border-b-[1px] border-[#aaa]" data-v-8e12c3f0><div class="group flex w-full items-center" style="${ssrRenderStyle(editingId.value !== todo.id ? null : { display: "none" })}" data-v-8e12c3f0><input type="checkbox"${ssrIncludeBooleanAttr(todo.completed) ? " checked" : ""} class="check-mark peer relative my-0 mr-[20px] ml-[8px] h-[28px] w-[28px] appearance-none rounded-full border-[1px] border-[#dee2e6] transition-all duration-200 checked:border-[#20c997]" data-v-8e12c3f0><label class="w-[440px] text-[24px] font-normal text-[#212529] peer-checked:text-[#adb5bd] peer-checked:line-through" data-v-8e12c3f0>${ssrInterpolate(todo.text)}</label><button class="flex h-[40px] w-[40px] items-center justify-center border-0 bg-none text-[24px] text-[#ced4da] opacity-0 group-hover:opacity-70 hover:text-[#e83e8c] hover:opacity-100 active:border-2 active:border-[#b83f45]" data-v-8e12c3f0>`);
        _push(ssrRenderComponent(_component_van_icon, {
          name: "cross",
          size: "18"
        }, null, _parent));
        _push(`</button></div><div class="box-border h-full w-full border-none" style="${ssrRenderStyle(editingId.value === todo.id ? null : { display: "none" })}" data-v-8e12c3f0><input${ssrRenderAttr("id", `edit-input-${todo.id}`)} type="text" class="edit ml-[45px] box-border h-full w-[calc(100%-45px)] pl-[20px] text-[24px]"${ssrRenderAttr("value", editingText.value)} data-v-8e12c3f0></div></li>`);
      });
      _push(`<!--]--></ul></main><footer class="relative box-border flex h-[45px] w-full items-center border border-[#aaa] px-[15px] py-[10px] text-[14px] shadow-[0_2px_4px_rgba(0,0,0,0.03),0_25px_50px_rgba(0,0,0,0.1)]" style="${ssrRenderStyle(todos.value.length > 0 ? null : { display: "none" })}" data-v-8e12c3f0><div class="absolute left-[20px]" data-v-8e12c3f0>${ssrInterpolate(remaining.value)} item${ssrInterpolate(remaining.value !== 1 ? "s" : "")} left </div><div class="absolute left-1/2 flex -translate-x-1/2 transform gap-[10px]" data-v-8e12c3f0><button class="${ssrRenderClass([{ "shadow-[0_0_0_2px_#b83f45]": filter.value === "all" }, "hover: cursor-pointer rounded-[2px] border border-transparent bg-white px-[5px] py-[1px] hover:border hover:border-[#b83f45]"])}" data-v-8e12c3f0> All </button><button class="${ssrRenderClass([{ "shadow-[0_0_0_2px_#b83f45]": filter.value === "active" }, "hover: cursor-pointer rounded-[2px] border border-transparent bg-white px-[5px] py-[1px] hover:border hover:border-[#b83f45]"])}" data-v-8e12c3f0> Active </button><button class="${ssrRenderClass([{ "shadow-[0_0_0_2px_#b83f45]": filter.value === "completed" }, "hover: cursor-pointer rounded-[2px] border border-transparent bg-white px-[5px] py-[1px] hover:border hover:border-[#b83f45]"])}" data-v-8e12c3f0> Completed </button></div><button class="hover: absolute right-[10px] cursor-pointer border-0 bg-white hover:border hover:border-[#b83f45]" style="${ssrRenderStyle(completedCount.value > 0 ? null : { display: "none" })}" data-v-8e12c3f0> Clear Completed </button></footer><div class="mx-auto my-0 h-[2px] w-[95%] border border-t-0 border-[#aaa]" style="${ssrRenderStyle(todos.value.length > 0 ? null : { display: "none" })}" data-v-8e12c3f0></div><div class="mx-auto my-0 h-[2px] w-[90%] border border-t-0 border-[#aaa]" style="${ssrRenderStyle(todos.value.length > 0 ? null : { display: "none" })}" data-v-8e12c3f0></div></section></div>`);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8e12c3f0"]]);
function createApp(initialState) {
  const app = createSSRApp(App, {
    todos: initialState
  });
  return app;
}
async function render(initialState) {
  const app = createApp(initialState);
  const partial = await renderToString(app);
  return { partial, initialState };
}
export {
  render
};
