import Vue from 'vue'

const INIT_TODOS = state => {
  const localTodos = localStorage.getItem('todos') || ''
  if (localTodos.length) {
    state.todos = JSON.parse(localTodos)
  }
}

const ADD_TODO = (state, payload) => {
  state.todos.push(payload)
}

const EDIT_TODO = (state, payload) => {
  const index = state.todos.findIndex(el => el.id === payload.id)
  if (index > -1) {
    Vue.set(state.todos, index, payload)
  }
}

const DEL_TODO = (state, payload) => {
  state.todos = state.todos.filter(el => el.id !== payload)
}

const CLEAR_TODOS = (state, payload) => {
  state.todos = payload
}

const TOGGLE_TODOS = (state, payload) => {
  state.todos = state.todos.map(el => {
    el.done = payload
    return el
  })
}

const RESET_EDIT = state => {
  state.todos = state.todos.map(el => {
    el.edit = false
    return el
  })
}

export default {
  INIT_TODOS,
  ADD_TODO,
  EDIT_TODO,
  DEL_TODO,
  CLEAR_TODOS,
  TOGGLE_TODOS,
  RESET_EDIT
}
