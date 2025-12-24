import { assetSchema } from './asset-schema';

export const contactSchema = {
  type: 'object',
  properties: {
    icon: assetSchema,
    value: { type: 'string' },
  },
  required: ['value'],
};
