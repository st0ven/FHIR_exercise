<template>
  <div class="content-wrapper">
    <header v-bind:class="getHeaderClassName">
      <AppHeader/>
      <SearchPatients 
        v-bind:collapsed="hasPatientResults()"
        @submit="searchForPatients"/>
    </header>
    <PatientResults
      v-if="hasPatientResults()"
      v-bind:patientData="getPatientListData"/>
  </div>
</template>

<script>
  import AppHeader from './app-header';
  import DataTable from './data-table';
  import PatientResults from './patient-results';
  import SearchPatients from './search-patients';
  import femaleIcon from '../images/female.svg';
  import maleIcon from '../images/male.svg';
  import { 
    getHealthRecordsOfPatient, 
    searchPatients 
  } from '../service';

  export default {
    name: 'App',
    components: {
      AppHeader,
      DataTable,
      PatientResults,
      SearchPatients
    },
    methods: {
      fetchPatientRecords( { resourceId } ){
        this.recordsPending = true;
        getHealthRecordsOfPatient( resourceId )
          .then( result => {
            this.patientRecordsResults = result;
            this.recordsPending = false;
          });
      },
      hasPatientResults(){
        return this.patientResults.entry 
          && this.patientResults.entry.length > 0;
      },
      reducePatientNameFromResponse( nameObject = [] ){
        const patientName = nameObject[0] || {};
        const lastName = ( patientName.family instanceof Array )
          ? patientName.family.join( ' ' )
          : patientName.family;
        const givenName = ( patientName.given instanceof Array )
          ? patientName.given.join( ' ' )
          : patientName.given;
        return `${lastName.toUpperCase()}, ${givenName.toUpperCase()}`;
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
                this.resultsPending = false;
              });
        }
      }
    },
    data(){
      return{
        currentPatientResultsList: [],
        displayPatientResults: false,
        patientResults: {},
        patientRecordsResults: {},
        patientHistoryResults: [],
        recordsPending: false,
        resultsPending: false,
      }
    },
    computed: {
      getHeaderClassName(){
        return `sticky__top${ this.hasPatientResults ? ' sticky__full' : '' }`;
      },
      getMorePatientsEndpoint(){
        return ( this.patientResults.link || [] )
          .filter( item => item.relation === 'next')
          .map( (item = {}) => item.url );
      },
      getPatientListData(){
        // init app data to fresh values
        const currentList = this.currentPatientResultsList;
        const latestResults = !( this.patientResults.entry instanceof Array )
          ? []
          : this.patientResults.entry;
        // map the list results into a format to be displayed
        try {
          return currentList.concat(
            latestResults.map( 
              (item = {}) => ({
                birthDate: (
                  new Date().getFullYear() - item.resource.birthDate.split('-')[0]
                ),
                gender: item.resource.gender,
                resourceId: item.resource.id,
                name: this.reducePatientNameFromResponse( item.resource.name ),
              })
            )
          );
        }
        catch( error ){
          console.log( error );
        }
      },
      getPatientRecordsData(){
        const latestResults = this.patientRecordsResults.entry instanceof Array
          ? this.patientRecordsResults.entry
          : [];
        try {
          return latestResults
            .filter( ( item = {} ) => item.resource.clinicalStatus === "active" )
            .map(
              ( item = {} ) => ({
                resourceId: item.resource.id,
                onset: item.resource.onsetDateTime,
                condition: item.resource.code.text
              })
            )
        }
        catch( error ){
          console.log( error );
        }
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
  html, body {
    position: relative;
    min-width: 100%;
    min-height: 100%;
    display: flex;
  }
  .sticky__top {
    position: sticky;
    top: 0px;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    transition: flex .5s ease;
  }
  .sticky__full {
    flex-grow: 1;
  }
  .content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 0;
  }
  .section-inner-wrapper {
    width: 100%;
    max-width: 800px;
  }
</style>