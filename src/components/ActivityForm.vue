<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEdit ? 'Edit' : 'New' }} Activity</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                label="Name"
                :value="data.name"
                required
                @input="updateValue('name', $event.target.value)"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-textarea
                label="Description"
                :value="data.description"
                @input="updateValue('description', $event.target.value)"
              ></v-textarea>
            </v-row>
            <v-row>
              <v-autocomplete
                :items="qualities"
                :value="data.qualities"
                @input="updateValue('qualities', $event.target.value)"
                chips
                closable-chips
                multiple
                label="This activity is" ></v-autocomplete>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="onClose">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="onSave">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
      qualities: [
        'What I love',
        'What I’m good at',
        'What I can be paid for',
        'What the world needs',
      ]
    }
  },
  methods: {
    updateValue(key, value) {
      this.data = { ...this.data, [key]: value };
    },
    onSave() {
      console.log(this.data);
      this.onClose(this.data);
    }
  },
  computed: {
    showDialog: {
      get () {
        return this.value
      },
      set (obj) {
        this.$emit('input', obj)
      }
    },
  },
  watch: {
    value(show: Boolean) {
      if (show) {
        if (this.isEdit) {
          this.data = this.activity;
        } else {
          this.data = new Activity();
        }
      }
    }
  }
}
</script>