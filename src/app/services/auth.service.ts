import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Logged, Login } from 'src/app/comum/interfaces';
import { DialogService } from 'src/app/services/dialog.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
   loggedIn$ = new BehaviorSubject<boolean>(false);

   isLoggedIn() {
      if (localStorage.getItem('token')) {
         this.loggedIn$.next(true);
         return true;
      } else {
         this.loggedIn$.next(false);
         return false;
      }
   }

   constructor(
      private router: Router,
      private httpClient: HttpClient,
      private dialog: DialogService
   ) {}

   async authenticate(user: Login) {
      const Url = environment.api + '/authenticate';
      const body = user;
      this.httpClient.post<Logged>(Url, body).subscribe(
         (result) => {
            if (result && result.token) {
               localStorage.setItem('token', result.token);
               this.loggedIn$.next(true);
               this.router.navigate(['/']);
            }
         },
         (err) => {
            console.log(err);
            this.dialog.openError(
               'Falha na autenticação, Tente Novamente!',
               err.error.error
            );
         }
      );
   }

   logout() {
      localStorage.clear();
      this.loggedIn$.next(false);
      this.router.navigate(['/login']);
   }
}
