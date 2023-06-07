import TsMediaLibraryComponnet from '/src/components/TsMediaLibrary.ce.vue';
import { expect, test } from 'vitest';
import {mount, shallowMount} from "@vue/test-utils";

test('it should work', () => {
  // console.log(TsMediaLibraryComponnet);
  const wrapper = mount(TsMediaLibraryComponnet, {
    props: {
     url: 'http://test.dev',
     label: 'Test Label'
    }
  })

  // assert output
  // console.log(wrapper);
  expect(wrapper.text()).toContain('Test Label');
})