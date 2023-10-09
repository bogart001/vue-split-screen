<!--
 * @Author: fcli
 * @Date: 2023-09-04 10:32:44
 * @LastEditors: fcli
 * @LastEditTime: 2023-10-09 10:54:08
 * @FilePath: /vue-split-screen/src/App.vue
 * @Description: 
-->

<template>
  <div class="content">
    <vue-split-screen></vue-split-screen>
  </div>
</template>

<script setup lang="ts">
import VueSplitScreen from './plugin/index.vue';
component: {
  VueSplitScreen
}


</script>

<style scoped>
.content {
  background: #fff;
  overflow: hidden;

  .li {
    height: 32px;
    line-height: 32px;
    color: #000;
    font-size: 14px;
  }
}
</style>
