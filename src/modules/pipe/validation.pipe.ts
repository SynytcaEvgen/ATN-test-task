import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exceptions';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const error = typeof obj === 'string' ? [] : await validate(obj);
    if (error.length) {
      const message = error.map((item) => {
        return `${item.property} - ${Object.values(item.constraints).join(
          ', '
        )}`;
      });
      throw new ValidationException(message);
    }
    return value;
  }
}
