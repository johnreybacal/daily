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
        <ActivityView></ActivityView>
      </v-theme-provider>
    </v-main>

  </v-app>
</template>

<script lang="ts">
import ActivityView from '@/components/ActivityView.vue';

export default {
  components: {
    ActivityView
  },
  data() {
    return {
      showDrawer: false,
      items: [
        {
          title: 'My ikigai',
          value: 'ikigai',
        },
        {
          title: 'Activities',
          value: 'activities',
        },
      ],

    };
  },
};
</script>
