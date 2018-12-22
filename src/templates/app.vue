<template>
  <main class="content-wrapper">
    <AppHeader/>
    <SearchPatients 
      @submit="searchForPatients"/>
    <section>
      <ul>
        <li
          v-for="(item, index) of getPatientListData()"
          v-bind:key="`patient-${index}`"
          v-bind="item"
          v-bind:index="index">
            {{ `${item.name[0].family.join(' ')}, ${item.name[0].given.join(' ')}`}}
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
  import AppHeader from './app-header';
  import SearchPatients from './search-patients';
  import { searchPatients } from '../service';
  export default {
    name: 'App',
    components: {
      AppHeader,
      SearchPatients
    },
    methods: {
      getMorePatientsEndpoint(){
        return ( this.patientResults.link || [] )
          .filter( item => item.relation === 'next')
          .map( (item = {}) => item.url );
      },
      getPatientListData(){
        return ( this.patientResults.entry || [] )
          .map( (item = {}) => item.resource );
      },
      searchForPatients(queryString){
        if(queryString.length){
          // reinitialize the existing collection of patients matching this query
          this.allPatientEntries = [];
          // set app state to indicate results are pending
          this.resultsPending = true;
          // fetch the new results asynchronously
          searchPatients( queryString )
            .then( result => {
                /* TODO: error handling */
                this.patientResults = result;
                // emit event indicating results have been received
                this.resultsPending = false;
              });
        }
      }
    },
    data(){
      return{
        currentPatientResultsList: [],
        patientResults: {},
        patientHistoryResults: [],
        resultsPending: false
      }
    }
  }
</script>

<style lang='css'>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700|Montserrat:400,600,700');
  * {
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    font-size: inherit;
    font-family: 'Source Sans Pro', sans-serif;
  }
  html, body{
    position: relative;
    min-width: 100%;
    min-height: 100%;
    display: flex;
  }
  .content-wrapper{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  .section-inner-wrapper{
    width: 100%;
    max-width: 800px;
  }
</style>