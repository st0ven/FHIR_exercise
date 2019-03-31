<template>
  <section class="data-table">
      <header class="table-head">
        <div class="table-row">
          <span
            class="column column__selectable"
            v-if="selectable"
          />
          <span
            class="column-title"
            v-for="item in tableSchema"
          >
            {{ item.title || item.key }}
          </span>
        </div>
      </header>
      <main class="table-body">
        <div
          v-bind:class="getRowClassName( index )"
          v-for="( row, index ) in tableData"
          v-on:click="selectRow( row, index )"
        >
          <input
            class="column column__selectable"
            type="checkbox"
            name="patients"
            value="index"
            v-bind:checked="isRowChecked( index )"
            v-if="selectable" 
          />
          <aside
            class="column"
            v-for="item in tableSchema"
          >
            <a 
              class="data-link"
              v-if="( item.type === 'link' )"
              v-bind:href="(row[item.key].link)"
              target="tab"
            >
              {{ row[item.key].value }}
            </a>
            <span v-else>
              {{ row[item.key] }}
            </span>
          </aside>
        </div>
        <PendingResults 
          v-if="resultsPending"
          @isVisible="handleIsVisible"
        />
      </main>
  </section>
</template>

<script>
  import Button from './button';
  import PendingResults from './pending-results';
  export default {
    name: "DataTable",
    components: {
      Button,
      PendingResults
    },
    props: [
      "rowSelected",
      "schema",
      "selectable",
      "resultsPending",
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
        return `table-row${this.selectable 
          ? ' table-row__selectable' 
          : ''}${this.isRowChecked( index ) 
            ? ' table-row__selected' 
            : ''}`;
      },
      handleIsVisible( e ){
        this.$emit(
          'fetchAdditionalResults',
          e
        )
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
      }
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
        selected: this.rowSelected >= 0
          ? this.rowSelected
          : -1
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
    overflow: hidden;
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
    overflow-x: hidden;
    overflow-y: auto;
  }
  .table-row{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    line-height: 1.6;
    padding: 1.25rem 1.25rem;
    border-radius: .2rem;
    background: rgba(252,255,216,.1);
    margin-bottom: .5rem;
    transition: all .2s ease;
  }
  .table-head .table-row{
    background: transparent;
    border-color: rgba(252,255,216,.5);
    border-width: 0px;
    border-width: 0;
    border-bottom-width: 1px;
    border-style: solid;
  }
  .table-row__selectable{
    cursor: pointer;
  }
  .table-body .table-row__selectable:hover:not(.table-row__selected){
    background-color: rgba(252,255,216,.25);
    transition: none;
  }
  .table-row__selected{
    background: rgb(0,114,123);
    transition: none;
  }
  .column,
  .column-title {
    flex-grow: 1;
    width: 100%;
    padding: 0 1.5rem;
    overflow: hidden;
  }
  .column-title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  .column-title:after {
    content: '';
    width: 0;
    height: 0;
    display: block;
    justify-self: flex-end;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgb(252,255,216);
    display: none;
  }
  .column__selectable {
    width: 5rem;
    margin-right: 2rem;
    cursor: inherit;
    display: none;
  }
  .data-link {
    text-transform: lowercase;
  }
</style>
