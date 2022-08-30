import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
   selector: 'app-snack-bar',
   templateUrl: './snack-bar.component.html',
   styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
   constructor(
      @Inject(MAT_SNACK_BAR_DATA) public data: any,
      private snackRef: MatSnackBarRef<SnackBarComponent>
   ) {}

   ngOnInit() {}

   public close(): void {
      this.snackRef.dismiss();
   }
}
