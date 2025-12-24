const detailsItemsSchema = {
  oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
};

const simpleDetailsSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    details: detailsItemsSchema,
  },
  required: ['title', 'details'],
};

const nestedDetailsSchema = {
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
  required: ['title', 'nestedDetails'],
};

const nestedInformationSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    date: { type: 'string' },
    nestedInformation: {
      type: 'array',
      items: { oneOf: [nestedDetailsSchema, simpleDetailsSchema] },
    },
  },
  required: ['title', 'nestedInformation'],
};

export const contentSchema = {
  type: 'array',
  items: {
    oneOf: [simpleDetailsSchema, nestedInformationSchema],
  },
};
