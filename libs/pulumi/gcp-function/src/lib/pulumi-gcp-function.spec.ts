import { pulumiGcpFunction } from './pulumi-gcp-function';

describe('pulumiGcpFunction', () => {
  it('should work', () => {
    expect(pulumiGcpFunction()).toEqual('pulumi-gcp-function');
  });
});
