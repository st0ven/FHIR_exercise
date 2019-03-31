<template>
  <ul class="progress-list">
    <li
      class="progress-list-item"
      v-for="(icon, index) in icons">
        <img
          v-bind:src="icon"
          v-bind:class="getIconClassName(index)"/>
    </li>
  </ul>
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
  .progress-list{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .progress-list-item{
    display: inline;
    margin: .66rem 0;
    padding: 0;
    line-height: 0;
  }
  .progress-list-item:first-of-type {
    margin-top: 0;
  }
  .progress-list-item:last-of-type {
    margin-bottom: 0;
  }
  .progress-icon{
    margin: 0;
    padding: 0;
    opacity: .2;
    transition-property: opacity, transform;
    transition-timing-function: ease;
    transition-duration: .25s;
  }
  .progress-icon__active{
    opacity: 1;

  }
</style>
