import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserModel } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user: UserModel;
  confirmPassword: string = '';
  error: string = '';
  constructor(private router: Router, private authService: AuthService) {
    this.user = new UserModel();
  }
  onSubmit() {
    if (this.user.password !== this.confirmPassword) {
      this.error = 'Password and Confirm Password do not match.';
      return;
    }
    this.authService.signup(this.user).subscribe({
      next: (response) => {
        // console.log('Login successful:', response);
        localStorage.setItem('authName', this.user.userName);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.error = error;
        console.error('There was an error!', error);
      },
    });
  }
}
