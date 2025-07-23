<script setup>
</script>

<template>
   <div id="app">
      <section class="todoapp">
         <header class="header">
            <a href="#">
               <h1>todos</h1>
            </a>
            <input type="text" class="new-todo" placeholder="What needs to be done?">
         </header>
         <main class="main">
            <input class="toggle-all-container" id="toggle-all-input"> 
            <label for="toggle-all-input" class="toggle-all-label">
               <div>❯</div>
            </label>
            <ul class="todolist" >
               <li>
                  <div class="view">
                     <input type="checkbox" id="todo-check">
                     <label for="todo-check">你好</label>
                     <button>
                        <van-icon name="cross" size="18" />
                     </button>
                  </div>
                  <!-- <div class="input-container">
                     <input id="edit-todo-input" type="text" class="edit">
                  </div> -->
               </li>
            </ul>
            
         </main>
         <footer class="footer">
            <div class="items-count">3 item left </div>
            <div class="filters">
              <button class="filter-btn default">All</button>
              <button class="filter-btn">Active</button>
              <button class="filter-btn">Completed</button>
            </div>
            <button class="clear-btn"  >Clean Completed</button>
         </footer>
         <div class="first-dev"></div>
         <div class="second-dev"></div>
      </section>
      <footer class="info">
         <p>Double-click to edit a todo</p>
         <p>Created by the TodoMVC Team</p>
         <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
   </div>
</template>

<style scoped lang="scss">
* {
   margin: 0;
   padding:0;
}
#app{
   max-width: 460px;
   min-height: 130px;
   line-height: 1.4rem;
   margin:0 auto;
   // background-color: pink;
   font-weight: 300;
   
   .todoapp{
      width: 454px;
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
                  width: 370px;
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
                  width: 20px;
                  height: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
               }

               .view button:hover {
                  color: #e83e8c;
                  opacity: 1 !important;
               }
               
               .input-container {
                  width: 100%;
                  height: 100%;
                  border: none;
                  box-sizing: border-box;
                  .edit {
                     height: 100%;
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
         width: 100%;
         display: flex;
         padding: 10px 15px ;
         box-sizing: border-box;
         align-items: center;
         justify-content: space-between;
         font-size: 14px;
         border: 1px solid #aaa;
         box-shadow: 0 2px 4px #0003, 0 25px 50px #0000001a;
         .filters{
            display: flex;
            gap: 10px; 
            button {
               border: none;
               background: #fff;
               cursor: pointer;
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
    .info {
      margin: 165px auto 0;
      color: #4d4d4d;
      font-size: 11px;
      text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
      text-align: center;
   }
}
</style>


 