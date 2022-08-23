import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from 'src/app/home/home';
import { HeaderComponent } from 'src/app/header/header.component';
import { Login } from 'src/app/login/login';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { TaskListComponent } from 'src/app/task-list/task-list.component';
import { UserListComponent } from 'src/app/user-list/user-list.component';
import { InterceptorModule } from 'src/app/interceptors/interceptor.module';
import { Interceptor } from 'src/app/interceptors/interceptor.service';
import { MatDialogModule } from '@angular/material';
import { UserDetailComponent } from 'src/app/user-detail/user-detail.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TaskCreateComponent } from 'src/app/task-create/task-create.component';
import { TaskDetailComponent } from 'src/app/task-detail/task-detail.component';
import { ActivityCreateComponent } from 'src/app/activity-create/activity-create.component';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ListComponent } from 'src/app/list/list.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      HeaderComponent,
      Login,
      TaskListComponent,
      UserListComponent,
      UserDetailComponent,
      TaskCreateComponent,
      TaskDetailComponent,
      ActivityCreateComponent,
      SnackBarComponent,
      ListComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      InterceptorModule,
      AppMaterialModule,
      ReactiveFormsModule,
      FormsModule,
      MatDialogModule,
      AngularEditorModule,
      NgxMaskModule.forRoot(),
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
      AuthService,
      AuthGuard,
   ],
   bootstrap: [AppComponent],
   entryComponents: [
      UserDetailComponent,
      ActivityCreateComponent,
      SnackBarComponent,
      ListComponent,
   ],
})
export class AppModule {}
