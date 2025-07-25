<script setup>
   import {ref,computed,nextTick} from 'vue'
   // 输入框值
   const newTodo = ref('')
   // 任务列表
   const todos = ref([
      { id: 1, text: 'Learn Vue 3', completed: true },
      { id: 2, text: 'Build a Todo App', completed: false },
      { id: 3, text: 'Deploy to production', completed: false }
   ])
   // 筛选项
   const filter = ref('all')
   // 未完成数量
   const remaining = computed(()=> {
      return todos.value.filter(todo => !todo.completed).length
   })
   // 已完成数量
   const completedCount = computed(() => {
      return todos.value.filter(todo => todo.completed).length
   })
   // 根据筛选项过滤任务
   const filteredTodos = computed(() => {
      switch (filter.value) {
         case 'active':
            return todos.value.filter(todo => !todo.completed)
         case 'completed':
            return todos.value.filter(todo => todo.completed)
         default:
            return todos.value
      }
   })
   // 添加新任务
   const addTodo = () => {
      if(newTodo.value.trim()){
         todos.value.push({
            id:+new Date(),
            text:newTodo.value.trim(),
            completed:false
         })
         newTodo.value = ''
      }
   }
   // 删除任务
   const removeTodo = (id) => {
      todos.value = todos.value.filter(todo => todo.id !== id)
   }
   // 清除已完成任务
   const clearCompleted = () => {
      todos.value = todos.value.filter(todo => !todo.completed)
   }
   // 切换单个状态
   const toggleTodo = (id) => {
      todos.value = todos.value.map(todo =>
         todo.id === id ? {...todo, completed : !todo.completed}  : todo
      )
   }

   // 切换所有任务状态
   const toggleAll = () => {
      const allCompleted = todos.value.every(todo => todo.completed );
      todos.value = todos.value.map(todo => ({
         ...todo,
         completed: !allCompleted
      }))
   }
    
    
   // 编辑状态
   const editingId = ref(null)
   const editingText = ref('')
   // 开始编辑任务
   const startEditing = (todo) => {
      editingId.value = todo.id
      editingText.value = todo.text
      // 等待DOM更新后自动聚焦
      nextTick(() => {
      const input = document.getElementById(`edit-input-${todo.id}`)
      if (input) {
         input.focus()
         // 选中所有文本以便直接替换
         input.setSelectionRange(0, input.value.length)
      }
    })
   }

   // 完成编辑
   const finishEditing = (todo) => {
      // 避免blur重复执行函数
      if (editingId.value === null) return;
      const trimmedText  = editingText.value.trim()
      if (!trimmedText || trimmedText === todo.text){
         todos.value = todos.value.filter(t => t.id !== todo.id)
      } 
      else {
         todos.value = todos.value.map(t => 
            t.id === todo.id ? {...t,text:trimmedText} :t
         )
      }
      editingId.value = null
      editingText.value = ''
   }

   // 取消编辑
   const cancelEditing = () => {
      editingId.value = null
      editingText.value = ''
   }

   // 保存编辑（按回车键）退出编辑（esc）
   const saveOnEnter = (e, todo) => {
      if (e.key === 'Enter') {
         finishEditing(todo)
      } else if (e.key === 'Escape') {
         cancelEditing(todo)
      }
   }
</script>

<template>
   <div id="app">
      <section class="todoapp">
         <header class="header">
            <a href="#">
               <h1>todos</h1>
            </a>
            <input 
            type="text" 
            class="new-todo" 
            placeholder="What needs to be done?"
            v-model="newTodo"
            @keydown.enter="addTodo"
            >
         </header>
         <main class="main">
            <input class="toggle-all-container" id="toggle-all-input" @click="toggleAll" v-show="todos.length > 0" > 
            <label for="toggle-all-input" class="toggle-all-label" v-show="todos.length > 0" >
               <div>❯</div>
            </label>
            <ul class="todolist" >
               <li 
                  v-for="todo in filteredTodos"
                  :key="todo.id">
                  <div class="view"  v-show="editingId !== todo.id">
                     <input 
                     type="checkbox" 
                     :checked="todo.completed"
                     
                     @click="toggleTodo(todo.id)"
                     >
                     <label   @dblclick="startEditing(todo)">{{ todo.text }}</label>
                     <button @click="removeTodo(todo.id)">
                        <van-icon name="cross" size="18" />
                     </button>
                  </div>
                  <div 
                  class="input-container" 
                  v-show="editingId === todo.id"
                  >
                     <input :id="`edit-input-${todo.id}`" type="text" class="edit" v-model="editingText"
                      @keydown="saveOnEnter($event, todo)" @blur="finishEditing(todo)">
                  </div>
               </li>
            </ul>
            
         </main>
         <footer class="footer" v-show="todos.length > 0" >
            <div class="items-count">{{ remaining }} item{{ remaining !== 1 ? 's' : '' }} left</div>
            <div class="filters">
              <button 
               class="filter-btn " 
               @click="filter ='all'"
               :class="{active: filter === 'all',default:filter === 'all'}"
               >All</button>
              <button 
               class="filter-btn" 
               @click="filter = 'active'"
               :class="{active: filter === 'active'}" 
               >Active</button>
              <button 
               class="filter-btn" 
            @click="filter = 'completed'"
               :class="{active: filter === 'completed'}" 
               > 
               Completed</button>
            </div>
            <button 
               class="clear-btn"
               v-show="completedCount > 0"
               @click="clearCompleted"
              >Clear Completed</button>
         </footer>
         <div class="first-dev" v-show="todos.length > 0" ></div>
         <div class="second-dev" v-show="todos.length > 0" ></div>
      </section>
       
   </div>
</template>

<style scoped lang="scss">
* {
   margin: 0;
   padding:0;
}
#app{
   max-width: 550px;
   min-height: 130px;
   line-height: 1.4rem;
   margin:0 auto;
   font-weight: 300;
   display: flex;
   flex-direction: column;
   min-height: 85vh;
   
   .todoapp{
      width: 100%;
      height: 65px;
      margin: 130px 0 40px;
      position: relative;
      left: 0;
     
      .header{
         width: 100%;
         height: 100%;
         a{
            position: absolute;
            top:-80px;
            text-decoration: none;
            width: 100%;
            h1 {
               display: block;
               color:#b83f45;
               text-align: center;
               font-size: 60px;
               font-weight: 400;
            }
         }
         .new-todo:focus{
            outline: 2px solid #b83f45;
         }
         .new-todo::placeholder{
            color: #aaa;
            font-style: italic;
            font-weight: 300;
         }
         .new-todo{
            width: 100%;
            height: 66px;
            line-height: 22px;
            vertical-align: middle;
            font-size: 22px;
            padding: 16px 16px 16px 60px;
            height: 65px;
            border: none;
            font-weight: 200;
            background: rgba(0, 0, 0, 0.003);
            box-sizing: border-box;
            box-shadow: 2px  2px 10px rgba(0, 0, 0, 0.2);
         }
      }
      .main {
         width: 100%;
         position: relative;
         border-left: 1px solid #aaa;
         box-sizing: border-box;
         border-right: 1px solid #aaa;
         .toggle-all-container{
            width: 45px;
            height: 65px;
            position: absolute;
            bottom: 100%;
            border: none;
            caret-color: transparent;
            box-sizing: border-box;
         }
         .toggle-all-label{
            width: 45px;
            height: 65px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            // display: inline-block;
            transform: rotate(90deg);
            color: #949494;
            position: absolute;
            top:-65px;
             
         }
         .toggle-all-container:focus{
            border: 2px solid #b83f45;
            outline: none;
         }
         .todolist{
            list-style:none;
            li{
               display: flex;
               align-items: center;
               height: 65px;
               border-bottom: 1px solid #aaa;
               position: relative;
               .view{
                  display: flex;
                  align-items:center;
                  width: 100%;
               }
               .view input[type="checkbox"]{
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  border: 1px solid #dee2e6;
                  appearance: none;
                  position: relative;
                  transition: all 0.2s;
                  margin:0 20px 0 8px;
               }
               .view input[type="checkbox"]:checked {
                  border-color: #20c997;
               }
               .view input[type="checkbox"]:checked::after {
                  content: "";
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  width: 14px;
                  height: 7px;
                  border: 2px solid #20c997;
                  border-top: none;
                  border-right: none;
                  transform: translate(-50%, -70%) rotate(-45deg);
               }
               .view label {
                  font-size: 24px;
                  color: #212529;
                  font-weight: 400;
                  width: 440px;
               }
               .view input[type="checkbox"]:checked + label {
                  color: #adb5bd;
                  text-decoration: line-through;
               }
               .view button {
                  background: none;
                  border: none;
                  color: #ced4da;
                  font-size: 24px;
                  opacity: 0;
                  width: 40px;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
               }

               .view button:hover {
                  color: #e83e8c;
                  opacity: 1 !important;
               }
               .view button:active{
                  border: 2px solid #b83f45;
               }
               
               .input-container {
                  width:  100%;
                  height: 100%;
                  border: none;
                  background-color: skyblue;
                  box-sizing: border-box;
                  .edit {
                     padding-left:20px;
                     height: 100%;
                     background-color: pink;
                     width: calc(100% - 45px); /* 减去左边距 */
                     margin-left: 45px;
                     font-size: 24px;
                     outline: 1px solid  #b83f45;
                     box-sizing: border-box;
                  }
               }
               
               
            }
            
         }
         .todolist li:hover .view button {
            opacity: 0.7;
         }
        
      }
      .footer{
         position: relative;
         width: 100%;
         height: 45px;
         display: flex;
         padding: 10px 15px ;
         box-sizing: border-box;
         align-items: center;
         font-size: 14px;
         border: 1px solid #aaa;
         box-shadow: 0 2px 4px #0003, 0 25px 50px #0000001a;
         .items-count{
            position: absolute;
            left: 20px;
         }
         .clear-btn{
            position: absolute;
            right: 10px;
         }
         .filters{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px; 
            button {
               border: 1px solid transparent;
               background: #fff;
               cursor: pointer;
               padding:  1px 5px;
               border-radius: 2px;
            }
            button:hover{
               border: 1px solid  #b83f45
            }
         }
         .clear-btn{
            border: none;
            background: #fff;
            cursor: pointer;
         }
         .clear-btn:hover{
            border: 1px solid  #b83f45;
         }
         .default{
            border: 1px solid  #b83f45 !important;
         }
         .active{
            box-shadow: 2px 0px 2px 0 #b83f45,
                        -2px 0px 2px 0 #b83f45,
                        0 2px 2px 0 #b83f45,
                        0 -2px 2px 0 #b83f45;
         }
      }
      .first-dev{
         width: 95%;
         height: 2px;
         margin: 0 auto;
         border: 1px solid #aaa;
         border-top: none;
      }
      .second-dev{
         width: 90%;
         height: 2px;
         margin: 0 auto;
         border: 1px solid #aaa;
         border-top: none;
      }
     
   }
    
}
</style>


 