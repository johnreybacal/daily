<template>
  <v-container class="remove-padding-on-s">
    <v-row justify="center" class="mt-5 mb-5 remove-margin-on-s">
      <v-col sm="12" md="8">
        <v-card>
          <v-card-title>
            activities
          </v-card-title>
          <v-card-actions>
            <v-btn
              prepend-icon="mdi-plus"
              @click="onAddActivity()"
            >
              Add Activity
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <p class="subheading">
              {{ activities.length === 0 ? "You have nothing to do" : "Things to do:" }}
            </p>
            <ActivityListItem
              :activities="activities"
              :isEditable="true"
              :onEditActivity="onEditActivity"
              :onRemoveActivity="onRemoveActivity"
            >
            </ActivityListItem>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="4">
        <v-card>
          <v-card-title>
            done
          </v-card-title>
          <v-card-text>
            <p class="subheading">
              {{ completedActivities.length === 0 ? "You have done anything yet" : "Activities completed:" }}
            </p>
            <ActivityListItem
              :activities="completedActivities"
              :isEditable="false"
            >
            </ActivityListItem>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <ActivityForm
    :value="showActivityForm"
    :isEdit="showEditForm"
    :activity="selectedActivity"
    :onClose="onCloseActivityForm"
  ></ActivityForm>
</template>

<script lang="ts">
import Activity from '@/types/activity';
import ActivityForm from '@/components/ActivityForm.vue';
import ActivityListItem from '@/components/ActivityListItem.vue';

export default {
  name: 'ActivityList',
  components: {
    ActivityForm,
    ActivityListItem,
  },
  data() {
    return {
      showActivityForm: false,
      showEditForm: false,
      selectedActivity: new Activity(),
      activities: new Array<Activity>(),
    };
  },
  computed: {
    completedActivities() {
      return this.activities.filter((activity) => activity.isDone);
    }
  },
  methods: {
    onAddActivity () {
      this.showEditForm = false;
      this.selectedActivity = new Activity();
      this.showActivityForm = true;
    },
    onEditActivity (index: number) {
      this.showEditForm = true;
      this.selectedActivity = this.activities[index];
      this.showActivityForm = true;
    },
    onRemoveActivity (index: number) {
      this.activities.splice(index, 1);
    },
    onCloseActivityForm (activity: Activity) {
      this.showActivityForm = false;
      
      if (activity) {
        const index = this.activities.map(e => e.id).indexOf(activity.id);
  
        if (index === -1) {
          this.activities.push(activity);
        } else {
          this.activities[index] = activity;
        }
      }
    },
  },
}
</script>

<style>
/* Mobile */
@media screen and (min-width: 1px) and (max-width: 480px) {
  .remove-padding-on-s {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .remove-margin-on-s {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>