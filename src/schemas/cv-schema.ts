import { assetSchema } from './asset-schema';
import { contactSchema } from './contact-schema';
import { contentSchema } from './content-schema';

export const cvSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    language: { type: 'string' },
    name: { type: 'string' },
    briefDescription: { type: 'string' },
    photo: assetSchema,
    footer: { type: 'string' },
    contact: {
      type: 'object',
      properties: {
        email: contactSchema,
        phone: contactSchema,
      },
    },
    aside: {
      type: 'object',
      properties: {
        label: { type: 'string' },
        content: contentSchema,
      },
      required: ['label', 'content'],
    },
    main: {
      type: 'object',
      properties: {
        content: contentSchema,
      },
      required: ['content'],
    },
  },
  required: ['language', 'name', 'aside', 'main'],
} as const;
