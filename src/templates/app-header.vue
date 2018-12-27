<template>
  <section class="app-header">
    <div class="section-inner-wrapper">
      <h1>FHIR medical records search tool</h1>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'AppHeader'
  }
</script>

<style>
  .app-header{
    background: white;
    display: flex;
    justify-content: center;
    padding: .25rem 4rem;
    box-sizing: border-box;
  }
  .app-header h1{
    font-family: 'Source Sans Pro';
    font-weight: 400;
    font-size: 10pt;
    outline: 0;
    text-transform: uppercase;
  }
</style>