import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logIn(): void {
    this.authService.logIn(this.signInForm.value).subscribe(x => {
      if (x) {
        this.router.navigate(['/home']);
      }
    });
  }

}
