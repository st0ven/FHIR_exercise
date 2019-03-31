<template>
  <section class="patient-records">
    <data-table
      v-if="hasResults"
      v-bind:tableData="records"
      v-bind:schema="getPatientListSchema"
      v-bind:selectable="false"/>
    <notification
      v-if="!resultsPending && !hasResults"
      title="no active medical records found"
      description="There were no active medical records that were found for the selected patient. You may return back to the patient result list to select a different patient or begin a different patient search."/>
  </section>
</template>

<script>
  import DataTable from './data-table';
  import Notification from './notification';
  export default {
    name: "PatientRecords",
    components: {
      DataTable,
      Notification,
    },
    props: [
      'records',
      'resultsPending'
    ],
    computed: {
      getPatientListSchema(){
        return [
          {
            key: 'condition',
            type: 'link'
          },
          {
            key: 'onset',
            title: 'onset date'
          },
          {
            key: 'notes',
            title: 'clinical notes'
          }
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
    position: relative;
    max-width: 100%;
    max-height: 100%;
  }
</style>
