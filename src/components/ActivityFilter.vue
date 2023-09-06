<template>
  <v-menu
    :close-on-content-click="false"
    location="bottom"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        prepend-icon="mdi-filter-outline"
        variant="outlined"
        v-bind="props"
      >
        Filter
      </v-btn>
    </template>
    <v-card min-width="300">
      <v-card-title>
        Filter
      </v-card-title>
      <v-card-text>
        <v-text-field
          placeholder="Filter by keyword"
          variant="underlined"
          append-icon="mdi-magnify"
          id="filter"
        ></v-text-field>
        <v-select
          v-model="selectedQualities"
          :items="qualities"
          label="Filter by quality"
          variant="underlined"
          multiple
          chips
        ></v-select>
        <v-checkbox label="Filter by completion"></v-checkbox>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          variant="text"
          @click="menu = false"
        >
          Clear Filter
        </v-btn>
        <v-btn
          color="primary"
          variant="text"
          @click="menu = false"
        >
          Apply Filter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">

export default {
  name: 'ActivityFilter',
  data() {
    return {
      menu: false,
      qualities: [
        'What I’m good at',
        'What I love',
        'What I can be paid for',
        'What the world needs',
      ],
      selectedQualities: [] 
    }
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    clearFilter() {
      this.value.keyword = '';
    }
  }
}

</script>