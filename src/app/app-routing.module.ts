import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { HomeComponent } from 'src/app/home/home';
import { Login } from 'src/app/login/login';
import { TaskCreateComponent } from 'src/app/task-create/task-create.component';
import { TaskDetailComponent } from 'src/app/task-detail/task-detail.component';
import { TaskListComponent } from 'src/app/task-list/task-list.component';
import { UserListComponent } from 'src/app/user-list/user-list.component';

const routes: Routes = [
   {
      path: '',
      component: HomeComponent,
      children: [
         { path: '', redirectTo: 'task', pathMatch: 'full' },
         {
            path: 'task',
            children: [
               { path: '', redirectTo: 'list', pathMatch: 'full' },
               { path: 'list', component: TaskListComponent },
               { path: 'create', component: TaskCreateComponent },
               { path: ':id', component: TaskDetailComponent },
            ],
         },
         {
            path: 'user',
            children: [
               { path: '', redirectTo: 'user', pathMatch: 'full' },
               { path: 'user', component: UserListComponent },
            ],
         },
      ],
      canActivate: [AuthGuard],
   },
   { path: 'login', component: Login },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
