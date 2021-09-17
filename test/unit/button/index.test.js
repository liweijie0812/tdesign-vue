import { mount } from '@vue/test-utils';
import Button from '@/src/button/index.ts';

describe('Button', () => {
  describe(':props', () => {
    it(':variant', () => {
      const wrapper = mount({
        render() {
          return <Button variant={'base'}>text</Button>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Button size={'large'}>text</Button>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':icon function', () => {
      const wrapper = mount(Button, {
        propsData: {
          icon() {
            return <i>custom icon</i>;
          },
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':shape', () => {
      const wrapper = mount({
        render() {
          return <Button shape="round">text</Button>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':loading', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Button loading={true}>text</Button>;
        },
      });
      wrapper.trigger('click');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
    it(':block', () => {
      const wrapper = mount({
        render() {
          return <Button block={true}>text</Button>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':disabled', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Button disabled={true} onClick={fn}>text</Button>;
        },
      });
      wrapper.trigger('click');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
    it.only(':content', () => {
      const renderContent = function () {
        return 'foo';
      };
      const wrapper = mount({
        render() {
          return (
            <div>
              <Button content="foo">bar</Button>
              <Button content={renderContent}>bar</Button>
              <Button default="foo">bar</Button>
              <Button default={renderContent}>bar</Button>

              <Button content={0}>bar</Button>
            </div>
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('Event passthrough ', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Button onClick={fn}>text</Button>;
        },
      });
      wrapper.findComponent(Button).trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('<slot>', () => {
    it('<icon>', () => {
      const wrapper = mount(Button, {
        scopedSlots: {
          icon: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
