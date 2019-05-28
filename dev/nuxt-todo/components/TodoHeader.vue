<template>
  <header class="header">
    <h1>todos</h1>
    <input
      v-model="input"
      autofocus="autofocus"
      autocomplete="off"
      placeholder="What needs to be done?"
      class="new-todo"
      @keydown="handleKeydown"
    />
  </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    ...mapActions('todo', ['addTodo']),
    handleKeydown(e) {
      if (e.keyCode === 13) {
        this.addTodo(this.input)
        this.input = ''
      }
    }
  }
}
</script>
