import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';

@Injectable({
   providedIn: 'root',
})
export class DialogService {
   constructor(private snackBar: MatSnackBar) {}

   openError(msg: string, error: string) {
      this.snackBar.openFromComponent(SnackBarComponent, {
         duration: 5000,
         data: { message: msg, error },
         panelClass: ['snackErro'],
      });
   }

   openSuccess(msg: string) {
      this.snackBar.openFromComponent(SnackBarComponent, {
         duration: 3000,
         data: { message: msg },
         panelClass: ['SnackBarComponent'],
      });
   }
}
