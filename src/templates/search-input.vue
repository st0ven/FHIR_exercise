<template>
  <aside class="input-coupling">
    <label
      v-if='label'
      class="input-label">
        {{ label }}
    </label>
    <input
      type="text"
      v-on:keyup.enter="handleSubmit"
      v-bind:placeholder="placeholder"
      v-bind:class="getClassName"/>
  </aside>
</template>

<script>
  import { searchPatients } from '../service';
  export default {
    name: 'SearchInput',
    props: [
      'className',
      'hasError',
      'label',
      'placeholder'
    ],
    methods: {
      handleSubmit(e){
        if(
          e.target.value.length
          && e.target.value !== this.currentValue
        ) {
          this.currentValue = e.target.value;
          this.$emit(
            'submit',
            e.target.value
          );
        }
      }
    },
    computed: {
      getClassName(){
        const classNameProp = this.className
          ? `${this.className} `
          : ''
        return Boolean(this.hasError)
          ? `${classNameProp}search-input search-input__error`
          : `${classNameProp}search-input`
      }
    },
    data(){
      return {
        currentValue: ''
      }
    }
  }
</script>

<style>
  ::-webkit-input-placeholder{
    font-style: italic;
    font-weight: 400;
    color: rgba(0,0,0,.33);
    transition-timing-function: ease;
    transition-duration: .25s;
    transition-property: color;
  }
  :focus::-webkit-input-placeholder{
    color: white;
    font-weight: 400;
  }
  input{
    font-size: 16pt;
  }
  .input-coupling{
    display: flex;
    flex-direction: column;
  }
  .input-label{
    font-size: 14pt;
    padding-bottom: .75rem;
  }
  .search-input{
    color: white;
    font-weight: 400;
    padding: .8rem 1.2rem;
    background: transparent;
    border-radius: .2rem;
    border: 1px solid rgba(255,255,255,.5);
    min-width: 320px;
    box-sizing: border-box;
    transition-duration: .2s;
    transition-timing-function: ease;
    transition-property: background, border-color;
  }
  .search-input::-webkit-input-placeholder{
    color: white;
  }
  .search-input:focus{
    background: rgb(80,80,80);
    border-color: rgb(80,80,80);
    font-weight: 600;
  }
</style>
