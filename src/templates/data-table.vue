<template>
  <section class="data-table">
      <header class="table-head">
        <div class="table-row">
          <span
            class="column column__selectable"
            v-if="selectable"/>
          <span
            class="column-title"
            v-for="key in tableSchema">
            {{ key }}
          </span>
        </div>
      </header>
      <main class="table-body">
        <div
          v-bind:class="getRowClassName( index )"
          v-for="( row, index ) in tableData"
          v-on:click="selectRow( row, index )">
            <input
              class="column column__selectable"
              type="checkbox"
              name="patients"
              value="index"
              v-bind:checked="isRowChecked( index )"
              v-if="selectable" />
            <span
              class="column"
              v-for="key in tableSchema">
                {{ row[key] }}
            </span>
        </div>
      </main>
  </section>
</template>

<script>
  import Button from './button';
  export default {
    name: "DataTable",
    components: {
      Button
    },
    props: [
      "resultsLinks",
      "schema",
      "selectable",
      "tableData"
    ],
    methods: {
      getRowDataAsArray( row ){
        return Object.keys(row)
          .map(
            (key, i) => row[key]
          );
      },
      getRowClassName( index ){
        return `table-row${this.selectable ? ' table-row__selectable' : ''}${this.isRowChecked( index ) ? ' table-row__selected' : ''}`;
      },
      isRowChecked( index ){
        return index === this.selected;
      },
      selectRow( row, index, e ){
        if( this.selectable === true ){
          if( index === this.selected ){
            this.$emit(
              'deselect',
              row,
              index,
              e
            );
            this.selected = -1;
          }
          else {
            // trigger select event to upstream handlers
            this.$emit(
              'select',
              row,
              index,
              e
            );
            this.selected = index;
          }
        }
      },
      sort(){}
    },
    /*updated: function(){
      if( this.resultsLinks.length > 1 ){
        // define headers expected by the endpoint from provided source
        const headers = {
          headers: {
            Accept: 'application/json+fhir'
          }
        };
        fetch(
          this.resultsLinks[1].url,
          headers
        ).then(
          response => console.log(response.json())
        );
      }
    },*/
    computed: {
      tableSchema(){
        return (
          this.schema
          && this.schema instanceof Array
        )
          ? this.schema
          : Object.keys(this.tableData);
      }
    },
    data(){
      return {
        selected: -1
      };
    }
  }
</script>

<style>
  .data-table{
    display: flex;
    flex-direction: column;
    font-size: 16px;
    flex-grow: 1;
    width: 100%;
  }
  .table-head {
    text-transform: capitalize;
    font-weight: 600;
    font-size: 16px;
    font-family: 'Archivo';
  }
  .table-body {
    flex-grow: 1;
    font-weight: 300;
  }
  .table-row{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem 1rem;
    box-sizing: border-box;
    border-radius: .2rem;
    background: rgba(245,253,227,.1);
    margin-bottom: .5rem;
    transition: transform .2s ease;
  }
  .table-head .table-row{
    background: transparent;
    padding-bottom: 0;
  }
  .table-row:last-of-type {
    border: none;
  }
  .table-row__selectable{
    cursor: pointer;
  }
  .table-body .table-row__selectable:hover:not(.table-row__selected){
    background: rgba(245,253,227,.2);
    transform: scale(1.01);
  }
  .table-row__selected{
    background: rgb(87,93,70);
    background: rgb(0,114,123);
    transform: scale(1.02);
  }
  .column,
  .column-title {
    flex-grow: 1;
    width: 100%;
    padding: 0 1.5rem;
    overflow: hidden;
  }
  .column__selectable {
    width: 5rem;
    margin-right: 2rem;
    cursor: inherit;
    display: none;
  }
</style>
