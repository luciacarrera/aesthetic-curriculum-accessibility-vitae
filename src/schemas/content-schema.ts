const detailsItemsSchema = {
  oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
};

const simpleDetailsOrSectionSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    details: detailsItemsSchema,
  },
  required: ['title', 'details'],
};

const complexDetailsSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    subtitle: { type: 'string' },
    date: { type: 'string' },
    nestedDetails: {
      type: 'array',
      items: detailsItemsSchema,
    },
  },
  required: ['title'],
};

const nestedSectionSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    nestedInformation: {
      type: 'array',
      items: { oneOf: [complexDetailsSchema, simpleDetailsOrSectionSchema] },
    },
  },
  required: ['title', 'nestedInformation'],
};

export const contentSchema = {
  type: 'array',
  items: {
    oneOf: [simpleDetailsOrSectionSchema, nestedSectionSchema],
  },
};
