<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-bottom-transition"
    max-width="300px"
  >
    <v-card :loading="isLoading">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="red"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          @click="onNo"
        >
          {{ noButtonLabel }}
        </v-btn>
        <v-btn
          variant="outlined"
          @click="onYes"
        >
          {{ yesButtonLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
export default {
  name: 'ConfirmDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'confirmation',
    },
    message: {
      type: String,
      default: 'Are you sure?',
    },
    yesButtonLabel: {
      type: String,
      default: 'Yes',
    },
    noButtonLabel: {
      type: String,
      default: 'No',
    },
    yesButtonCallback: {
      type: Function,
      required: true
    },
    noButtonCallback: {
      type: Function,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    onYes() {
      console.log(this.yesButtonCallback)
      if (this.yesButtonCallback) {
        this.yesButtonCallback();
      }
    },
    onNo() {
      if (this.noButtonCallback) {
        this.noButtonCallback();
      }
    }
  },
  watch: {
    value(value: boolean) {
      this.showDialog = value;
    }
  }
}
</script>