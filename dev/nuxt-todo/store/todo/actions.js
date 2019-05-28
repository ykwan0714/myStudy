/**
 * 할일을 추가한다.
 * @param {*} param0
 * @param {String} payload - 추가할 할일의 내용
 */
const addTodo = ({ commit }, payload) => {
  commit('ADD_TODO', {
    id: new Date().getTime(),
    content: payload,
    done: false,
    edit: false
  })
}
/**
 * 할일을 수정한다.
 * @param {*} param0
 * @param {Object} payload - 수정할 할일 객체
 */
const editTodo = ({ commit, dispatch }, paylaod) => {
  commit('EDIT_TODO', paylaod)
}

/**
 * 할일을 삭제 한다.
 * @param {ㅎ} param0
 * @param {Number} paylaod - 삭제할 할일의 id
 */
const delTodo = ({ commit }, paylaod) => {
  commit('DEL_TODO', paylaod)
}

/**
 * 완료된 할일들을 삭제한다.
 * @param {*} param0
 */
const clearTodos = ({ commit, getters }) => {
  commit('CLEAR_TODOS', getters.activeTodos)
}

/**
 * 할일들의 완료 여부를 toggle한다.
 * @param {*} param0
 * @param {Boolean} payload - 할일의 완료 여부
 */
const toggleTodos = ({ commit, dispatch }, payload) => {
  commit('TOGGLE_TODOS', payload)
}

/**
 * 할일의 수정 여부를 초기화 한다.
 * @param {*} param0
 */
const resetEdit = ({ commit }) => {
  commit('RESET_EDIT')
}

export default {
  addTodo,
  editTodo,
  delTodo,
  clearTodos,
  toggleTodos,
  resetEdit
}
