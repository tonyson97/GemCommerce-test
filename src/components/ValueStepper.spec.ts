import { mount } from '@vue/test-utils'
import ValueStepper from './ValueStepper.vue'

describe('ValueStepper', () => {
  it('increments and decrements value', async () => {
    // Mount với giá trị ban đầu là 1, đơn vị %
    const wrapper = mount(ValueStepper, {
      props: { modelValue: 1, unit: '%' }
    })
    const buttons = wrapper.findAll('.value-stepper button')
    // Click nút +
    await buttons[1].trigger('click')
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(2)
    await wrapper.setProps({ modelValue: 2 })
    // Click nút -
    await buttons[0].trigger('click')
    expect(wrapper.emitted()['update:modelValue'][1][0]).toBe(1)
  })

  it('disables decrement at 0', () => {
    // Mount với giá trị 0
    const wrapper = mount(ValueStepper, {
      props: { modelValue: 0, unit: '%' }
    })
    const buttons = wrapper.findAll('.value-stepper button')
    // Nút - phải bị disable
    expect(buttons[0].attributes().disabled).toBeDefined()
  })

  it('disables increment at 100 with %', () => {
    // Mount với giá trị 100 và đơn vị %
    const wrapper = mount(ValueStepper, {
      props: { modelValue: 100, unit: '%' }
    })
    const buttons = wrapper.findAll('.value-stepper button')
    // Nút + phải bị disable
    expect(buttons[1].attributes().disabled).toBeDefined()
  })

  it('sanitizes input: comma, letters, leading letter', async () => {
    // Mount với giá trị 1
    const wrapper = mount(ValueStepper, {
      props: { modelValue: 1, unit: '%' }
    })
    const input = wrapper.find('input')
    // Nhập 12,3 -> phải chuyển thành 12.3
    await input.setValue('12,3')
    await input.trigger('input')
    await new Promise(r => setTimeout(r, 350))
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(12.3)
    await wrapper.setProps({ modelValue: 12.3 })
    // Nhập 123a -> phải chuyển thành 123
    await input.setValue('123a')
    await input.trigger('input')
    await new Promise(r => setTimeout(r, 350))
    expect(wrapper.emitted()['update:modelValue'][1][0]).toBe(123)
    await wrapper.setProps({ modelValue: 123 })
    // Nhập a123 -> phải chuyển thành 100 (trigger blur để cập nhật)
    await input.setValue('a123')
    await input.trigger('blur')
    await wrapper.setProps({ modelValue: 100 })
    await wrapper.vm.$nextTick()
    expect(input.element.value).toBe('100')
    // Nhập 12a3 -> phải chuyển thành 123 (trigger blur để cập nhật)
    await input.setValue('12a3')
    await input.trigger('blur')
    await wrapper.setProps({ modelValue: 123 })
    await wrapper.vm.$nextTick()
    expect(input.element.value).toBe('123')
    // Nhập 1.2.3 -> phải chuyển thành 1.23
    await input.setValue('1.2.3')
    await input.trigger('input')
    await new Promise(r => setTimeout(r, 350))
    expect(wrapper.emitted()['update:modelValue'][4][0]).toBe(1.23)
  })

  it('input < 0 blur về 0', async () => {
    // Mount với giá trị 1
    const wrapper = mount(ValueStepper, {
      props: { modelValue: 1, unit: '%' }
    })
    const input = wrapper.find('input')
    // Nhập -5
    await input.setValue('-5')
    await input.trigger('blur')
    // Cập nhật lại prop modelValue để đồng bộ với displayValue
    await wrapper.setProps({ modelValue: 0 })
    expect(input.element.value).toBe('0')
  })

  it('input > 100 với % blur revert về giá trị hợp lệ trước', async () => {
    // Mount với giá trị 50
    const wrapper = mount(ValueStepper, {
      props: { modelValue: 50, unit: '%' }
    })
    const input = wrapper.find('input')
    // Nhập 120
    await input.setValue('120')
    await input.trigger('blur')
    await wrapper.setProps({ modelValue: 50 })
    expect(input.element.value).toBe('50')
  })
}) 