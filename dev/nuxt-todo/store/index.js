import Vuex from 'vuex'
import todo from './todo'

const store = new Vuex.Store({
  modules: {
    todo
  }
})

store.subscribe((mutation, state) => {
  if (mutation.type !== 'todo/INIT_TODOS') {
    localStorage.setItem('todos', JSON.stringify(state.todo.todos))
  }
})

export default () => store
