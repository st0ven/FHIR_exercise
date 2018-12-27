 <template> 
  <section class="patient-results">
    <div class="section-inner-wrapper">
      <h3>Patient Search Results</h3>
      <data-table 
        v-bind:tableData="patientData"
        v-bind:schema="getPatientListSchema"
        v-bind:selectable="true"
        @select="selectEmitter"/>
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
      selectEmitter(){
        this.$emit( 'select' );
      }
    },
    computed: {
      getPatientListSchema(){
        return [
          'name',
          'gender',
          'birthDate'
        ]
      },
    }
  };
</script>

<style>
  .patient-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 4rem;
    box-sizing: border-box;
  }
</style>