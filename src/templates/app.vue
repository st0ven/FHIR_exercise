<template>
  <div class="content-wrapper">
    <header class="app-header-wrapper">
      <div class="content-inner-wrapper">
        <AppHeader
          v-if="currentPage !== 'landing'"
          v-bind:queryString="queryString"
          @submit="fetchPatientResults"/>
      </div>
    </header>
    <div class="content-inner-wrapper">
      <ProgressIndicator v-bind:activeIndex="getIndicatorIndex"/>
      <SearchPatients
        v-if="currentPage === 'landing'"
        v-bind:collapsed="hasPatientResults()"
        @submit="fetchPatientResults"/>
      <main
        class="app-body"
        v-if="currentPage !== 'landing'">
        <PatientResults
          v-if="currentPage === 'patientSelect'"
          v-bind:patientData="getPatientListData"
          v-bind:resultsPending="resultsPending"
          v-bind:resultsLinks="resultsLinks"
          @deselect="handlePatientDeselect"
          @select="handlePatientSelect"/>
        <PatientRecords
          v-if="currentPage === 'patientRecords'"
          v-bind:records="getPatientRecordsData"
          v-bind:resultsPending="recordsPending"
          v-bind:resultsLinks="resultsLinks"/>
        <footer
          class="more-results"
          ref="moreResults"
          v-if="hasAdditionalResults">
            fetching more results...
        </footer>
      </main>
      <footer
        class="app-footer-wrapper"
        v-if="currentPage !== 'landing'">
        <Button
          v-if="currentPage === 'patientSelect' && hasPatientResults()"
          @click="handlePatientReset"
          type="negative"
          size="small"
          label="clear results"/>
        <Button
          v-if="currentPage === 'patientRecords'"
          @click="handleRecordsReset"
          type="negative"
          size="small"
          label="select a different patient"/>
        <Button
          v-if="currentPage === 'patientSelect' && hasPatientSelection"
          @click="selectPatient"
          size="small"
          type="positive"
          label="find patient records"/>
      </footer>
    </div>
  </div>
</template>

<script>
  // helper functions
  import * as Helper from '../helper';
  // service calls
  import * as Service from "../service"
  // templates
  import AppHeader from './app-header';
  import Button from './button';
  import DataTable from './data-table';
  import PatientRecords from './patient-records';
  import PatientResults from './patient-results';
  import ProgressIndicator from './progress-indicator';
  import SearchPatients from './search-patients';
  // icons
  import femaleIcon from '../images/female.svg';
  import maleIcon from '../images/male.svg';
  import Loader from './loader';
  // exported app component
  export default {
    name: 'App',
    components: {
      AppHeader,
      Button,
      DataTable,
      Loader,
      PatientRecords,
      PatientResults,
      ProgressIndicator,
      SearchPatients
    },
    updated: function(){
      console.log(this.$refs.moreResults)
    },
    methods: {
      /* clear state of any collected records and redirect page state back to patient list */
      clearPatientRecords(){
        this.patientRecordsResults = {};
        this.recordsPending = false;
        this.resultsLinks = [];
      },
      /* State management function setting app status back to initial state */
      clearPatientResults(){
        this.clearPatientRecords();
        this.currentPatientResultsList = [];
        this.patientResults = {};
        this.patientHistoryResults = [];
        this.currentPatientIndex = -1;
        this.resultsPending = false;
      },
      /* Invokes a service call to asyncronously fetch records of a patient given that patient's resourceId as returned from the patient results API call */
      fetchPatientRecords( { resourceId } ){
        this.recordsPending = true;
        // set display page to be patient selection list
        this.setDisplayPage( 'patientRecords' );
        // service call with resourceId
        return Service
          .getHealthRecordsOfPatient( resourceId )
          .then( result => {
            this.recordsPending = false;
            this.patientRecordsResults = (
              result.entry
              && result.entry.length
            )
              ? result
              : false;
          });
      },
      /* Uses a service call to evoke API to fetch patients by name given a string to asynchronously query against. Results are stored in component data store */
      fetchPatientResults( queryString ){
        if(
          typeof queryString === 'string'
          && queryString.length
        ){
          // update app state by clearing any existing patient results
          this.clearPatientResults();
          // set flag to indicate results are pending and set the page to display
          this.resultsPending = true;
          this.setDisplayPage( 'patientSelect' );
          this.queryString = queryString;
          // fetch the new results asynchronously
          Service
            .searchForPatients( queryString )
            .then( result => {
              console.log(result);
              // results are in, set flag to false
              this.resultsPending = false;

              if ( !result.error ) {
                this.clearPatientResults();
                // set app state to indicate results are pending
                this.resultsPending = false;
                // store results in component data
                this.patientResults = (
                  result.entry
                  && result.entry.length
                )
                  ? result
                  : false;
                // store pagination listings
                this.resultsLinks = result.link;
              } else {
                console.log(' connection error ');
              }
            });
        }
      },
      /* State management function which handles when a patient selection is deselected */
      handlePatientDeselect( row, index ){
        this.currentPatientIndex = -1;
      },
      handlePatientReset(){
        this.clearPatientResults();
        this.setDisplayPage( 'landing' );
      },
      /* State management function which handles patient selection */
      handlePatientSelect( row, index ){
        this.currentPatientIndex = index;
      },
      handleRecordsReset(){
        this.clearPatientRecords();
        this.setDisplayPage( 'patientSelect' )
      },
      hasPatientRecords(){
        return this.patientRecordsResults.entry
          && this.patientRecordsResults.entry.length > 0;
      },
      /* Boolean function testing to see if there are any existing patient results in the component data store */
      hasPatientResults(){
        return this.patientResults.entry
          && this.patientResults.entry.length > 0;
      },
      /* Component-level event handler which invokes fetching patient records results and other state management */
      selectPatient(){
        const patient = this.getPatientListData[this.currentPatientIndex];
        this.recordsPending = true;
        this.fetchPatientRecords( patient )
          .then ( () => {
            this.resultsPending = false;
          } );
      },
      setDisplayPage( whichPage ){
        switch( whichPage ){
          case 'patientSelect':
            this.currentPage = 'patientSelect';
            this.clearPatientRecords();
            break;
          case 'patientRecords':
            this.currentPage = 'patientRecords';
            break;
          default :
            this.currentPage = 'landing'
            this.clearPatientResults();
        };
      }
    },
    data(){
      return{
        appPages: [
          'landing',
          'patientSelect',
          'patientRecords'
        ],
        currentPage: 'landing',
        currentPatientResultsList: [],
        currentPatientIndex: -1,
        patientResults: {},
        patientRecordsResults: {},
        queryString: '',
        recordsPending: false,
        resultsLinks: [],
        resultsPending: false,
      }
    },
    computed: {
      displayPage(){
        return this.currentPage
      },
      getIndicatorIndex(){
        let index = 0;
        this.appPages.some( (page, i) => {
          return page === this.currentPage
            ? (
              index = i,
              true
            )
            : false
        });
        return index;
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
              Helper.populatePatientListTableData 
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
              Helper.populatePatientRecordsTableData
            );
        }
        catch( error ){
          console.log( error );
        }
      },
      hasAdditionalResults(){
        return this.resultsLinks && this.resultsLinks.length > 1
      },
      hasPatientSelection(){
        return this.currentPatientIndex >= 0;
      },
    }
  }
</script>

<style lang='css'>
  @import url('https://fonts.googleapis.com/css?family=Archivo:300,400,500,600,700|Muli:200,300,400,500,700');
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
    font-family: 'Muli', sans-serif;
  }
  body {
    color: rgb(252,255,216);
    padding: 0 4rem;
    box-sizing: border-box;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Archivo';
    font-weight: 500;
    outline: 0;
    letter-spacing: 1px;
  }
  h1 { font-size: 32px; }
  h2 { font-size: 28px; }
  h3 { font-size: 24px; }
  h4 { font-size: 21px; }
  h5 { font-size: 18px; }
  h6 { font-size: 16px; }

  body,
  .app-header-wrapper,
  .app-footer-wrapper {
    background-color: rgb(41,23,13);
    background-attachment: fixed;
    background-image:
      radial-gradient(
        ellipse farthest-side at 125% 125%,
        rgba(0,64,160,.5),
        rgba(0,64,160,0)
      ),
      radial-gradient(
        ellipse farthest-side at -25% -25% ,
        rgba(42,210,206,.5),
        rgba(42,210,206,0)
      );
    -moz-background-image: none;
    background-color: rgb(31,23,13);
  }
  .app-header-wrapper {
    position: fixed;
    dispay: flex;
    flex-grow: 1;
    z-index: 2;
  }
  .app-body{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    padding: 8rem 0;
    box-sizing: border-box;
  }
  .content-wrapper {
    display: flex;
    height: 100%;
    flex-grow: 1;
    justify-content: center;
  }
  .app-header-wrapper,
  .app-footer-wrapper,
  .content-inner-wrapper {
    width: 100%;
    max-width: 1000px;
  }
  .app-footer-wrapper {
    padding: 2rem 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  .nav-action-wrapper button{
    margin-left: 1rem;
  }
  .loading-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }
  .loading-results h4{
    margin-bottom: 2rem;
  }
  .more-results {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    min-height: 64px;
    border-radius: 4px;
  }
</style>
