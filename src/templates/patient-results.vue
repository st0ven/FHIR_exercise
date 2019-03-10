 <template>
  <section class="patient-results">
    <results-heading title="Patient Search Results"/>
    <data-table
      v-if="hasResults"
      v-bind:tableData="patientData"
      v-bind:schema="getPatientListSchema"
      v-bind:selectable="true"
      v-bind:resultsLinks="resultsLinks"
      @deselect="handleDeselect"
      @select="handleSelect"/>
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
    name: 'PatientResults',
    components: {
      DataTable,
      Loader,
      Notification,
      ResultsHeading
    },
    props: [
      'patientData',
      'resultsLinks',
      'resultsPending'
    ],
    updated: function(){
      console.log(this.resultsPending, this.hasResults);
    },
    methods: {
      handleDeselect( row, index, e ){
        this.$emit(
          'deselect',
          row,
          index
        );
      },
      handleSelect( row, index, e ){
        this.$emit(
          'select',
          row,
          index
        );
      }
    },
    computed: {
      getPatientListSchema(){
        return [
          'last name',
          'first name',
          'middle name',
          'gender',
          'age'
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
  }
</style>
