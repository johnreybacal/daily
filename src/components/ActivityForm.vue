<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-bottom-transition"
    persistent
    content-class="v-dialog--custom"
    >
    <v-card>
      <v-card-title>
        {{ isEdit ? 'Edit' : 'New' }} Activity
      </v-card-title>
      <v-card-text>
        <v-form
          v-model="isValid"
          @submit.prevent>
          <v-row>
            <v-text-field
              label="Name"
              name="name"
              v-model="data.name"
              :rules="rules"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-textarea
              label="Description"
              name="description"
              v-model="data.description"
            ></v-textarea>
          </v-row>
          <v-row>
            <v-combobox
              v-model="selectedQualities"
              :items="qualities"
              label="This activity is"
              multiple
              chips
            ></v-combobox>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="onClose()">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="onSave">
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
            ...this.activity
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