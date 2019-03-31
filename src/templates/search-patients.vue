<template>
  <section class="search-parameters">
    <div class="section-inner-content">
      <div class="max-width__480">
        <h2 class="page-title input-title">Patient Records Finder</h2>
        <search-input
          size="large"
          autofocus="true"
          placeholder="e.g.: john smith"
          @submit="submitHandler"/>
        <aside
          class="search-description"
          v-if="!collapsed">
            <p>Quickly find a patient of interest by searching for their name. Searching supports full and partial matches.</p>
        </aside>
      </div>
    </div>
  </section>
</template>

<script>
  import SearchInput from './search-input'
  export default {
    name: 'SearchPatients',
    props: [
      'collapsed'
    ],
    components: {
      SearchInput
    },
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
  .search-parameters{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 4rem;
    box-sizing: border-box;
    transition-property: padding;
    transition-timing-function: ease;
    transition-duration: .4s;
    flex-grow: 1;
    height: 100%;
  }
  .search-parameters__collapsed{
    padding: 2rem 4rem;
    flex-grow: 0;
  }
  .search-parameters .section-inner-wrapper {
    transition-property: justify-content;
    transition-duration: .4s;
    transition-timing-function: ease;
  }
  .max-width__480{
    flex-grow: 1;
    max-width: 480px;
  }
  .input-title{
    margin-bottom: 2rem;
  }
  .search-description{
    margin-top: 2rem;
    font-size: 14pt;
    font-weight: 200;
    line-height: 1.6;
    box-sizing: border-box;
    padding-left: 1.25rem;
    border-left: 5px solid #F5FDE3;
  }
</style>
