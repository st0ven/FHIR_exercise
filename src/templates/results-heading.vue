<template>
  <header>
    <h3 class="results-title">{{ title }}</h3>
  </header>
</template>

<script>
  export default {
    name: 'results-heading',
    props: [
      'title'
    ]
  }
</script>

<style>
  .results-title {
    margin-bottom: 1rem;
    padding-bottom: .5rem;
    border-bottom: 1px solid rgba(245,253,227,.5);
    text-transform: capitalize;
    font-weight: 400;
  }
</style>
