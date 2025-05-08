<template>
  <div class="unit-value-block">
    <div class="unit-value-row">
      <div class="unit-value-line">
        <div class="unit-label">Unit</div>
        <UnitSwitcher v-model="unit" />
      </div>
      <div class="unit-value-line ">
        <div class="unit-label">Value</div>
        <div class="unit-value-line-content">
          <ValueStepper v-model="value" :unit="unit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import UnitSwitcher from './UnitSwitcher.vue';
import ValueStepper from './ValueStepper.vue';

// State đơn vị và giá trị
const unit = ref<'%' | 'px'>('%');
const value = ref<number>(1);

// Nếu chuyển từ px sang % và value > 100 thì set về 100
watch(unit, (newUnit) => {
  if (newUnit === '%' && value.value > 100) {
    value.value = 100;
  }
});
</script>

<style scoped>
.unit-value-block {
  background: #18191c;
  border-radius: 12px;
  padding: 32px 32px 24px 32px;
  width: 400px;
  margin: 32px 0;
}
.unit-value-row {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.unit-value-line {
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 48px;
}
.unit-value-line-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.value-stepper {
  margin: 0 auto;
}

.unit-label {
  color: #bdbdbd;
  font-size: 15px;
  width: 60px;
  text-align: left;
  line-height: 48px;
  height: 48px;
  display: flex;
  align-items: center;
}
.unit-value-line > *:last-child {
  flex: 1;
  display: flex;
  align-items: center;
}

@media (max-width: 600px) {
  .unit-value-block {
    width: 100%;
    min-width: 0;
    padding: 16px 8px 12px 8px;
    margin: 16px 0;
    box-sizing: border-box;
  }
  .unit-value-line {
    gap: 8px;
    min-height: 40px;
  }
  .unit-label {
    font-size: 13px;
    width: 48px;
    line-height: 40px;
    height: 40px;
  }
}
</style> 