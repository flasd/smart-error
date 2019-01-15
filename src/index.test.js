import SmartError from './SmartError';
// eslint-disable-next-line import/named
import DefaultExport, { defaultMessage, reportStore } from './index';

describe('module surface', () => {
  it('should export only the class', () => {
    expect(SmartError).toBe(DefaultExport);
    expect(defaultMessage).toBeUndefined();
    expect(reportStore).toBeUndefined();
  });
});
