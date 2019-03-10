<template>
  <aside class="progress-wrapper">
    <ul class="progress-list">
      <li
        class="progress-list-item"
        v-for="(icon, index) in icons">
          <img
            v-bind:src="icon"
            v-bind:class="getIconClassName(index)"/>
      </li>
    </ul>
  </aside>
</template>

<script>
  import SearchStepIcon from './../images/search_step.icon.svg';
  import PatientStepIcon from './../images/patient_step.icon.svg';
  import RecordsStepIcon from './../images/records_step.icon.svg';
  export default {
    name: 'ProgressIndicator',
    props: [
      'activeIndex'
    ],
    methods: {
      getIconClassName( index ){
        return `progress-icon${
          index <= this.activeIndex
            ? ' progress-icon__active'
            : ''
        }`;
      }
    },
    data(){
      return {
        icons: [ SearchStepIcon, PatientStepIcon, RecordsStepIcon ]
      }
    }
  }
</script>

<style>
  .progress-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }
  .progress-list{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 1rem;
  }
  .progress-list-item{
    display: inline;
    margin: .66rem 0;
    padding: 0;
    line-height: 0;
  }
  .progress-icon{
    margin: 0;
    padding: 0;
    opacity: .2;
    transition-property: opacity, transform;
    transition-timing-function: ease;
    transition-duraation: .25s;
  }
  .progress-icon__active{
    opacity: 1;
  }
</style>
