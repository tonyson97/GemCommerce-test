<template>
  <div class="value-stepper" @mousedown="removeFocus">
    <button
      @click="decrement"
      :disabled="isMin"
      :class="{ pressed: pressedBtn === '-' }"
      @mousedown="pressedBtn = '-'"
      @mouseup="pressedBtn = ''"
      @mouseleave="pressedBtn = ''"
      aria-label="Giảm giá trị"
    >-</button>
    <input
      ref="inputRef"
      :value="displayValue"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      @keydown.up.prevent="increment"
      @keydown.down.prevent="decrement"
      :class="{ shake: shake }"
      placeholder="Nhập giá trị"
      aria-label="Giá trị đơn vị"
      tabindex="0"
    />
    <button
      @click="increment"
      :disabled="isMax"
      :class="{ pressed: pressedBtn === '+' }"
      @mousedown="pressedBtn = '+'"
      @mouseup="pressedBtn = ''"
      @mouseleave="pressedBtn = ''"
      aria-label="Tăng giá trị"
    >+</button>
    <transition name="fade">
      <div v-if="errorMsg" class="error-tooltip">{{ errorMsg }}</div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, nextTick } from 'vue';

const props = defineProps<{
  modelValue: number,
  unit: '%' | 'px'
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>();

const displayValue = ref(props.modelValue.toString());
const errorMsg = ref('');
const shake = ref(false);
const pressedBtn = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

// Custom debounce function
let debounceTimer: number | null = null;
function debounce(fn: Function, delay: number) {
  return function(...args: any[]) {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
}

// Debounce emit để tránh emit quá nhiều lần
const debouncedEmit = debounce((val: number) => {
  emit('update:modelValue', val);
}, 300);

watch(() => props.modelValue, (val) => {
  displayValue.value = val.toString();
});

const isMin = computed(() => props.modelValue <= 0);
const isMax = computed(() => props.unit === '%' ? props.modelValue >= 100 : false);

function sanitizeInput(val: string): string {
  // Thay dấu phẩy thành dấu chấm
  let sanitized = val.replace(/,/g, '.');
  // Loại bỏ ký tự không phải số hoặc dấu chấm
  sanitized = sanitized.replace(/[^0-9.]/g, '');
  // Chỉ cho phép 1 dấu chấm, loại bỏ các dấu chấm thừa
  const parts = sanitized.split('.');
  if (parts.length > 2) sanitized = parts[0] + '.' + parts.slice(1).join('');
  // Nếu bắt đầu bằng dấu chấm thì thêm 0 phía trước
  if (sanitized.startsWith('.')) sanitized = '0' + sanitized;
  // Nếu không có số nào thì trả về rỗng
  if (!sanitized.match(/[0-9]/)) sanitized = '';
  return sanitized;
}

function onInput(e: Event) {
  let val = (e.target as HTMLInputElement).value;
  const sanitized = sanitizeInput(val);
  displayValue.value = sanitized;
  const num = parseFloat(sanitized);
  if (!isNaN(num)) debouncedEmit(num);
}

function onBlur() {
  nextTick(() => {
    let sanitized = sanitizeInput(displayValue.value);
    let num = parseFloat(sanitized);
    // Nếu không phải số hoặc < 0 thì về 0
    if (isNaN(num) || num < 0) {
      num = 0;
    }
    // Nếu là % và > 100 thì revert về giá trị hợp lệ trước khi nhập
    if (props.unit === '%' && num > 100) {
      num = props.modelValue > 100 ? 100 : props.modelValue;
    }
    emit('update:modelValue', num);
    // Cập nhật lại displayValue sau khi emit
    displayValue.value = num.toString();
  });
}

function onFocus(e: Event) {
  nextTick(() => {
    (e.target as HTMLInputElement).select();
  });
}

function increment() {
  if (props.unit === '%' && props.modelValue >= 100) return;
  let newVal = parseFloat((props.modelValue + 1).toFixed(2));
  if (props.unit === '%' && newVal > 100) newVal = 100;
  emit('update:modelValue', newVal);
  if (inputRef.value && document.activeElement === inputRef.value) {
    inputRef.value.blur();
  }
}

function decrement() {
  if (props.modelValue <= 0) return;
  let newVal = parseFloat((props.modelValue - 1).toFixed(2));
  if (newVal < 0) newVal = 0;
  emit('update:modelValue', newVal);
  if (inputRef.value && document.activeElement === inputRef.value) {
    inputRef.value.blur();
  }
}

function removeFocus(_e: MouseEvent) {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}
</script>

<style scoped>
.value-stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #232428;
  border-radius: 8px;
  padding: 0 8px;
  gap: 0;
  position: relative;
  width: 100%;
  height: 48px;
  justify-content: space-between;
}
.value-stepper button,
.value-stepper input {
  flex-shrink: 0;
}
.value-stepper input {
  margin: 0 8px;
}
.value-stepper button {
  width: 40px;
  height: 48px;
  background: transparent;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 22px;
  cursor: pointer;
  opacity: 0.7;
  transition: background 0.2s, color 0.2s, transform 0.1s;
  will-change: transform;
  padding: 0;
}
.value-stepper button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.value-stepper button.pressed,
.value-stepper button:hover:not(:disabled) {
  background: #35363a;
  opacity: 1;
}
.value-stepper input {
  width: 70px;
  text-align: center;
  background: transparent;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  padding: 8px 0;
  outline: none;
  transition: box-shadow 0.2s, border 0.2s;
}
.value-stepper input:focus {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}
.value-stepper input.shake {
  animation: shake 0.3s;
}
@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}
.error-tooltip {
  position: absolute;
  left: 50%;
  bottom: -40px;
  transform: translateX(-50%);
  background: #18191c;
  color: #fff;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 2;
  box-shadow: 0 2px 8px #0002;
  margin-top: 8px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.value-stepper button:focus,
.value-stepper button:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}
</style>