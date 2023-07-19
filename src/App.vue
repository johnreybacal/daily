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
                <v-card-title>daily</v-card-title>
                <v-card-subtitle>{{ day }}, {{ date }}{{ ord }} {{ year }}</v-card-subtitle>
                <v-card-text>
                  <p class="text-right">
                    <b>{{ activities.length }}</b> Tasks
                  </p>
                  <v-text-field
                    v-model="newTodo"
                    id="newTodo"
                    name="newTodo"
                    label="Type your task"
                    @keyup.enter="addTodo"
                    :hint="todoExists"
                    persistent-hint
                  />
                  <v-btn
                    fab
                    ripple
                    small
                    color="primary"
                    icon="mdi-plus"
                    size="x-small"
                    @click="onAddActivity()"
                  >
                  </v-btn>

                  <p class="subheading">
                    {{ activities.length === 0 ? "You have 0 Tasks, add some" : "Your Tasks" }}
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
                          <v-btn
                            fab
                            ripple
                            small
                            color="red"
                            icon="mdi-close"
                            size="x-small"
                            v-if="isSelected"
                            @click="removeTodo(i)"
                          >
                          </v-btn>
                          <v-btn
                            fab
                            ripple
                            small
                            icon="mdi-circle-edit-outline"
                            size="x-small"
                            v-if="isSelected"
                            @click="onEditActivity(i)"
                          >
                          </v-btn>
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
      newTodo: "",
      activities: new Array<Activity>(),
      day: this.todoDay(),
      date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear(),
      isTodoExist: false,
      items: [
        {
          title: 'Tasks',
          value: 'tasks',
        },
      ],

    };
  },

  computed: {
    todoExists() {
      return this.isTodoExist
        ? "todo is already in the list add another one"
        : "";
    },
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
      console.log(this.selectedActivity)
      this.showActivityForm = true;
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

    addTodo() {
      this.isTodoExist = false;
      const value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      const isTodoExists = this.activities.find(
        (todo: Activity) => todo.name === value
      );
      if (!isTodoExists) {
        const activity: Activity = new Activity();
        activity.name = this.newTodo;
        activity.description = `Added on: ${this.date} ${this.ord} ${this.day} ${this.year}`
        
        this.activities.push(activity);

        this.newTodo = "";
      }
      if (isTodoExists) {
        this.isTodoExist = true;
      }
    },

    removeTodo(index: number) {
      this.activities.splice(index, 1);
    },

    todoDay() {
      const d = new Date();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[d.getDay()];
    },

    nth(d: number) {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    },
  },
};
</script>
