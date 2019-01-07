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
  .table-head {
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .table-row{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem 1rem;
    font-weight: 400;
    color: #888;
    border-bottom: 1px solid rgba(0,0,0,.05);
    box-sizing: border-box;
    border-radius: .2rem;
  }
  .table-row:last-of-type {
    border: none;
  }
  .table-row__selectable{
    cursor: pointer;
  }
  .table-body .table-row__selectable:hover:not(.table-row__selected){
    background: rgba(0,0,0,.05);
    color: black;
    border-bottom: 1px solid rgba(0,0,0,0);
  }
  .table-row__selected{
    background: #0B80D6;
    color: white;
  }
  .column,
  .column-title {
    flex-grow: 1;
    width: 100%;
  }
  .column-title {
    font-size: 11pt;
    font-weight: 600;
    text-transform: uppercase;
    color: black;
  }
  .column__selectable {
    width: 5rem;
    margin-right: 2rem;
    cursor: inherit;
  }
</style>
