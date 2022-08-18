import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from 'src/app/comum/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { UserDetailComponent } from 'src/app/user-detail/user-detail.component';

@Component({
   selector: 'app-user',
   templateUrl: './user-list.component.html',
   styleUrls: ['../task-list/task-list.component.scss'],
})
export class UserListComponent implements OnInit {
   users: User[];

   constructor(private api: ApiService, private dialogRef: MatDialog) {}

   ngOnInit() {
      this.getUsers();
   }

   async getUsers() {
      const result = await this.api.getUsers();
      this.users = result;
   }

   openDetails(user: User) {
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

   createUser() {
      const modal = this.dialogRef.open(UserDetailComponent);
      modal.afterClosed().subscribe((data) => {
         if (data) {
            this.users.push(data);
         }
      });
   }
}
