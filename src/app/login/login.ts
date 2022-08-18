import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.html',
   styleUrls: ['./login.scss'],
})
export class Login implements OnInit {
   dataUser = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
   });

   constructor(private auth: AuthService, private formBuilder: FormBuilder) {}

   ngOnInit(): void {}

   async authenticate() {
      await this.auth.authenticate(this.dataUser.getRawValue());
   }
}
