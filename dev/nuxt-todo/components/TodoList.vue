<template>
  <ul class="todo-list">
    <todo-item v-for="(el, index) in list" :key="index" :item="el" />
  </ul>
</template>

<script>
import TodoItem from './ToDoItem'

export default {
  components: {
    TodoItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
