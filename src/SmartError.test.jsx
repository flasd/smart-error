import SmartError, { defaultMessage, reportStore } from './SmartError';

describe('SmartError Class', () => {
  it('should be ok', () => {
    expect(SmartError).toBeDefined();
    expect(() => new SmartError()).not.toThrow();
    expect(new SmartError()).toBeInstanceOf(SmartError);

    expect(typeof defaultMessage).toBe('string');

    expect(typeof reportStore).toBe('object');
    expect(Object.keys(reportStore)).toHaveLength(0);
  });

  it('should respond to environment changes', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const ginnyPig = 'error message';
    expect(new SmartError(ginnyPig)).toHaveProperty('message');
    expect(new SmartError(ginnyPig).message).not.toBe(ginnyPig);

    process.env.NODE_ENV = 'development';
    expect(new SmartError(ginnyPig)).toHaveProperty('message');
    expect(new SmartError(ginnyPig).message).toBe(ginnyPig);

    process.env.NODE_ENV = originalEnv;
  });

  it('should call all listeners', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const archer = jest.fn();
    const jamesBond = jest.fn();

    SmartError.addErrorListener(archer);
    SmartError.addErrorListener(jamesBond);

    const ginnyPig = 'error message';
    // eslint-disable-next-line no-new
    new SmartError(ginnyPig);

    expect(archer).toHaveBeenCalled();
    expect(jamesBond).toHaveBeenCalled();

    expect(archer.mock.calls[0][0]).toHaveProperty('message', ginnyPig);
    expect(jamesBond.mock.calls[0][0]).toHaveProperty('message', ginnyPig);

    process.env.NODE_ENV = originalEnv;
  });

  it('should reject non-function listeners', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    expect(() => SmartError.addErrorListener('not-a-function')).toThrow();

    try {
      SmartError.addErrorListener('not-a-function');
    } catch (typeError) {
      expect(typeError).toBeInstanceOf(TypeError);
      expect(typeError.message.indexOf('string')).not.toBe(-1);
    }

    process.env.NODE_ENV = 'production';
    try {
      SmartError.addErrorListener('not-a-function');
    } catch (typeError) {
      expect(typeError).toBeInstanceOf(Error);
      expect(typeError.message.indexOf('careless')).not.toBe(-1);
    }

    process.env.NODE_ENV = originalEnv;
  });

  it('should unregister listeners correctly', () => {
    const archer = jest.fn();

    const unregister = SmartError.addErrorListener(archer);

    expect(typeof unregister).toBe('function');

    const ginnyPig = 'error message';

    expect(() => unregister()).not.toThrow();
    // eslint-disable-next-line no-new
    new SmartError(ginnyPig);

    expect(archer).not.toHaveBeenCalled();
  });

  it('should handle listeners erros', () => {
    const archer = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });

    SmartError.addErrorListener(archer);
    expect(() => new SmartError()).not.toThrow();

    archer.mockImplementationOnce(() => Promise.reject(new Error()));
    expect(() => new SmartError()).not.toThrow();
  });
});
