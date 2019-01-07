<template>
  <div class="content-wrapper">
    <header v-bind:class="getHeaderClassName">
      <AppHeader/>
      <SearchPatients
        v-bind:collapsed="hasPatientResults()"
        @submit="fetchPatientResults"/>
    </header>
    <PatientResults
      v-if="hasPatientResults()"
      v-bind:patientData="getPatientListData"
      @deselect="handlePatientDeslect"
      @select="handlePatientSelect"/>
    <PatientRecords
      v-if="hasPatientRecords()"
      v-bind:records="getPatientRecordsData"/>
    <footer
      class="nav-action-wrapper sticky__bottom"
      v-if="hasPatientSelection">
      <div class="section-inner-wrapper justify-end">
        <Button
          @click="clearPatientResults"
          flavor="nude"
          size="small"
          label="clear results"/>
        <Button
          @click="selectPatient"
          size="small"
          label="find patient records"/>
      </div>
    </footer>
  </div>
</template>

<script>
  import AppHeader from './app-header';
  import Button from './button';
  import DataTable from './data-table';
  import PatientRecords from './patient-records';
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
      Button,
      DataTable,
      PatientRecords,
      PatientResults,
      SearchPatients
    },
    methods: {
      clearPatientResults(){
        this.currentPatientResultsList = [];
        this.patientResults = {};
        this.resultsPending = false;
        this.currentPatientIndex = -1;
        displayPatientResults: false;
      },
      fetchPatientRecords( { resourceId } ){
        this.recordsPending = true;
        return getHealthRecordsOfPatient( resourceId )
          .then( result => {
            this.patientRecordsResults = result;
            this.recordsPending = false;
            console.log(result);
          });
      },
      handlePatientDeslect( row, index ){
        this.currentPatientIndex = -1;
      },
      handlePatientSelect( row, index ){
        this.currentPatientIndex = index;
      },
      hasPatientRecords(){
        return this.patientRecordsResults.entry
          && this.patientRecordsResults.entry.length > 0;
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
      fetchPatientResults(queryString){
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
      },
      selectPatient(){
        const patient = this.getPatientListData[this.currentPatientIndex];
        const { resourceId } = patient;
        this.recordsPending = true;
        this.fetchPatientRecords( patient )
          .then ( () => {
            this.resultsPending = false;
            console.log(this.getPatientRecordsData);
          } );
      }
    },
    data(){
      return{
        currentPatientResultsList: [],
        currentPatientIndex: -1,
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
        return `app-header-wrapper ${ this.hasPatientResults() ? ' sticky__top' : 'sticky__full' }`;
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
              ( item = {} ) => ({
                age: (
                  item.resource.birthDate
                    ? new Date().getFullYear() - item.resource.birthDate.split('-')[0]
                    : 'unknown'
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
                onset: item.resource.onsetDateTime || 'unknown',
                condition: item.resource.code.text,
                notes: item.resource.notes || ''
              })
            );
        }
        catch( error ){
          console.log( error );
        }
      },
      hasPatientSelection(){
        return this.currentPatientIndex >= 0;
      },
    }
  }
</script>

<style lang='css'>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700|Montserrat:300,400,600,700');
  * {
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    font-size: inherit;
    font-family: inherit;
  }
  html, body {
    position: relative;
    min-width: 100%;
    min-height: 100%;
    display: flex;
    font-family: 'Source Sans Pro', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Source Sans Pro';
    font-weight: 600;
    text-transform: uppercase;
    outline: 0;
  }
  .app-header-wrapper {
    flex-direction: column;
    transition: flex .5s ease;
    top: 0px;
  }
  .sticky__top {
    position: sticky;
    display: flex;
    flex-grow: 0;
  }
  .sticky__full {
    position: sticky;
    display: flex;
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
  .justify-start {
    display: flex;
    justify-content: flex-start;
  }
  .justify-center {
    display: flex;
    justify-content: center;
  }
  .justify-end {
    display: flex;
    justify-content: flex-end;
  }
  .nav-action-wrapper {
    padding: 2rem 0;
    display: flex;
    justify-content: center;
    width: 100%;
    background: white;
  }
  .nav-action-wrapper button{
    margin-left: 1rem;
  }
</style>
