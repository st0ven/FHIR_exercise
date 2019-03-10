<template>
  <section class="app-header">
    <h1 class="page-title">Patient Records Finder</h1>
    <search-input
      class="search"
      placeholder="e.g.: john smith"
      v-bind:value="queryString"
      @submit="submitHandler" />
  </section>
</template>

<script>
  import SearchInput from './search-input';
  export default {
    name: 'AppHeader',
    components: {
      SearchInput
    },
    props: [
      'queryString'
    ],
    methods: {
      submitHandler(e){
        this.$emit(
          'submit',
          e
        );
      }
    }
  }
</script>

<style>
  @keyframes slideIn {
    from {
      transform: translateY(-20%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .app-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin: 1rem 0 4rem;
    animation-name: slideIn;
    animation-duration: .3s;
    animation-timing-function: ease;
    animation-iteration-count: 1;
    animation-fill-mode: both;
  }
  .page-title {
    margin-bottom: 0;
  }
  .search {
    width: 420px;
  }
</style>
