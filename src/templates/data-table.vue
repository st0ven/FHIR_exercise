<template>
  <section class="data-table">
      <header class="table-head">
        <div class="column">
          
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
  export default {
    name: "DataTable",
    props: [
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
          // trigger select event to upstream handlers
          this.$emit(
            'select',
            row, 
            index,
            e
          );
          //
          this.selected = index;
        }
      },
      sort(){}
    },
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
    font-size: 12pt;
    flex-grow: 1;
    width: 100%;
  }
  .table-head,
  .table-body {
    flex-grow: 1;
  }
  .table-row{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem 1rem;
    font-weight: 300;
    border-bottom: 0px solid rgba(0,0,0,.05);
    box-sizing: border-box;
    border-radius: .2rem;
  }
  .table-row__selectable{
    cursor: pointer;
  }
  .table-row__selectable:hover:not(.table-row__selected){
    background: rgba(0,0,0,.05);
  }
  .table-row__selected{
    background: rgb(164,245,230);
  }
  .column {
    flex-grow: 1;
    width: 100%;
  }
  .column__selectable {
    width: auto;
    margin-right: 2rem;
  }
</style>