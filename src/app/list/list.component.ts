import { Component, Input, OnInit } from '@angular/core';
import { StatusTask } from 'src/app/Enums/enum';

@Component({
   selector: 'app-list',
   templateUrl: './list.component.html',
   styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
   status = StatusTask;
   @Input() columns: [];
   @Input() buttonAddFunction: Function;
   @Input() public detail: (item) => any;
   @Input() buttonAddName: string;
   @Input() title: string;
   @Input() fields: [];
   @Input() data: [];

   constructor() {}

   ngOnInit() {}

   classStatus(status: string) {
      switch (status) {
         case 'Não Iniciada':
            return 'not-started';
         case 'Em Andamento':
            return 'in-progress';
         case 'Aguardando':
            return 'waiting';
         case 'Concluido':
            return 'concluded';
      }
   }

   clickAdd() {
      this.buttonAddFunction();
   }

   clickLine(item) {
      this.detail(item);
   }
}
