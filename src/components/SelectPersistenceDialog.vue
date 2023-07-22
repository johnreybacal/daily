<template>
  <v-dialog v-model="showDialog" persistent width="auto">
    <v-card>
      <v-card-title>
        data persistence
      </v-card-title>
      <v-card-subtitle>
        Where do you want to store your data?
      </v-card-subtitle>
      <v-card-text>
        <v-container flex>
          <v-row>
            <v-col>
              <PersistenceItem
                title="None"
                subtitle="Don't store your data"
                value="none"
                :on-select="onSelect"
                :is-selected="selectedPersistence === 'none'"
                description="All changes you made won't be persisted"
              >
              </PersistenceItem>
            </v-col>
            <v-col>
              <PersistenceItem
                title="Local Storage"
                subtitle="Store data locally"
                value="localStorage"
                :on-select="onSelect"
                :is-selected="selectedPersistence === 'localStorage'"
              >
              </PersistenceItem>
            </v-col>
            <v-col>
              <PersistenceItem
                title="Firebase"
                subtitle="Store data to firebase server"
                description="Firebase on spark plan hosted by Johnrey Bacal. This app is still in development. Please use it only if you trust the author"
                value="firebase"
                :on-select="onSelect"
                :is-selected="selectedPersistence === 'firebase'"
              >
              </PersistenceItem>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer ></v-spacer>
        <v-btn
          variant="outlined"
          @click="onProceed(selectedPersistence)"
        >
          Proceed
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import PersistenceItem from '@/components/PersistenceItem.vue'

export default {
  name: 'SelectPersistenceDialog',
  components: {
    PersistenceItem
  },
  props: {
    onProceed: {
      type: Function,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      selectedPersistence: 'none'
    };
  },
  computed: {
    showDialog() {
      return this.show;
    }
  },
  methods: {
    onSelect(value: string) {
      this.selectedPersistence = value;
    }
  }
};
</script>
