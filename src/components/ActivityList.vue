<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="(activity, i) in activities"
        v-bind:key="activity.id"
        :value="isEditable ? activity.id : null"
        style="padding-left: 0px"
      >
        <template v-slot:prepend v-if="isEditable">
          <v-list-item-action start>
            <v-tooltip
              :text="
                activity.isDone
                  ? 'Set this activity as incomplete'
                  : 'Complete this activity'
              "
            >
              <template v-slot:activator="{ props }">
                <v-checkbox-btn
                  v-model="activity.isDone"
                  v-bind="props"
                  @click="onToggleActivity(i)"
                >
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
            style="height: 40px"
            v-if="isSelected && isEditable"
          >
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-pencil"
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
                  style="background-color: #ff8e7e"
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
                  color="#AAD9CD"
                  v-bind="props"
                  v-if="activity.qualities.isGoodAt"
                ></v-icon>
              </template>
            </v-tooltip>
            <v-tooltip text="I love this" location="bottom">
              <template v-slot:activator="{ props }">
                <v-icon
                  icon="mdi-heart"
                  color="#E9BBB5"
                  class="ml-1"
                  v-bind="props"
                  v-if="activity.qualities.isLoved"
                ></v-icon>
              </template>
            </v-tooltip>
            <v-tooltip text="I can be paid for this" location="bottom">
              <template v-slot:activator="{ props }">
                <v-icon
                  icon="mdi-cash"
                  color="#8DA47E"
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
                  color="#938F43"
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
</template>

<script lang="ts">
import Activity from "@/types/activity";

export default {
  name: "ActivityList",
  props: {
    activities: {
      type: Array<Activity>,
      required: true,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
    onEditActivity: {
      type: Function,
      default: () => {},
    },
    onRemoveActivity: {
      type: Function,
      default: () => {},
    },
    onToggleActivity: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
