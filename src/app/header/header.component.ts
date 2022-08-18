import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styles: [
      `
         .header {
            background: var(--azulEscuro);
            color: #fff;
         }
         .fill-remaining-space {
            flex: 1 1 auto;
         }
      `,
   ],
   providers: [AuthGuard],
})
export class HeaderComponent implements OnInit {
   isLoggedIn = this.authService.isLoggedIn();

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit() {
      this.authService.loggedIn$.subscribe((element) => {
         setTimeout(() => {
            this.isLoggedIn = element;
         });
      });
   }

   onLogout() {
      this.authService.logout();
   }

   clickListUser() {
      this.router.navigate(['/user']);
   }

   clickListTasks() {
      this.router.navigate(['/task']);
   }
}
