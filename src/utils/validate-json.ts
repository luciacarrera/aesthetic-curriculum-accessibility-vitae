// validate.ts
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { cvSchema } from '../schemas/cv-schema';

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);

const validateCvInformation = ajv.compile(cvSchema);

export function assertValidCvInformation(data: unknown) {
  if (!validateCvInformation(data)) {
    // Nice error message for logs
    const errors = ajv.errorsText(validateCvInformation.errors, {
      separator: '\n',
    });
    throw new Error(`Invalid CV JSON:\n${errors}`);
  }
  console.log('✅ Valid CV JSON');
  return data; // now known-valid at runtime
}
