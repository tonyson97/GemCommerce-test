<template>
  <UnitValueInput />
</template>

<script lang="ts" setup>
import UnitValueInput from './components/UnitValueInput.vue';
</script>

<style scoped>
.unit-value-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #18191c;
  padding: 24px;
  border-radius: 8px;
  width: 320px;
  margin: 40px auto;
}
</style>