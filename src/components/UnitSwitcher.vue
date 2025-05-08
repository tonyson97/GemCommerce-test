<template>
  <!-- Đổi đơn vị giữa % và px -->
  <div class="unit-switch">
    <button
      :class="{ active: modelValue === '%' }"
      @click="$emit('update:modelValue', '%')"
      aria-label="Chọn đơn vị phần trăm"
    >%</button>
    <button
      :class="{ active: modelValue === 'px' }"
      @click="$emit('update:modelValue', 'px')"
      aria-label="Chọn đơn vị pixel"
    >px</button>
  </div>
</template>

<script lang="ts" setup>
// Nhận props modelValue để xác định đơn vị hiện tại
// Phát emit update:modelValue khi người dùng chọn đơn vị mới

defineProps<{
  modelValue: '%' | 'px'
}>();
defineEmits<{
  (e: 'update:modelValue', value: '%' | 'px'): void
}>();
</script>

<style scoped>
.unit-switch {
  display: flex;
  gap: 0;
  background: #232428;
  border-radius: 8px;
  overflow: hidden;
}
.unit-switch button {
  flex: 1;
  padding: 12px 0;
  background: transparent;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.7;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.1s;
  will-change: transform;
}
.unit-switch button.active {
  background: #35363a;
  color: #fff;
  opacity: 1;
}
.unit-switch button:hover:not(.active) {
  background: #35363a;
  opacity: 0.9;
}
.unit-switch button:focus,
.unit-switch button:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}
</style> 