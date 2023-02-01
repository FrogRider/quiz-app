<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <button @click="increment">{{ count }}</button>
  </div>
</template>

<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-undef -->

<script setup>

const count = ref(0);

const increment = () => {
  count.value += 1;
}
</script>

<style scoped>
</style>