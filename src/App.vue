<script setup lang="ts">
import Datatable from './components/Datatable.vue'
import { IDatatableColumn, IDatatableRow } from "./components/types";
import { ref } from "vue";

const datatableColumns = ref<IDatatableColumn[]>([
  { key: 'select', title: 'Select', config: { type: 'checkbox', align: 'left', freeze: true, hidden: false, width: 120 }},
  { key: 'id', title: 'Id', config: { type: 'numeric', align: 'left', freeze: false, hidden: true, width: 120 }},
  { key: 'account', title: 'Account', config: { type: 'text-short', align: 'left', freeze: false, hidden: false, width: 120 }},
  { key: 'name', title: 'Name', config: { type: 'text-short', align: 'left', freeze: false, hidden: false, width: 120 }},
  { key: 'city', title: 'City', config: { type: 'text-short', align: 'left', freeze: false, hidden: false, width: 120 }},
  { key: 'country', title: 'Country', config: { type: 'text-short', align: 'left', freeze: false, hidden: false, width: 120 }},
  { key: 'position', title: 'Position', config: { type: 'text-short', align: 'left', freeze: false, hidden: false, width: 120 }},
]);

const datatableRows = ref<IDatatableRow[]>([
  { selected: false, id: '1', account: 'account 1', name: 'John Kovalski', city: 'Warsaw', country: 'Poland', position: 'CEO' },
  { selected: false, id: '2', account: 'account 1', name: 'John Kovalski', city: 'Warsaw', country: 'Poland', position: 'CEO' },
  { selected: false, id: '3', account: 'account 1', name: 'John Kovalski', city: 'Warsaw', country: 'Poland', position: 'CEO' },
])
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Datatable
    title="Hello Grid Datatable"
    :columns="datatableColumns"
    :rows="datatableRows"
  />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0 15px;
}
</style>
