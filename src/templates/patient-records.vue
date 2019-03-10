<template>
  <section class="patient-records">
    <results-heading title="Patient Records for 'PATIENT-NAME'"/>
    <data-table
      v-if="hasResults"
      v-bind:tableData="records"
      v-bind:schema="getPatientListSchema"
      v-bind:selectable="false"/>
    <div
      class="loading-results"
      v-if="resultsPending">
        <h4>fetching results</h4>
        <Loader/>
    </div>
    <notification
      v-if="!resultsPending && !hasResults"
      title="no patient results found"
      description="There were no patients on record that matched your search query. Please refine your search and submit to process another query. Searches are queried against a patient's full name. Regular expression matches are not currently supported."/>
  </section>
</template>

<script>
  import DataTable from './data-table';
  import Loader from './loader';
  import Notification from './notification';
  import ResultsHeading from './results-heading';
  export default {
    name: "PatientRecords",
    components: {
      DataTable,
      Loader,
      Notification,
      ResultsHeading
    },
    props: [
      'records',
      'resultsPending'
    ],
    computed: {
      getPatientListSchema(){
        return [
          'condition',
          'onset',
          'notes'
        ]
      },
      hasResults(){
        return Boolean( this.records.length );
      },
    },
  }
</script>

<style>
  .patient-records {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    box-sizing: border-box;
  }
</style>
