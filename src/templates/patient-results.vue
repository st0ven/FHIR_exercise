 <template>
  <section class="patient-results">
    <data-table
      v-if="hasResults"
      v-bind:tableData="patientData"
      v-bind:schema="getPatientListSchema"
      v-bind:selectable="true"
      v-bind:resultsPending="resultsPending"
      v-bind:rowSelected="rowSelected"
      @deselect="handleDeselect"
      @fetchAdditionalResults="handleFetchAdditionalResults"
      @select="handleSelect"
    />
    <notification
      v-if="!resultsPending && !hasResults"
      title="no patient results found"
      description="There were no patients on record that matched your search query. Please refine your search and submit to process another query. Searches are queried against a patient's full name. Regular expression matches are not currently supported."
    />
  </section>
</template>

<script>
  import DataTable from './data-table';
  import Notification from './notification';
  export default {
    name: 'PatientResults',
    components: {
      DataTable,
      Notification,
    },
    props: [
      'patientData',
      'resultsPending',
      'rowSelected'
    ],
    methods: {
      handleDeselect( row, index, e ){
        this.$emit(
          'deselect',
          row,
          index
        );
      },
      handleFetchAdditionalResults( e ){
        this.$emit(
          'fetchAdditionalResults',
          e
        )
      },
      handleSelect( row, index, e ){
        this.$emit(
          'select',
          row,
          index
        );
      },
      handleTableSort( key, e ){
        this.$emit(
          'sort',
          key,
          e
        )
      },
    },
    computed: {
      getPatientListSchema(){
        return [
          {
            key: 'family',
            title: 'last name'
          },
          {
            key: 'given',
            title: 'first name'
          },
          {
            key: 'middle name'
          },
          {
            key: 'gender'
          },
          {
            key: 'age'
          }
        ]
      },
      hasResults(){
        return Boolean( this.patientData.length );
      },
    },
  };
</script>

<style>
  .patient-results {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    box-sizing: border-box;
    position: relative;
    max-width: 100%;
    max-height: 100%;
  }
</style>
