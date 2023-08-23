<template>
  <v-text-field
    placeholder="Filter"
    variant="underlined"
    prepend-icon="mdi-filter-outline"
    id="filter"
  ></v-text-field>
  <v-menu
    :close-on-content-click="false"
    location="bottom"
    activator="#filter"
  >
    <v-card min-width="300">
      <v-card-text>
        <v-checkbox label="Completed Activities"></v-checkbox>
        <v-select
          v-model="selectedQualities"
          :items="qualities"
          label="Filter by quality"
          variant="underlined"
          multiple
          chips
        ></v-select>
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