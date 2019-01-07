<template>
  <section v-bind:class="getClassName">
    <div v-bind:class="getInnerClassName">
      <div class="max-width__480">
        <search-input
          v-if="collapsed"
          v-bind:hideLabel="true"
          placeholder="e.g.: john smith"
          @submit="submitHandler"/>
        <search-input
          v-else
          label="Search for patients by name"
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
        )
      }
    },
    computed: {
      getClassName(){
        return `search-parameters${this.collapsed ? ' search-parameters__collapsed' : ''}`;
      },
      getInnerClassName(){
        return `section-inner-wrapper${this.collapsed ? ' justify-center' : ' justify-center'}`
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
      rgb(50,55,60),
      rgb(35,40,45)
    );
    box-sizing: border-box;
    transition-property: padding;
    transition-timing-function: ease;
    transition-duration: .4s;
    flex-grow: 1;
    color: white;
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
  .search-description{
    margin-top: 1rem;
    font-size: 12pt;
    font-weight: 300;
    line-height: 1.8;
    padding: 1.5rem 2rem;
    box-sizing: border-box;
    background: #ddd;
    color: #333;
    border-radius: .25rem;
  }
</style>
