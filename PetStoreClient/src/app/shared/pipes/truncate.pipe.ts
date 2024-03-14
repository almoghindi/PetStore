import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50): string {
    if (!value) return '';
    if (value.length <= limit) {
      return value;
    } else {
      return `${value.substring(0, limit)}...`;
    }
  }
}
