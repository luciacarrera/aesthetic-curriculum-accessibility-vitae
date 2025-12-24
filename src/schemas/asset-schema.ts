export const assetSchema = {
  type: 'object',
  properties: {
    alt: { type: 'string' },
    src: { type: 'string' },
  },
  required: ['alt', 'src'],
};
