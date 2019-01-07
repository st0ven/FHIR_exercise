 <template>
  <section class="patient-results">
    <div class="section-inner-wrapper">
      <h3 class="results-title">Patient Search Results</h3>
      <p class="description">
        Select a patient from the list of results in order to view that patient's medical records history.
      </p>
      <data-table
        v-bind:tableData="patientData"
        v-bind:schema="getPatientListSchema"
        v-bind:selectable="true"
        @deselect="handleDeselect"
        @select="handleSelect"/>
    </div>
  </section>
</template>

<script>
  import DataTable from './data-table';
  export default {
    name: 'PatientResults',
    components: {
      DataTable
    },
    props: [
      'patientData',
    ],
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
          'name',
          'gender',
          'age'
        ]
      },
    },
  };
</script>

<style>
  .patient-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding: 3rem 4rem 8rem;
    box-sizing: border-box;
  }
  .patient-results .results-title {
    font-family: 'Source Sans Pro';
    font-size: 16pt;
    margin-bottom: 2rem;
  }
  .patient-results .description {
    margin-bottom: 2rem;
    font-weight: 300;
    font-size: 11pt;
    line-height: 1.8;
    display: none;
  }
  .sticky__bottom {
    position: fixed;
    bottom: 0;
  }
  .justify-end {
    display: flex;
    justify-content: flex-end;
  }
</style>
