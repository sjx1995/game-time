<!--
 * @Description: header
 * @Author: Sunly
 * @Date: 2023-05-21 14:00:42
-->
<template>
  <v-app-bar scroll-behavior="hide" rounded class="header">
    <img src="~/assets/images/logo.png" width="48" height="48" />
    <v-app-bar-title>GAME TIME</v-app-bar-title>
    <v-spacer></v-spacer>

    <a
      class="btn-link"
      href="https://github.com/sjx1995/game-time"
      target="_blank"
    >
      <v-btn class="mr-2" prepend-icon="mdi-github" variant="tonal">
        GITHUB
      </v-btn>
    </a>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.header {
  img {
    margin-left: 16px;
  }
  .btn-link {
    color: #fff;
  }
}
</style>
