<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsTodos" class="shadow" v-bind:key="index">
        <i class="checkBtn fa fa-check" aria-hidden="true" v-bind:chk="todoItem.isComplete" v-on:click="toggleTodo(index)"></i>
        <span class="text" v-on:dblclick="editTodo($event,index)" v-show="index != propsEditMode" >{{ todoItem.value }}</span>
        <input type="text" class="edit-input" v-show="index == propsEditMode" v-bind:value="todoItem.value" v-on:keydown.enter="compTodo($event, index)"/>
        <span class="removeBtn" type="button" v-on:click="removeTodo(todoItem.value, index)">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </span>
      </li>
    </transition-group>
  </section>
</template>

<script>
  export default {
    props: ['propsTodos', 'propsEditMode'],
    methods: {
      removeTodo(key, index) {
        this.$emit('removeTodo', key, index);
      },
      toggleTodo(index){
        this.$emit('toggleTodo', index);
      },
      editTodo(event, index){
        this.$emit('editTodo', index);
        setTimeout(()=>{
          event.target.nextElementSibling.focus()
        },100)
      },
      compTodo(event, index){
        this.$emit('compTodo', index, event.target.value);
      }
    }
  }
</script>

<style>
  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
  }
  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
  }
  .checkBtn {
    line-height: 45px;
    color: #7A7E81;
    margin-right: 5px;
  }
  .checkBtn[chk="true"]{
    color: #62acde;
  }
  .checkBtn[chk="true"] + .text{
    text-decoration-line: line-through;
  }
  .removeBtn {
    margin-left: auto;
    color: #de4343;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>

