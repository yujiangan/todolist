<script setup>
import { ref, computed, nextTick } from "vue";
// 输入框值
const newTodo = ref("");
// 任务列表
const todos = ref([
  { id: 1, text: "Learn Vue 3", completed: true },
  { id: 2, text: "Build a Todo App", completed: false },
  { id: 3, text: "Deploy to production", completed: false },
]);
// 提交PR
// 筛选项
const filter = ref("all");
// 未完成数量
const remaining = computed(() => {
  return todos.value.filter((todo) => !todo.completed).length;
});
// 已完成数量
const completedCount = computed(() => {
  return todos.value.filter((todo) => todo.completed).length;
});
// 根据筛选项过滤任务
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
// 添加新任务
const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: +new Date(),
      text: newTodo.value.trim(),
      completed: false,
    });
    newTodo.value = "";
  }
};
// 删除任务
const removeTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};
// 清除已完成任务
const clearCompleted = () => {
  todos.value = todos.value.filter((todo) => !todo.completed);
};
// 切换单个状态
const toggleTodo = (id) => {
  todos.value = todos.value.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
};

// 切换所有任务状态
const toggleAll = () => {
  const allCompleted = todos.value.every((todo) => todo.completed);
  todos.value = todos.value.map((todo) => ({
    ...todo,
    completed: !allCompleted,
  }));
};

// 编辑状态
const editingId = ref(null);
const editingText = ref("");
// 开始编辑任务
const startEditing = (todo) => {
  editingId.value = todo.id;
  editingText.value = todo.text;
  // 等待DOM更新后自动聚焦
  nextTick(() => {
    const input = document.getElementById(`edit-input-${todo.id}`);
    if (input) {
      input.focus();
      // 选中所有文本以便直接替换
      input.setSelectionRange(0, input.value.length);
    }
  });
};

// 完成编辑
const finishEditing = (todo) => {
  // 避免blur重复执行函数
  const trimmedText = editingText.value.trim();
  if (!trimmedText || trimmedText === todo.text) {
    todos.value = todos.value.filter((t) => t.id !== todo.id);
  } else {
    todos.value = todos.value.map((t) => (t.id === todo.id ? { ...t, text: trimmedText } : t));
  }
  editingId.value = null;
  editingText.value = "";
};
// blur专用函数
const blurEditing = (todo) => {
  // 避免blur重复执行函数
  const trimmedText = editingText.value.trim();
  if (!trimmedText) {
    todos.value = todos.value.filter((t) => t.id !== todo.id);
  } else {
    todos.value = todos.value.map((t) => (t.id === todo.id ? { ...t, text: trimmedText } : t));
  }
  editingId.value = null;
  editingText.value = "";
};

// 取消编辑
const cancelEditing = () => {
  editingId.value = null;
  editingText.value = "";
};

// 保存编辑（按回车键）退出编辑（esc）
const saveOnEnter = (e, todo) => {
  if (e.key === "Enter") {
    finishEditing(todo);
  } else if (e.key === "Escape") {
    cancelEditing(todo);
  }
};
</script>

<template>
  <div class="mx-auto my-0 flex min-h-[130px] max-w-[550px] flex-col leading-[1.4rem] font-light">
    <section class="relative left-0 mx-0 mt-[130px] mb-[40px] h-[65px] w-full">
      <header class="h-full w-full">
        <a href="#" class="absolute top-[-80px] w-full no-underline">
          <h1 class="block text-center text-[60px] font-normal text-[#b83f45]">todos</h1>
        </a>
        <input
          type="text"
          class="new-todo  w-full  "
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keydown.enter="addTodo"
        />
      </header>
      <main class="relative box-border w-full border-x-[1px]  border-[#aaa]">
        <input
          class="absolute bottom-full box-border h-[65px] w-[45px] border-0 caret-[transparent] focus:border-2 focus: focus:border-[#b83f45] focus:outline-0"
          id="toggle-all-input"
          @click="toggleAll"
          v-show="todos.length > 0"
        />
        <label
          for="toggle-all-input"
          class="absolute top-[-65px] flex h-[65px] w-[45px] rotate-90 items-center justify-center text-[22px] text-[#949494]"
          v-show="todos.length > 0"
        >
          <div>❯</div>
        </label>
        <ul class="list-none">
          <li
            v-for="todo in filteredTodos"
            class="relative flex h-[65px] items-center border-b-[1px]  border-[#aaa]"
            :key="todo.id"
          >
            <div class="group flex w-full items-center" v-show="editingId !== todo.id">
              <input
                type="checkbox"
                :checked="todo.completed"
                class="check-mark peer relative my-0 mr-[20px] ml-[8px] h-[28px] w-[28px] appearance-none rounded-full border-[1px]  border-[#dee2e6] transition-all duration-200 checked:border-[#20c997]"
                @change="toggleTodo(todo.id)"
              />
              <label
                @dblclick="startEditing(todo)"
                class="w-[440px] text-[24px] font-normal text-[#212529] peer-checked:text-[#adb5bd] peer-checked:line-through"
                >{{ todo.text }}</label
              >
              <button
                @click="removeTodo(todo.id)"
                class="flex h-[40px] w-[40px] items-center justify-center border-0 bg-none text-[24px] text-[#ced4da] opacity-0 group-hover:opacity-70 hover:text-[#e83e8c] hover:opacity-100 active:border-2 active:border-[#b83f45]"
              >
                <van-icon name="cross" size="18" />
              </button>
            </div>
            <div class="box-border h-full w-full border-none" v-show="editingId === todo.id">
              <input
                :id="`edit-input-${todo.id}`"
                type="text"
                class="edit ml-[45px] box-border h-full w-[calc(100%-45px)] pl-[20px] text-[24px]"
                v-model="editingText"
                @keydown="saveOnEnter($event, todo)"
                @blur="blurEditing(todo)"
              />
            </div>
          </li>
        </ul>
      </main>
      <footer
        class="relative box-border flex h-[45px] w-full items-center border  border-[#aaa] px-[15px] py-[10px] text-[14px] shadow-[0_2px_4px_rgba(0,0,0,0.03),0_25px_50px_rgba(0,0,0,0.1)]"
        v-show="todos.length > 0"
      >
        <div class="absolute left-[20px]">
          {{ remaining }} item{{ remaining !== 1 ? "s" : "" }} left
        </div>
        <div class="absolute left-1/2 flex -translate-x-1/2 transform gap-[10px]">
          <button
            class="cursor-pointer rounded-[2px] border  border-transparent bg-white px-[5px] py-[1px] hover:border hover: hover:border-[#b83f45]"
            @click="filter = 'all'"
            :class="{ 'shadow-[0_0_0_2px_#b83f45]': filter === 'all' }"
          >
            All
          </button>
          <button
            class="cursor-pointer rounded-[2px] border  border-transparent bg-white px-[5px] py-[1px] hover:border hover: hover:border-[#b83f45]"
            @click="filter = 'active'"
            :class="{ 'shadow-[0_0_0_2px_#b83f45]': filter === 'active' }"
          >
            Active
          </button>
          <button
            class="cursor-pointer rounded-[2px] border  border-transparent bg-white px-[5px] py-[1px] hover:border hover: hover:border-[#b83f45]"
            @click="filter = 'completed'"
            :class="{ 'shadow-[0_0_0_2px_#b83f45]': filter === 'completed' }"
          >
            Completed
          </button>
        </div>
        <button
          class="absolute right-[10px] cursor-pointer border-0 bg-white hover:border hover: hover:border-[#b83f45]"
          v-show="completedCount > 0"
          @click="clearCompleted"
        >
          Clear Completed
        </button>
      </footer>
      <div
        class="mx-auto my-0 h-[2px] w-[95%] border border-t-0  border-[#aaa]"
        v-show="todos.length > 0"
      ></div>
      <div
        class="mx-auto my-0 h-[2px] w-[90%] border border-t-0  border-[#aaa]"
        v-show="todos.length > 0"
      ></div>
    </section>
  </div>
</template>

<style scoped>

.edit:focus {
  padding-left: 20px;
  height: 100%;
  width: calc(100% - 45px); /* 减去左边距 */
  margin-left: 45px;
  font-size: 24px;
  outline: 2px solid #b83f45;
  box-sizing: border-box;
}
.new-todo:focus {
  outline: 2px solid #b83f45;
}
.new-todo::placeholder {
  color: #aaa;
  font-style: italic;
  font-weight: 300;
}
.new-todo {
  font-size: 22px;
  padding: 16px 16px 16px 60px;
  height: 65px;
  border: none;
  font-weight: 200;
  background: rgba(0, 0, 0, 0.003);
  box-sizing: border-box;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
