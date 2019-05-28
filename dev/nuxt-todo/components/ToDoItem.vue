<template>
  <li
    class="todo"
    :class="{
      completed: item.done ? true : false,
      editing: item.edit ? true : false
    }"
  >
    <div class="view">
      <input
        :key="item.id"
        type="checkbox"
        class="toggle"
        :checked="item.done"
        @click="handleEdit({ done: !item.done })"
      />
      <label @dblclick="handleEdit({ edit: !item.edit })">
        {{ item.content }}
      </label>
      <button class="destroy" @click="delTodo(item.id)"></button>
    </div>
    <input
      ref="inputEdit"
      type="text"
      class="edit"
      :value="item.content"
      @keydown="handleKeydown"
    />
  </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    'item.edit': function(n, o) {
      if (n) {
        this.$nextTick(() => {
          this.$refs.inputEdit.focus()
        })
      }
    }
  },
  methods: {
    ...mapActions('todo', ['editTodo', 'delTodo']),
    handleEdit(obj) {
      this.editTodo({ ...this.item, ...obj })
    },
    handleKeydown(e) {
      if (e.keyCode === 13) {
        this.handleEdit({ content: e.target.value, edit: false })
      }
    }
  }
}
</script>
