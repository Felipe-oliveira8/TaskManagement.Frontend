import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'enumStatusDescription',
})
export class StatusPipe implements PipeTransform {
   transform(value: number): string {
      switch (value) {
         case 0:
            return 'Não Iniciada';
         case 1:
            return 'Em Andamento';
         case 2:
            return 'Aguardando';
         case 3:
            return 'Concluido';
      }
   }
}
