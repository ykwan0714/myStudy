<template>
  <div id="app" v-on:click="releaseEditMode">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo" ></TodoInput>
    <TodoList v-on:removeTodo="removeTodo" v-on:toggleTodo="toggleTodo" v-on:editTodo="editTodo" v-on:compTodo="compTodo" v-bind:propsTodos="todoItems" v-bind:propsEditMode="editMode"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  data() {
    return {
      todoItems: [],
      editMode: -1
    }
  },
  methods: {
    addTodo(todoItem) {
      const jsonTodoItem = { value: todoItem, isComplete: false, id: new Date().getTime() };
      localStorage.setItem(jsonTodoItem.id, JSON.stringify(jsonTodoItem));
      this.todoItems.push(jsonTodoItem);
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index,1);
    },
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
    toggleTodo(index) {
      const todoItem = this.todoItems[index];
      todoItem.isComplete = !todoItem.isComplete;
      localStorage.setItem(todoItem.id, JSON.stringify(todoItem));
    },
    editTodo(index) {
     this.editMode = index;
    },
    compTodo(index, value) {
      const todoItem = this.todoItems[index];
      todoItem.value = value;
      localStorage.setItem(todoItem.id, JSON.stringify(todoItem));
      this.releaseEditMode();
    },
    releaseEditMode(event){
      if (this.editMode > -1 && event.target.className != 'edit-input') {
        this.editMode = -1;
      }
    }
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  },
  created() {
    function isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }
    if (localStorage.length > 0) {

      for (var i = 0; i < localStorage.length; i++) {
        const data = localStorage.getItem(localStorage.key(i));
        if (isJsonString(data)) {
          this.todoItems.push(JSON.parse(data));
        }

      }
    }
  }
}
</script>

<style>
  body {
    text-align: center;
    background-color: #F6F6F8;
  }
  input {
    border-style: groove;
    width: 200px;
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
  }
</style>
