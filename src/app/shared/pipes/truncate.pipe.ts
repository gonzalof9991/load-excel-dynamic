import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para truncar strings
 * Parametros:
 * 1. Longitud maxima del string
 * 2. Agregar elipsis al final del string
 *
 * Ejemplo:
 * {{ str | truncate:[20, '...'] }}
 */
@Pipe({
  name: 'truncateStr'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if (value != null) {
      const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
      const trail = args.length > 1 ? args[1] : '...';
      return value.length > limit ? value.substring(0, limit) + trail : value;
    }
    else
      {return '';}
  }

}

