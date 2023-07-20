<template>
  <v-container class="remove-padding-on-s">
    <v-row justify="center" class="mt-5 mb-5 remove-margin-on-s">
      <v-col xs="12" sm="8">
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
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="(activity, i) in activities"
                  v-bind:key="activity.id"
                  :value="activity.id"
                  >
                  <template v-slot:prepend="{ select }">
                    <v-list-item-action start>
                      <v-tooltip
                        :text="activity.isDone
                          ? 'Set this activity as incomplete'
                          : 'Complete this activity'"
                      >
                        <template v-slot:activator="{ props }">
                          <v-checkbox-btn
                            v-model="activity.isDone"
                            v-bind="props"
                            @click="select">
                          </v-checkbox-btn>
                        </template>
                      </v-tooltip>
                    </v-list-item-action>
                  </template>
                  
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ activity.name }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      {{ activity.description }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <template v-slot:append="{ isSelected }">
                    <v-btn-toggle
                      divided
                      variant="outlined"
                      style="height: 40px;"
                      v-if="isSelected"
                    >
                      <v-tooltip text="Edit">
                        <template v-slot:activator="{ props }">
                          <v-btn
                          icon="mdi-circle-edit-outline"
                            size="small"
                            v-bind="props"
                            @click="onEditActivity(i)"
                          >
                          </v-btn>
                        </template>
                      </v-tooltip>
                      
                      <v-tooltip text="Delete">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            icon="mdi-close"
                            size="small"
                            style="background-color: #ff8e7e;"
                            v-bind="props"
                            @click="onRemoveActivity(i)"
                          >
                          </v-btn>
                        </template>
                      </v-tooltip>
                    </v-btn-toggle>
                    <container v-else>
                      <v-tooltip text="I’m good at this" location="bottom">
                        <template v-slot:activator="{ props }">
                          <v-icon
                            icon="mdi-thumb-up"
                            color="blue"
                            v-bind="props"
                            v-if="activity.qualities.isGoodAt"
                          ></v-icon>
                        </template>
                      </v-tooltip>
                      <v-tooltip text="I love this" location="bottom">
                        <template v-slot:activator="{ props }">
                          <v-icon
                            icon="mdi-heart"
                            color="red"
                            class="ml-1"
                            v-bind="props"
                            v-if="activity.qualities.isLoved"
                          ></v-icon>
                        </template>
                      </v-tooltip>
                      <v-tooltip text="I can be paid for this" location="bottom">
                        <template v-slot:activator="{ props }">
                          <v-icon
                            icon="mdi-cash-multiple"
                            class="ml-1"
                            v-bind="props"
                            v-if="activity.qualities.isPaidFor"
                          ></v-icon>
                        </template>
                      </v-tooltip>
                      <v-tooltip text="The world needs this" location="bottom">
                        <template v-slot:activator="{ props }">
                          <v-icon
                            icon="mdi-earth"
                            color="green"
                            class="ml-1"
                            v-bind="props"
                            v-if="activity.qualities.isNeeded"
                          >
                          </v-icon>
                        </template>
                      </v-tooltip>
                    </container>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
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

export default {
  name: 'ActivityList',
  components: {
    ActivityForm
  },
  data() {
    return {
      showActivityForm: false,
      showEditForm: false,
      selectedActivity: new Activity(),
      activities: new Array<Activity>(),
    };
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