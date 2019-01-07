<template>
  <section class="patient-records">
    <data-table
      v-bind:tableData="records"
      v-bind:schema="getPatientListSchema"
      v-bind:selectable="false"/>
  </section>
</template>

<script>
  import DataTable from './data-table';
  export default {
    name: "PatientRecords",
    components: {
      DataTable
    },
    props: [
      'records'
    ],
    computed: {
      getPatientListSchema(){
        return [
          'condition',
          'onset',
          'notes'
        ]
      },
    },
  }
</script>

<style>

</style>
