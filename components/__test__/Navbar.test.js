import { shallowMount, createLocalVue } from '@vue/test-utils'
import NuxtMq from 'nuxt-mq'
import Navbar from '../navigation/Navbar'

const localVue = createLocalVue()
localVue.use(NuxtMq)

let wrapper = null

beforeEach(() => {
  wrapper = shallowMount(Navbar, {
    mocks: {
      $mq: 'sm'
    },
    stubs: {
      NuxtLink: true
    },
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Navbar', () => {
  test('mounts properly', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('mobileLayout() works properly', () => {
    const div = wrapper.find('.navbar-menu')
    expect(div.classes()).toContain('d-inline-flex')
  })

  it('has computed', () => {
    expect(typeof Navbar.computed).toBe('object')
  })

  it('has methods', () => {
    expect(typeof Navbar.methods).toBe('object')
  })
})
