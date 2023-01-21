import { platformGcpFunction } from './platform-gcp-function';

describe('platformGcpFunction', () => {
  it('should work', () => {
    expect(platformGcpFunction()).toEqual('platform-gcp-function');
  });
});
