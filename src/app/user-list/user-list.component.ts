import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from 'src/app/comum/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { UserDetailComponent } from 'src/app/user-detail/user-detail.component';

@Component({
   selector: 'app-user',
   template: `<app-list
      [columns]="columns"
      [buttonAddFunction]="createUser.bind(this)"
      [detail]="openDetails.bind(this)"
      [buttonAddName]="'Adicionar Usuario'"
      [title]="'Lista de Usuarios'"
      [fields]="fields"
      [data]="users"
   ></app-list> `,
})
export class UserListComponent implements OnInit {
   public users: User[];
   public columns = [
      { name: 'Nome', width: '35%' },
      { name: 'CPF', width: '30%' },
      { name: 'Email', width: '35%' },
   ];

   public fields = ['name', 'cpf', 'email'];

   constructor(private api: ApiService, private dialogRef: MatDialog) {}

   ngOnInit() {
      this.getUsers();
   }

   public async getUsers(): Promise<void> {
      const result = await this.api.getUsers();
      this.users = result;
   }

   public openDetails(user: User): void {
      const modal = this.dialogRef.open(UserDetailComponent, { data: user });
      modal.afterClosed().subscribe((data) => {
         const index = this.users.findIndex(
            (element) => element.id === user.id
         );
         if (typeof data === 'object') {
            this.users[index] = data;
         } else if (typeof data === 'string') {
            this.users.splice(index, 1);
         }
      });
   }

   public createUser(): void {
      const modal = this.dialogRef.open(UserDetailComponent);
      modal.afterClosed().subscribe((data) => {
         if (data) {
            this.users.push(data);
         }
      });
   }
}
