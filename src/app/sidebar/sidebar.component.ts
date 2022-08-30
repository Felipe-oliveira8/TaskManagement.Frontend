import { Component, OnInit } from '@angular/core';
import { InfoRoute } from 'src/app/comum/interfaces';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
   selector: 'app-sidebar',
   templateUrl: './sidebar.component.html',
   styles: [],
   providers: [AuthGuard],
})
export class SidebarComponent implements OnInit {
   items: InfoRoute[] = [
      {
         path: '/task/list',
         title: 'Lista de Tarefas',
         icon: 'bi bi-list-task',
         class: '',
      },
      {
         path: '/user',
         title: 'Lista de Usuarios',
         icon: 'bi bi-people',
         class: '',
      },
   ];
   constructor(private authService: AuthService) {}

   private isLoggedIn = this.authService.isLoggedIn();

   ngOnInit() {
      this.authService.loggedIn$.subscribe((element) => {
         setTimeout(() => {
            this.isLoggedIn = element;
         });
      });
   }

   public onLogout(): void {
      this.authService.logout();
   }
}
