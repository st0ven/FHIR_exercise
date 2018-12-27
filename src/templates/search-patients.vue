<template>
  <section v-bind:class="getClassName">
    <div class="section-content-wrapper">
      <search-input 
        label="Search for patients by name" 
        placeholder="e.g.: john smith"
        @submit="submitHandler"/>
      <aside class="search-description">
        <span v-if="!collapsed">Quickly find a patient of interest by searching for their name. Searching supports full and partial matches.</span>
      </aside>
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
        )
      }
    },
    computed: {
      getClassName(){
        return `search-parameters${this.collapsed ? ' search-parameters__collapsed' : ''}`;
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
    background: radial-gradient( 
      circle farthest-corner at top left,
      rgb(40,45,50), 
      rgb(35,40,45) 
    );
    box-sizing: border-box;
    transition-property: padding;
    transition-timing-function: ease;
    transition-duration: .4s;
    flex-grow: 1;
  }
  .search-parameters__collapsed{
    padding: 2rem 4rem;
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