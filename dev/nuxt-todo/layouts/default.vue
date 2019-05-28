<template>
  <section class="todoapp" @click="handleClick($event)">
    <todo-header />
    <todo-main />
    <todo-footer />
  </section>
</template>

<script>
import TodoHeader from '~/components/TodoHeader.vue'
import TodoMain from '~/components/TodoMain.vue'
import TodoFooter from '~/components/TodoFooter.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter
  },
  mounted() {
    this.$store.commit('todo/INIT_TODOS')
  },
  methods: {
    ...mapActions('todo', ['foo']),
    handleClick(e) {
      if (
        e.target.tagName !== 'INPUT' &&
        e.target.getAttribute('type') !== 'text'
      ) {
        this.resetEdit()
      }
    }
  }
}
</script>
