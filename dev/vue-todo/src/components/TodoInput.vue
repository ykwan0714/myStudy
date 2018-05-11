<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" placeholder="Type what you have to do" v-on:keyup.enter="addTodo">
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn fa fa-plus" aria-hidden="true"></i>
    </span>
    <modal v-if="showModal" v-on:close="closeModal">
      <!-- 모달 헤더 -->
      <h3 slot="header">경고</h3>
      <!-- 모달 footer -->
      <span slot="footer" v-on:click="showModal = false">
        할 일을 입력하세요.
        <i class="closeModalBtn fa fa-times" aria-hidden="true"></i>
      </span>
    </modal>
  </div>
</template>

<script>
  import Modal from './common/Modal.vue'; // Modal.vue 불러오기

  export default {
    data() {
      return {
        newTodoItem: '',
        showModal: false
      }
    },
    methods: {
      addTodo() {
        if (this.newTodoItem !== "") {
          var value = this.newTodoItem && this.newTodoItem.trim();
          this.$emit('addTodo', value);
          this.clearInput();
        } else {
          this.showModal = !this.showModal;
        }
      },
      clearInput() {
        this.newTodoItem = '';
      },
      closeModal() {
        this.showModal = false;
      }
    },
    components: {
      Modal: Modal
    }
  }
</script>

<style>
  input:focus {
    outline: none;
  }
  .inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
  }
  .inputBox input {
    border-style: none;
    font-size: 0.9rem;
  }
  .addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: inline-block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
  }
  .addBtn {
    color: white;
    vertical-align: middle;
  }
</style>
