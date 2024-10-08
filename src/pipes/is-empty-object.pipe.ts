import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IsEmptyObjectPipe implements PipeTransform {
  transform(dto: Record<string, any>) {
    const values = Object.values(dto);
    const hasAnyEmptyValue = values.length === 0;

    if (hasAnyEmptyValue) {
      throw new BadRequestException('You did not enter any values.');
    }

    return dto;
  }
}
