import { LoginService } from './../login.service';
import { UserLoginInfo } from './../interfaces/login-info';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: UserLoginInfo = {
    email: '',
    password: '',
  };

  redirectUrl = '/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParamMap) => {
      this.redirectUrl = queryParamMap.get('redirect');
      console.log(this.redirectUrl);
    });
  }

  login() {
    // this.loginService.login(this.user).subscribe({
    //   error: (err: HttpErrorResponse ) => {
    //     alert(err.message);
    //   },
    //   next: (result) => {
    //     console.log(result.user.token);
    //     this.router.navigateByUrl('/');
    //   },
    //   complete: () => {
    //     console.log('complete');
    //   }
    // });

    this.loginService
      .login(this.user)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          alert(err.message);
          return throwError(err);
        })
      )
      .subscribe((result) => {
        console.log(result.user.token);
        localStorage.setItem('token', result.user.token);
        this.router.navigateByUrl(this.redirectUrl ? this.redirectUrl : '/');
      });
  }
}
