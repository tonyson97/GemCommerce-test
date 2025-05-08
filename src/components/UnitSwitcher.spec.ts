import { mount } from '@vue/test-utils'
import UnitSwitcher from './UnitSwitcher.vue'

describe('UnitSwitcher', () => {
  it('renders and highlights % as active by default', () => {
    // Mount component với giá trị mặc định là %
    const wrapper = mount(UnitSwitcher, {
      props: { modelValue: '%' }
    })
    // Nút % phải có class active
    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('active')
    expect(buttons[1].classes()).not.toContain('active')
  })

  it('emits update:modelValue khi click px', async () => {
    // Mount component với giá trị mặc định là %
    const wrapper = mount(UnitSwitcher, {
      props: { modelValue: '%' }
    })
    // Click nút px
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    // Kiểm tra emit đúng giá trị px
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['px'])
  })
}) 