<template>
  <div class="resetEditter">
    <span class="todo-count">
      <strong>{{ leftItems }}</strong>
      item left
    </span>
    <ul class="filters">
      <li><nuxt-link to="/" exact>All</nuxt-link></li>
      <li><nuxt-link to="/active" exact>Active</nuxt-link></li>
      <li><nuxt-link to="/completed" exact>Completed</nuxt-link></li>
    </ul>
    <button v-show="showClear" class="clear-completed" @click="clearTodos">
      Clear completed
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('todo', ['activeTodos', 'completedTodos']),
    leftItems() {
      return this.activeTodos.length
    },
    showClear() {
      return this.completedTodos.length > 0
    }
  },
  methods: {
    ...mapActions('todo', ['clearTodos'])
  }
}
</script>
