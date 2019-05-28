<template>
  <todo-list :list="todos"></todo-list>
</template>

<script>
import TodoList from '~/components/TodoList'
import { mapGetters } from 'vuex'

export default {
  components: {
    TodoList
  },
  computed: {
    ...mapGetters('todo', ['todos'])
  }
}
</script>
