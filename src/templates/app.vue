<template>
  <div class="page-wrapper">

    <aside class="area--indicator">
      <ProgressIndicator v-bind:activeIndex="getIndicatorIndex"/>
    </aside>

    <header 
      class="area--title" 
      v-if="currentPage !== 'landing'"
    >
      <AppHeader
        v-bind:queryString="queryString"
        @submit="handlePatientSearch"
      />
    </header>

    <section class="area--content">
      <SearchPatients
        v-if="currentPage === 'landing'"
        v-bind:collapsed="hasPatientResults"
        @submit="handlePatientSearch"
      />
      <div
        class="loading-results"
        v-if="resultsPending || recordsPending">
          <div class="loading-wrapper">
            <h4>fetching results</h4>
            <Loader/>
          </div>
      </div>
      <PatientResults
        v-if="currentPage === 'patientSelect'"
        v-bind:patientData="getPatientListData"
        v-bind:resultsPending="hasAdditionalResults"
        v-bind:rowSelected="currentPatientIndex"
        @deselect="handlePatientDeselect"
        @select="handlePatientSelect"
        @fetchAdditionalResults="fetchAdditionalPatientResults"
      />
      <PatientRecords
        v-if="currentPage === 'patientRecords'"
        v-bind:records="getPatientRecordsData"
        v-bind:resultsPending="hasAdditionalResults"
      />
    </section>

    <footer 
      v-if="currentPage !== 'landing'"
      class="area--actions"
    >
      <Button
        v-if="currentPage === 'patientSelect' && hasPatientResults"
        @click="handlePatientReset"
        type="negative"
        size="small"
        label="clear search results"
      />
      <Button
        v-if="currentPage === 'patientRecords'"
        @click="handleRecordsReset"
        type="negative"
        size="small"
        label="select a different patient"
      />
      <Button
        v-if="currentPage === 'patientSelect' && hasPatientSelection"
        @click="handlePatientRecordsSearch"
        size="small"
        type="positive"
        label="find patient records"
      />
    </footer>

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
  import PendingResults from './pending-results';
  import ProgressIndicator from './progress-indicator';
  import ResultsHeading from "./results-heading";
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
      PendingResults,
      ProgressIndicator,
      ResultsHeading,
      SearchPatients
    },
    methods: {
      /* clear state of any collected records and redirect page state back to patient list */
      clearPatientRecordsResults(){
        this.currentRecordsResultsList = [];
        this.recordsPending = false;
        this.resultsLinks = [];
      },
      /* State management function setting app status back to initial state */
      clearPatientResults(){
        this.clearPatientRecordsResults();
        this.currentPatientResultsList = [];
        this.patientHistoryResults = [];
        this.currentPatientIndex = -1;
        this.resultsPending = false;
      },
      /* callback is triggered when IntersectionObserver event is fired as visible onscreen. */
      fetchAdditionalPatientResults(){
        const nextPageURL = this.resultsLinks[1].url;
        Service.getNextResultsPage(
          nextPageURL
        ).then(
          result => {
            const newResults = result.entry || [];
            this.currentPatientResultsList = this.currentPatientResultsList.concat(newResults);
            this.resultsLinks = result.link;
          }
        )
      },
      /* State management function which handles when a patient selection is deselected */
      handlePatientDeselect( row, index ){
        this.currentPatientIndex = -1;
      },
      /* handler to clear a set of patients from result list and return to initial page state */
      handlePatientReset(){
        this.clearPatientResults();
        this.setDisplayPage( 'landing' );
      },
      /* 
      Handler to initiate a patient search. 
      Manages app state as well as invoking service call to asynchronously fetch results 
      */
      async handlePatientSearch( queryString ){
        if(
          typeof queryString === 'string'
          && queryString.length
        ){
          this.initiatePatientSearch( queryString );
          let result = await Service.searchForPatients( queryString );
          this.resolvePatientSearch( result );
        }
      },
      /* event handler which sees through the entire patient records search async flow*/
      async handlePatientRecordsSearch(){
        const { resourceId } = this.getPatientListData[this.currentPatientIndex];
        this.initiatePatientRecordsSearch();
        let result = await Service.getHealthRecordsOfPatient( resourceId );
        this.resolvePatientRecordsSearch( result );
      },
      /* State management function which handles patient selection */
      handlePatientSelect( row, index ){
        this.currentPatientIndex = index;
      },
      /* handler to clear any patient records from data table and navigate to previous patient list page state */
      handleRecordsReset(){
        this.clearPatientRecordsResults();
        this.setDisplayPage( 'patientSelect' );
      },
      /* Given an initial search query, sets some application state prior to searching for any API results */
      initiatePatientSearch( queryString ){
        // clear any outstanding search results
        this.clearPatientResults();
        // set application state to indicate pending search results and capture search query string
        this.resultsPending = true;
        this.queryString = queryString;
        // set the display page to view patient results
        this.setDisplayPage( 'patientSelect' );
      },
      /* */
      initiatePatientRecordsSearch(){
        this.clearPatientRecordsResults();
        this.recordsPending = true;
        this.setDisplayPage( 'patientRecords' );
      },
      /*
      accepts the result of a patient search service call and cleans up active search state.
      Stores the patient results list and any additional result links as an array within application state.
      */
      resolvePatientSearch( result ){
        // set app state to indicate results are pending
        this.resultsPending = false;
        // store results in component data
        this.currentPatientResultsList = result.entry || [];
        // store pagination listings
        this.resultsLinks = result.link;
      },
      resolvePatientRecordsSearch( result ){
        this.recordsPending = false;
        this.currentRecordsResultsList = result.entry || [];
        this.resultsLinks = result.link;
      },
      /* given a page alias, set the application to display a certain page */
      setDisplayPage( whichPage ){
        switch( whichPage ){
          case 'patientSelect':
            this.currentPage = 'patientSelect';
            break;
          case 'patientRecords':
            this.currentPage = 'patientRecords';
            break;
          default :
            this.currentPage = 'landing'
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
        currentRecordsResultsList: [],
        patientName: '',
        queryString: '',
        recordsPending: false,
        resultsLinks: [],
        resultsPending: false,
      }
    },
    computed: {
      /* an alias that fetches the name of the current page */
      displayPage(){
        return this.currentPage
      },
      /* 
      Will fetch an indexed representation of which page in the order is being viewed. 
      Primarily used for the page indicator bar to highlight progress correctly.
      */
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
      /* Fetches and forms schema to represent patient listing data in a data table */
      getPatientListData(){
        // init app data to fresh values
        const currentList = this.currentPatientResultsList || [];
        // map the list results into a format to be displayed
        try {
          return currentList.map(
            Helper.populatePatientListTableData
          )
        }
        catch( error ){
          console.log( error );
        }
      },
      /* Fetches and forms schema to represent any patient records within a data table */
      getPatientRecordsData(){
        const currentList = this.currentRecordsResultsList || [];
        try {
          return currentList.map(
            Helper.populatePatientRecordsTableData
          )
        }
        catch( error ){
          console.log( error );
        }
      },
      getResultsHeadingText(){
        return this.currentPage === 'patientSelect'
          ? `Patient results matching query '${this.queryString}'`
          : `Medical Records found for ${this.patientName}`;
      },
      /* Boolean query to determine if there are additional results pages in a current data table results view. */
      hasAdditionalResults(){
        return this.resultsLinks && this.resultsLinks.length > 1
      },
      /* returns boolean value of whether or not there are patient records stored in state */
      hasPatientRecords(){
        return this.currentRecordsResultsList
          && this.currentRecordsResultsList.length > 0;
      },
      /* Boolean function testing to see if there are any existing patient results in the component data store */
      hasPatientResults(){
        return this.currentPatientResultsList
          && this.currentPatientResultsList.length > 0;
      },
      /* Boolean query to determine if there is a patient in the list that is currently selected */
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
    max-height: 100%;
    overflow: hidden;
    display: flex;
    font-family: 'Muli', sans-serif;
  }
  body {
    color: rgb(252,255,216);
    background: rgb(252,255,216);
    box-sizing: border-box;
    padding: .5rem;
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
  a {
    color: rgb(255,211,0);
  }
  a:visited {
    color: rgb(211,146,0);
  }

  .page-wrapper {
    position: relative;
    display: grid;
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    grid-template-columns: auto 4fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "area--indicator area--title"
      "area--indicator area--content"
      "area--indicator area--actions";
    justify-content: center;
    max-height: 100%;
    flex-grow: 1;
    padding: 2rem;
    border-radius: .33rem;
    background-attachment: fixed;
    background-image:
      radial-gradient(
        ellipse farthest-corner at 100% 100%,
        rgb(0,20,46),
        rgb(0,64,61)
      );
    box-shadow: 2rem 2rem 5rem rgba(0,0,0,.25);
  }
  .area--actions {
    grid-area: area--actions;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .area--indicator {
    grid-area: area--indicator;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  .area--title {
    grid-area: area--title;
  }
  .area--heading {
    grid-area: area--heading;
  }
  .area--content {
    grid-area: area--content;
    position: relative;
    max-height: 100%;
    overflow: hidden;
  }
  .area--title,
  .area--heading,
  .area--content,
  .area--actions {
    width: 100%;
    max-width: 1200px;
    justify-self: center;
  }
  .column--content {
    display: flex;
    justify-content: center;
  }
  .nav-action-wrapper button{
    margin-left: 1rem;
  }
  .loading-results {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    height: 100%;
  }
  .loading-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
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
