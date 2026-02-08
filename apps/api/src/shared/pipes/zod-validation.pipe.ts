import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const error = result.error.flatten();
      const formErrors = error.formErrors;
      let message = 'Validation failed';

      if (formErrors.length > 0) {
        if (formErrors.includes('Required')) {
          const type =
            metadata.type === 'body' ? 'body' : metadata.data || 'data';
          message = `Validation failed: ${type} is required`;
        } else {
          message = `Validation failed: ${formErrors.join(', ')}`;
        }
      } else {
        const errorContext = metadata.data ? ` for '${metadata.data}'` : '';
        message = `Validation failed${errorContext}`;
      }

      throw new BadRequestException({
        message,
        errors: error,
      });
    }
    return result.data;
  }
}
