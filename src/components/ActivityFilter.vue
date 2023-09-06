<template>
  <v-menu
    :close-on-content-click="false"
    location="end"
    v-model="showMenu"
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
        filter
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="data.keyword"
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
        <v-checkbox
          label="Show only completed"
          v-model="data.isDone"
        ></v-checkbox>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          variant="text"
          @click="onClearFilter"
        >
          Clear Filter
        </v-btn>
        <v-btn
          color="primary"
          variant="text"
          @click="onApplyFilter"
        >
          Apply Filter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Quality from '@/types/quality';

export default {
  name: 'ActivityFilter',
  props: {
    onFilter: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
      showMenu: false,
      data: {
        keyword: '',
        qualities: new Quality(),
        isDone: false
      },
      qualities: [
        'What I’m good at',
        'What I love',
        'What I can be paid for',
        'What the world needs',
      ],
    }
  },
  methods: {
    onClearFilter() {
      this.selectedQualities = [];
      this.data.keyword = '';
      this.data.isDone = false;

      this.onFilter(this.data);
      this.showMenu = false;
    },
    onApplyFilter() {
      this.onFilter(this.data);
      this.showMenu = false;
    }
  },
  computed: {
    selectedQualities: {
      get() {
        const qualities: string[] = [];

        if (this.data.qualities.isGoodAt) {
          qualities.push(this.qualities[0]);
        }
        if (this.data.qualities.isLoved) {
          qualities.push(this.qualities[1]);
        }
        if (this.data.qualities.isPaidFor) {
          qualities.push(this.qualities[2]);
        }
        if (this.data.qualities.isNeeded) {
          qualities.push(this.qualities[3]);
        }

        return qualities;
      },
      set(qualities: string[]) {
        this.data.qualities.isGoodAt = qualities.includes(this.qualities[0]);
        this.data.qualities.isLoved = qualities.includes(this.qualities[1]);
        this.data.qualities.isPaidFor = qualities.includes(this.qualities[2]);
        this.data.qualities.isNeeded = qualities.includes(this.qualities[3]);
      }
    }
  },
}

</script>