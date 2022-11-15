import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../authentication.service";
import {Router} from "@angular/router";
import {DataService} from "../../../core/data-service/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit, OnDestroy {
  @ViewChild('loginInput') loginInput: ElementRef
  @ViewChild('password') password: ElementRef
  @ViewChild('loginBtn') loginBtn: ElementRef
  @ViewChild('registerBtn') registerBtn: ElementRef

  @Output() changeForm = new EventEmitter
  home = true
  title = 'Landing!'
  subtitle = 'Welcome back!'
  unauthorized = false
  created = false
  register = false
  invalidUsername = false
  validUsername = false


  sub: Subscription


  dataForm = this.fb.group({
    "login": ['', Validators.required],
    "password": ['', Validators.required],
    "remember": [false]
  })

  constructor(private fb: FormBuilder,
              private as: AuthenticationService,
              private router: Router) {
  }


  change() {
    this.changeForm.emit()
    setTimeout(() => {
      this.validUsername = false
      this.invalidUsername = false
      this.home = !this.home
      this.subtitle = this.home ? 'Welcome back!' : 'Greetings!'
      this.title = this.home ? 'Landing!' : 'Taking off!'
      this.register = !this.register
    }, 1000)
  }

  successLogin(response: { access_token: string }, remember: boolean) {
    if (remember) {
      localStorage.setItem('token', response.access_token)
    } else {
      localStorage.removeItem('token')
      sessionStorage.setItem('token', response.access_token)
    }
    this.router.navigate(['/app/dashboards'])
  }

  invalidLogin() {
    this.unauthorized = true
    this.dataForm.controls.password.reset()
    this.loginBtn.nativeElement.disabled = true
  }

  login() {
    const {login, password, remember} = this.dataForm.value
    console.log(login, password, remember)
    this.sub = this.as.login(login!, password!).subscribe(
      response => {
        console.log(response)
        if (response.status === 401) {
          this.invalidLogin()
          return
        }
        this.successLogin(response, remember!)
      })
  }

  createUser() {
    const {login, password} = this.dataForm.value
    this.as.register(login!, password!).subscribe(
      response => {
        console.log(response.status)
        if (response.status === 201) {
          this.successRegister()

        } else {
          this.router.navigate(['error'])
        }
      }
    )
  }

  successRegister() {
    this.created = true
    setTimeout(() => {
      this.change()
    }, 2000)
    setTimeout(() => {
      this.created = false
    }, 3000)
  }


  checkName() {
    if (this.home) {
      return
    }
     this.as.checkUsername(this.loginInput.nativeElement.value).subscribe(
      response => {
        console.log(response)
        if (response.status === 403) {
          this.validUsername = false
          this.invalidUsername = true
          this.registerBtn.nativeElement.disabled = true
        }
        if (response.status === 200) {
          this.validUsername = true
          this.invalidUsername = false
          this.registerBtn.nativeElement.disabled = false
        }
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    // this.sub2.unsubscribe()
    // this.sub3.unsubscribe()
  }

}
