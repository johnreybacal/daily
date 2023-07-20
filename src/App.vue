<template>
  <v-app>
    <v-app-bar prominent scroll-behavior="collapse">
      <v-app-bar-nav-icon @click="showDrawer = !showDrawer">
        <v-avatar :tile="true">
          <v-img src="/daily/sun.png" alt="logo" />
        </v-avatar>
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        <text style="color: #eb2626;">d&nbsp;a&nbsp;</text>
        <text style="color: #e58733;">i&nbsp;l&nbsp;y</text>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="showDrawer"
      temporary
    >
      <v-list
        :items="items"
      ></v-list>
    </v-navigation-drawer>

    <v-main>
      <v-theme-provider root>
        <v-container>
          <v-row justify="center" class="ma-5">
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
                        v-for="(todo, i) in activities"
                        v-bind:key="todo.id"
                        :value="todo.id"
                        >
                        <template v-slot:prepend="{ select }">
                          <v-list-item-action start>
                            <v-checkbox-btn v-model="todo.isDone" @click="select" ></v-checkbox-btn>
                          </v-list-item-action>
                        </template>
                        
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ todo.name }}
                          </v-list-item-title>
    
                          <v-list-item-subtitle>
                            {{ todo.description }}
                          </v-list-item-subtitle>
                        </v-list-item-content>

                        <template v-slot:append="{ isSelected }">
                          <v-btn-toggle
                            divided
                            variant="outlined"
                            v-if="isSelected"
                          >
                            <v-btn
                              color="red"
                              icon="mdi-close"
                              size="small"
                              @click="onRemoveActivity(i)"
                            >
                            </v-btn>
                            <v-btn
                              icon="mdi-circle-edit-outline"
                              size="small"
                              @click="onEditActivity(i)"
                            >
                            </v-btn>
                          </v-btn-toggle>
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
      </v-theme-provider>
    </v-main>

  </v-app>
</template>

<script lang="ts">
import Activity from '@/types/activity';
import ActivityForm from '@/components/ActivityForm.vue';

export default {
  components: {
    ActivityForm
  },
  data() {
    return {
      showDrawer: false,
      showActivityForm: false,
      showEditForm: false,
      selectedActivity: new Activity(),
      activities: new Array<Activity>(),
      items: [
        {
          title: 'Tasks',
          value: 'tasks',
        },
      ],

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
};
</script>
