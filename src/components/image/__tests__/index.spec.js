import Image from '../index';
import {ThemeManager} from '../../../style';

describe('Image', () => {
  describe('getImageSource', () => {
    it('should return source prop, if no transformer was sent', () => {
      const uut = new Image({source: 1});
      expect(uut.getImageSource()).toBe(1);
    });

    it('should return transformed source prop, according to sourceTransform prop', () => {
      const sourceTransformer = jest.fn(() => 2);
      const uut = new Image({source: 1, sourceTransformer});
      expect(uut.getImageSource()).toBe(2);
    });

    it('should return transformed source prop, according to sourceTransform in ThemeManager', () => {
      ThemeManager.setTheme({
        components: {
          Image: {
            sourceTransformer: jest.fn(() => 3),
          },
        },
      });
      const uut = new Image({source: 1});
      expect(uut.getImageSource()).toBe(3);
    });

    it('should return transformed source prop, according to sourceTransform prop and other given props', () => {
      const sourceTransformer = jest.fn(
        ({size, source}) => (size === 'small' ? source : 3),
      );
      let uut = new Image({source: 1, size: 'small', sourceTransformer});
      expect(uut.getImageSource()).toBe(1);
      uut = new Image({source: 1, size: 'large', sourceTransformer});
      expect(uut.getImageSource()).toBe(3);
    });
  });
});
