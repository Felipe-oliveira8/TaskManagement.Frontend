import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Activity, Task, User } from 'src/app/comum/interfaces';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class ApiService {
   constructor(
      private http: HttpClient,
      private dialog: DialogService,
      private authService: AuthService
   ) {}

   getUsers() {
      return new Promise<User[]>((resolve, reject) => {
         this.http.get<User[]>(`${environment.api}/user/list`).subscribe(
            (result) => {
               resolve(result);
            },
            (err) => {
               if (err.status === 401) {
                  this.authService.logout();
                  reject(err);
               } else {
                  console.log(err);
                  this.dialog.openError('Erro!', err.error);
                  reject(err);
               }
            }
         );
      });
   }

   updateUser(user: User) {
      return new Promise((resolve, reject) => {
         this.http.put<User>(`${environment.api}/user`, user).subscribe(
            (result) => {
               this.dialog.openSuccess('Usuario alterado com sucesso!');
               resolve(result);
            },
            (err) => {
               if (err.status === 401) {
                  this.authService.logout();
                  reject(err);
               } else {
                  console.log(err);
                  this.dialog.openError('Erro!', err.error);
                  reject(err);
               }
            }
         );
      });
   }

   createUser(user: User) {
      return new Promise<User>((resolve, reject) => {
         this.http.post<User>(`${environment.api}/user`, user).subscribe(
            (response) => {
               this.dialog.openSuccess('Usuario criado com sucesso!');
               resolve(response);
            },
            (err) => {
               if (err.status === 401) {
                  this.authService.logout();
                  reject(err);
               } else {
                  console.log(err);
                  this.dialog.openError('Erro!', err.error);
                  reject(err);
               }
            }
         );
      });
   }

   deleteUser(id: string) {
      return new Promise((resolve, reject) => {
         this.http.delete(`${environment.api}/user/${id}`).subscribe(
            (result) => {
               this.dialog.openSuccess('Usuario excluido com sucesso!');
               resolve(result);
            },
            (err) => {
               if (err.status === 401) {
                  this.authService.logout();
                  reject(err);
               } else {
                  console.log(err);
                  this.dialog.openError('Erro!', err.error);
                  reject(err);
               }
            }
         );
      });
   }

   createTask(task: Task) {
      return new Promise((resolve, reject) => {
         this.http.post<Task>(`${environment.api}/task`, task).subscribe(
            (result) => {
               this.dialog.openSuccess('Tarefa criada com sucesso!');
               resolve(result);
            },
            (err) => {
               if (err.status === 401) {
                  this.authService.logout();
                  reject(err);
               } else {
                  console.log(err);
                  this.dialog.openError('Erro!', err.error);
                  reject(err);
               }
            }
         );
      });
   }

   getTasks() {
      return new Promise<Task[]>((resolve, reject) => {
         this.http.get<Task[]>(`${environment.api}/task/list`).subscribe(
            (result) => {
               resolve(result);
            },
            (err) => {
               if (err.status === 401) {
                  this.authService.logout();
                  reject(err);
               } else {
                  console.log(err);
                  this.dialog.openError('Erro!', err.error);
                  reject(err);
               }
            }
         );
      });
   }

   getTask(taskId: string) {
      return new Promise((resolve, reject) => {
         this.http.get<Task>(`${environment.api}/task/${taskId}`).subscribe(
            (result) => {
               resolve(result);
            },
            (err) => {
               if (err.status === 401) {
                  this.authService.logout();
                  reject(err);
               } else {
                  console.log(err);
                  this.dialog.openError('Erro!', err.error);
                  reject(err);
               }
            }
         );
      });
   }

   getActivities(taskId: string) {
      return new Promise<Activity[]>((resolve, reject) => {
         this.http
            .get<Activity[]>(`${environment.api}/task/activity-list/${taskId}`)
            .subscribe(
               (result) => {
                  resolve(result);
               },
               (err) => {
                  if (err.status === 401) {
                     this.authService.logout();
                     reject(err);
                  } else {
                     console.log(err);
                     this.dialog.openError('Erro!', err.error);
                     reject(err);
                  }
               }
            );
      });
   }

   createActivity(activity: Activity) {
      return new Promise((resolve, reject) => {
         this.http
            .post<Activity>(`${environment.api}/task/activity`, activity)
            .subscribe(
               (result) => {
                  this.dialog.openSuccess('Atividade criada com sucesso');
                  resolve(result);
               },
               (err) => {
                  if (err.status === 401) {
                     this.authService.logout();
                     reject(err);
                  } else {
                     console.log(err);
                     this.dialog.openError('Erro!', err.error);
                     reject(err);
                  }
               }
            );
      });
   }
}
