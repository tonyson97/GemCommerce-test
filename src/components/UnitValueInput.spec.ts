import { mount } from '@vue/test-utils'
import UnitValueInput from './UnitValueInput.vue'

describe('UnitValueInput', () => {
  it('renders with default unit % and value 1', () => {
    // Mount component cha
    const wrapper = mount(UnitValueInput)
    // Kiểm tra có UnitSwitcher và ValueStepper
    expect(wrapper.findComponent({ name: 'UnitSwitcher' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ValueStepper' }).exists()).toBe(true)
    // Kiểm tra giá trị mặc định
    expect(wrapper.html()).toContain('%')
    expect(wrapper.html()).toContain('1')
  })

  it('auto set value về 100 khi chuyển từ px sang % và value > 100', async () => {
    // Mount và set value lớn hơn 100, unit là px
    const wrapper = mount(UnitValueInput)
    // Đổi unit sang px
    await wrapper.findAll('button')[1].trigger('click')
    // Set value lớn hơn 100 qua stepper
    await wrapper.findComponent({ name: 'ValueStepper' }).vm.$emit('update:modelValue', 120)
    // Đổi lại unit sang %
    await wrapper.findAll('button')[0].trigger('click')
    // Giá trị phải tự động về 100
    expect(wrapper.find('input').element.value).toBe('100')
  })

  it('input < 0 blur về 0', async () => {
    // Mount component cha
    const wrapper = mount(UnitValueInput)
    const input = wrapper.find('input')
    // Nhập -5
    await input.setValue('-5')
    await input.trigger('blur')
    // Simulate v-model update from parent
    const stepper = wrapper.findComponent({ name: 'ValueStepper' })
    stepper.vm.$emit('update:modelValue', 0)
    await wrapper.vm.$nextTick()
    // Giá trị phải về 0
    expect(input.element.value).toBe('0')
  })
}) 