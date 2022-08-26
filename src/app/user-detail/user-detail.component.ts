import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/comum/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
   selector: 'app-user-detail',
   templateUrl: './user-detail.component.html',
   styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
   users: User[];

   user = this.formBuilder.group({
      id: [null],
      user: [null, [Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.email]],
      tel: [null, [Validators.minLength(15), Validators.maxLength(15)]],
      cpf: [
         null,
         [
            Validators.required,
            Validators.minLength(14),
            Validators.maxLength(14),
         ],
      ],
   });
   constructor(
      @Inject(MAT_DIALOG_DATA) public data: User,
      private dialogRef: MatDialogRef<UserDetailComponent>,
      private api: ApiService,
      private formBuilder: FormBuilder
   ) {}

   ngOnInit() {
      if (this.data) {
         this.user.patchValue(this.data);
      }
   }

   async createUser() {
      const response = await this.api.createUser(this.user.getRawValue());
      this.user.get('id').setValue(response.id);
      this.dialogRef.close(this.user.getRawValue());
   }

   async removeUser() {
      await this.api.deleteUser(this.user.get('id').value);
      this.dialogRef.close(this.user.get('id').value);
   }

   async updateUser() {
      await this.api.updateUser(this.user.getRawValue());
      this.dialogRef.close(this.user.getRawValue());
   }

   fechar() {
      this.dialogRef.close();
   }
}
