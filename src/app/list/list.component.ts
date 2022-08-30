import { Component, Input, OnInit } from '@angular/core';
import { StatusTask } from 'src/app/Enums/enum';

@Component({
   selector: 'app-list',
   templateUrl: './list.component.html',
   styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
   public status = StatusTask;
   @Input() columns: [];
   @Input() buttonAddFunction: () => void;
   @Input() public detail: (item: object) => any;
   @Input() buttonAddName: string;
   @Input() title: string;
   @Input() fields: [];
   @Input() data: [];

   constructor() {}

   ngOnInit() {}

   public classStatus(status: number) {
      switch (status) {
         case 0:
            return 'not-started';
         case 1:
            return 'in-progress';
         case 2:
            return 'waiting';
         case 3:
            return 'concluded';
      }
   }

   public clickAdd(): void {
      this.buttonAddFunction();
   }

   public clickLine(item: object) {
      this.detail(item);
   }
}
