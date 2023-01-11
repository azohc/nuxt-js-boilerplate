<template>
  <div>
    <div class="flex justify-around h-32">
      <img src="/img/fl.png" />
    </div>
    <DefaultHeader />
    <!-- if using app.vue (as single, default layout):
    use NuxtPage instead of slot -->
    <!-- <NuxtPage /> -->
    <!-- in layouts/default.vue, use slot instead of NuxtPage -->
    <slot></slot>
    <DefaultFooter />
  </div>
</template>
