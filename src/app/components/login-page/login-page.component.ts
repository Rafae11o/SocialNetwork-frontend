import { Component, OnInit } from '@angular/core';
import { UserRegistrationInfo } from 'src/app/entities/user.entities';
import { AuthService } from 'src/app/services/auth.service';
import { Response, ResponseWithData } from 'src/app/entities/response.entities';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  signInForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  hidePassword = true;

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.redirectIfLoggedIn();
  }

  register(){
    if(this.isRegisterFormFieldsAreEmpty()){
      return;
    }
    const registerUserInfo = new UserRegistrationInfo(this.registerFormLogin?.value, this.registerFormName?.value, this.registerFormPassword?.value);
    this.authService.register(registerUserInfo).subscribe({
      next: (response) => {
        console.log('login page[register]', response)
        this.toastr.success(response.message);
      },
      error: (e) => {
        console.log('login page[register]', e);
        this.toastr.error(e.error.message);
      }
    })
  }

  signIn(){
    if(this.isSignInFormFieldsAreEmpty()){
      return;
    }
    this.authService.login(this.signInFormLogin?.value, this.signInFormPassword?.value).subscribe({
      next: (response) => {
        console.log('login page[signIn]',response);
        // this.toastr.success(response.message);
        this.redirectIfLoggedIn();
      },
      error: (e) => {
        console.log('login page[signIn]', e);
        this.toastr.error(e.error.message);
      }
    })
  }

  redirectIfLoggedIn(){
    if(this.authService.isLoggedIn()) {
      this.router.navigate(["home"]);
    }
  }

  isSignInFormFieldsAreEmpty() {
    return this.signInFormLogin?.hasError('required') || this.signInFormPassword?.hasError('required');
  }

  isRegisterFormFieldsAreEmpty() {
    return this.registerFormLogin?.hasError('required') || this.registerFormName?.hasError('required') || this.registerFormPassword?.hasError('required');
  }

  get signInFormLogin() {return this.signInForm.get('login');}

  get signInFormPassword() {return this.signInForm.get('password');}

  get registerFormLogin() {return this.registerForm.get('login');}

  get registerFormName() {return this.registerForm.get('name');}

  get registerFormPassword() {return this.registerForm.get('password');}

}
