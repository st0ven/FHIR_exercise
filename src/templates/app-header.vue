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
    display: none;
  }
  .app-header h1{
    font-size: 12pt;
  }
</style>
