<template>
  <section class="main">
    <input
      id="toggle-all"
      type="checkbox"
      class="toggle-all"
      :checked="isAllDone"
      @click="toggleTodos(!isAllDone)"
    />
    <label for="toggle-all">Mark all as complete</label>
    <nuxt />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('todo', ['isAllDone'])
  },
  methods: {
    ...mapActions('todo', ['toggleTodos'])
  }
}
</script>
