import { shallowMount, createLocalVue } from '@vue/test-utils'
import Footer from '../landing/Footer'

const localVue = createLocalVue()

let wrapper = null

beforeEach(() => {
  wrapper = shallowMount(Footer, {
    stubs: {
      NuxtLink: true
    },
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Footer', () => {
  test('mounts properly', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
