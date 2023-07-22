<template>
  <v-card
    :variant="isSelected ? 'outlined' : 'elevated'"
  >
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle>
      {{ subtitle }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        variant="text"
        @click="onSelect(value)"
      >
        Select
      </v-btn>
      <v-spacer ></v-spacer>
      <v-btn
        v-if="description"
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        size="x-small"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition v-if="description">
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script lang="ts">
export default {
  name: 'PersistenceItem',
  props: {
    value: {
      type: String,
      required: true
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    isSelected: {
      type: Boolean
    },
    onSelect: {
      type: Function,
      required: true
    },
  },
  data: () => ({
    show: false,
  }),
};
</script>
