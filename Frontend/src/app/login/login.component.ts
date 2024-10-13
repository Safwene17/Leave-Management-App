import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  registrationSuccess: true | false | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    // Check if the required fields are empty
    if (!this.email || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',

      });
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        const token = response.mytoken;
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email or password!',

        });
      }
    );
  }


  ngOnInit(): void {
    localStorage.clear()
  }
}
