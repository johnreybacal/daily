<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-bottom-transition"
    persistent
    content-class="v-dialog--custom"
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
        {{ isEdit ? 'edit' : 'new' }} activity
      </v-card-title>
      <v-card-text>
        <v-form
          v-model="isValid"
          @submit.prevent
          >
          <v-row>
            <v-col cols="12" :md="isEdit ? '8' : '12'">
              <v-text-field
                label="Name"
                name="name"
                v-model.trim="data.name"
                :rules="rules"
                variant="underlined"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" v-if="isEdit" class="text-right">
              <v-checkbox
                label="Completed"
                v-model="data.isDone"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                label="Description"
                name="description"
                v-model.trim="data.description"
                rows="3"
                variant="underlined"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="selectedQualities"
                :items="qualities"
                label="This activity is"
                variant="underlined"
                multiple
                chips
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="onClose()">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="outlined" @click="onSave">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Activity from '@/types/activity';

export default {
  name: 'ActivityForm',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
    activity: {
      type: Activity,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      data: new Activity(),
      isValid: false,
      rules: [
        (value: string) => {
          if (value) return true

          return 'This field is required.'
        },
      ],
      qualities: [
        'What I’m good at',
        'What I love',
        'What I can be paid for',
        'What the world needs',
      ]
    }
  },
  methods: {
    onSave() {
      if (this.isValid) {
        this.onClose(this.data);
      }
    }
  },
  computed: {
    showDialog() {
      return this.value;
    },
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
  watch: {
    value(show: Boolean) {
      if (show) {
        if (this.isEdit) {
          this.data = {
            ...this.activity,
            qualities: {
              ...this.activity.qualities
            }
          };
        } else {
          this.data = new Activity();
        }
      }
    }
  }
}
</script>
<style>
.v-dialog--custom {
  width: 100% !important;
}

/* Desktop */
@media screen and (min-width: 768px) {
  .v-dialog--custom {
    width: 50% !important;
  }
}
</style>