const todos = state => state.todos
const activeTodos = (state, getters) =>
  getters.todos.filter(el => el.done === false)
const completedTodos = (state, getters) => getters.todos.filter(el => el.done)
const isAllDone = (state, getters) => getters.todos.every(el => el.done)

export default {
  todos,
  activeTodos,
  completedTodos,
  isAllDone
}
