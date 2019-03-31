<template>
  <aside 
    class="pending-results"
    ref="wrapper"
  >
    <span>fetching more results</span>
    <Loader/>
  </aside>
</template>

<script>
  import Loader from './loader';
  export default {
    name: "PendingResults",
    components: {
      Loader
    },
    mounted(){
      const { wrapper } = this.$refs;
      const options = {
        rootMargin: '0px',
        threshold: 0
      }
      let observer = new IntersectionObserver(
        this.handleIntersect,
        options
      )
      observer.observe( wrapper );
    },
    methods: {
      handleIntersect( entries, observer){
        if (
          entries.some( 
            entry => entry.isIntersecting 
          )
        ){
          this.$emit(
            'isVisible'
          )
        }
      }
    }
  }
</script>

<style>
  .pending-results {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
  }
  .pending-results .loader {
    margin-top: 1rem;
  }
  .pending-results .loader,
  .pending-results .loader-inner {
    width: 2rem;
    height: 2rem;
  }
  .pending-results .loader-bit {
    width: 10px;
    height: 10px;
  }
</style>