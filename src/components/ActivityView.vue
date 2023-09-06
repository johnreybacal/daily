<template>
  <v-container class="remove-padding-on-s">
    <v-row justify="center" class="mt-5 mb-5 remove-margin-on-s">
      <v-col cols="12" sm="12" md="8">
        <v-card :loading="isLoading && !showActivityForm && !showDeleteConfirm">
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="red"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-row align="center" justify="space-between">
            <v-col>
              <v-card-title>
                activities
              </v-card-title>
            </v-col>
            <v-col>
              <div class="d-flex justify-end">
                <v-card-actions>
                  <v-btn
                    prepend-icon="mdi-plus"
                    variant="outlined"
                    class="mr-2"
                    @click="onAddActivity()"
                    >
                    Add Activity
                  </v-btn>
                </v-card-actions>
              </div>
            </v-col>
          </v-row>
          <v-card-text>
            <v-row align="center" justify="space-between">
              <v-col>
                <p class="subheading">
                  {{ activities.length === 0 
                    ? "You have nothing to do"
                    : (filteredActivities.length != activities.length)
                      ? `Showing ${filteredActivities.length} of ${activities.length} activities:`
                      : "Things to do:"
                  }}
                </p>
              </v-col>
              <v-spacer></v-spacer>
              <v-col>
                <div
                  v-if="activities.length > 0"
                  class="d-flex justify-end"
                >
                  <ActivityFilter
                    :on-filter="onFilter"
                  ></ActivityFilter>
                </div>
              </v-col>
            </v-row>
            <ActivityList
              :activities="filteredActivities"
              :isEditable="true"
              :onEditActivity="onEditActivity"
              :onRemoveActivity="onRemoveActivity"
            >
            </ActivityList>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-title>
            done
          </v-card-title>
          <v-card-text>
            <p class="subheading">
              {{ completedActivities.length === 0 ? "You haven’t done anything yet" : "Activities completed:" }}
            </p>
            <ActivityList
              :activities="completedActivities"
              :isEditable="false"
            >
            </ActivityList>
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
    :is-loading="isLoading"
  ></ActivityForm>
  <ConfirmDialog
    :value="showDeleteConfirm"
    :yes-button-callback="onConfirmRemoveActivity"
    :no-button-callback="() => { showDeleteConfirm = false }"
    :is-loading="isLoading"
  ></ConfirmDialog>
</template>

<script lang="ts">
import Activity from '@/types/activity';
import Quality from '@/types/quality';
import ActivityFilter from '@/components/ActivityFilter.vue';
import ActivityForm from '@/components/ActivityForm.vue';
import ActivityList from '@/components/ActivityList.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import type ActivityService from "@/service/activityService";
import type { PropType } from 'vue'

export default {
  name: 'ActivityView',
  components: {
    ActivityFilter,
    ActivityForm,
    ActivityList,
    ConfirmDialog,
  },
  props: {
    db: {
      type: Object as PropType<ActivityService>,
      required: true,
    }
  },
  data() {
    return {
      showActivityForm: false,
      showEditForm: false,
      showDeleteConfirm: false,
      isLoading: false,
      selectedActivity: new Activity(),
      activities: new Array<Activity>(),
      filter: {
        keyword: '',
        qualities: new Quality(),
        isDone: false
      }
    };
  },
  computed: {
    filteredActivities() {
      return this.activities.filter((activity) => {
        const keywordMatch = this.filter.keyword === ''
          ? true
          : activity.name.toLowerCase().includes(this.filter.keyword.toLowerCase());
        
        const filterQualities = this.filter.qualities;
        let qualityMatch = true;
        if (
          filterQualities.isGoodAt ||
          filterQualities.isLoved ||
          filterQualities.isNeeded ||
          filterQualities.isPaidFor
        ) {
          const activityQualities = activity.qualities;

          qualityMatch =
            (activityQualities.isGoodAt && filterQualities.isGoodAt) ||
            (activityQualities.isLoved && filterQualities.isLoved) ||
            (activityQualities.isNeeded && filterQualities.isNeeded) ||
            (activityQualities.isPaidFor && filterQualities.isPaidFor);
        }
        const completionMatch = this.filter.isDone
          ? activity.isDone
          : true;

        return keywordMatch && qualityMatch && completionMatch;
      });
    },
    completedActivities() {
      return this.activities.filter((activity) => activity.isDone);
    }
  },
  methods: {
    async getActivities () {
      this.isLoading = true;
      const records = await this.db.list();

      records.forEach((record: any) => {
        const activity: Activity = new Activity();

        if (record) {
          activity.id = record.id;
          activity.name = record.name;
          activity.description = record.description;
          activity.isDone = record.isDone;
          activity.qualities = record.qualities;
        }

        this.activities.push(activity);
      });

      this.isLoading = false;
    },
    onFilter (data: any) {
      this.filter = {
        ...data,
        qualities: {
          ...data.qualities
        }
      };
    },
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
      this.selectedActivity = this.activities[index];
      this.showDeleteConfirm = true;
    },
    async onConfirmRemoveActivity () {
      const index = this.activities.map(e => e.id).indexOf(this.selectedActivity.id);
      this.isLoading = true;
      
      await this.db.delete(this.selectedActivity.id!);
      this.showDeleteConfirm = false;
      this.isLoading = false;
      this.activities.splice(index, 1);
    },
    async onCloseActivityForm (activity: Activity) {
      if (activity) {
        this.isLoading = true;
        const index = this.activities.map(e => e.id).indexOf(activity.id);
  
        if (index === -1) {
          this.db.add(activity)

          this.activities.push(activity);
        } else {
          await this.db.update(activity);

          this.activities[index] = activity;
        }

        this.isLoading = false;
      }
      this.showActivityForm = false;
    },
  },
  watch: {
    db(value) {
      console.log(value);
      this.getActivities();
    }
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