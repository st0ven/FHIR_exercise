<template>
  <section class="search-parameters">
    <div class="section-content-wrapper">
      <search-input 
        label="Search for patients by name" 
        placeholder="e.g.: john smith"
        @submit="submitHandler"/>
      <aside class="search-description">
        <span>Quickly find a patient of interest by searching for their name. Searching supports full and partial matches.</span>
      </aside>
    </div>
  </section>
</template>

<script>
  import SearchInput from './search-input'
  export default {
    name: 'SearchPatients',
    props: [
      'onSubmit'
    ],
    components: {
      SearchInput
    },
    methods: {
      submitHandler(e){
        this.$emit(
          'submit',
          e
        )
      }
    }
  }
</script>

<style>
  .search-parameters{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem 4rem;
    background: #eee;
    flex-grow: 1;
    box-sizing: border-box;
  }
  .section-content-wrapper{
    max-width: 480px;
  }
  .search-description{
    margin-top: 1rem;
  }
  .search-description span{
    font-size: 10pt;
    font-weight: 300;
    line-height: 1.5;
  }
</style>