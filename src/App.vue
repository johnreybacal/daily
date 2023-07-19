<template>
  <v-app>
    <v-app-bar prominent scroll-behavior="collapse">
      <v-app-bar-nav-icon @click="drawer = !drawer">
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
      v-model="drawer"
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
                    <b>{{ todos.length }}</b> Tasks
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
                  <p class="subheading">
                    {{ todos.length === 0 ? "You have 0 Tasks, add some" : "Your Tasks" }}
                  </p>
                  <v-list>
                    <v-list-item-group>
                      <v-list-item
                        v-for="(todo, i) in todos"
                        v-bind:key="todo.name"
                        :value="todo.name"
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
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-theme-provider>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Activity from '@/types/activity';

export default {
  data() {
    return {
      drawer: false,
      show: true,
      newTodo: "",
      todos: new Array<Activity>(),
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
    addTodo() {
      this.isTodoExist = false;
      const value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      const isTodoExists = this.todos.find(
        (todo: Activity) => todo.name === value
      );
      if (!isTodoExists) {
        const activity: Activity = new Activity();
        activity.name = this.newTodo;
        activity.description = `Added on: ${this.date} ${this.ord} ${this.day} ${this.year}`
        
        this.todos.push(activity);

        this.newTodo = "";
      }
      if (isTodoExists) {
        this.isTodoExist = true;
      }
    },

    removeTodo(index: number) {
      this.todos.splice(index, 1);
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
