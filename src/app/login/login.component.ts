import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginServiceService } from '../Services/login-service.service';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MessagesModule, InputTextModule, ButtonModule, FormsModule, CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LoginServiceService,
              private router: Router) { }

  email: any;
  password: any;
  messages: Message[] = [];


  ngOnInit(){
      this.loginService.checkLogin().subscribe({
        next: () => {
            this.router.navigate(['/home'])
        },
      });
  }

  login(){
      let credentials = {
        email: this.email,
        password: this.password
      };

      this.loginService.login(credentials).subscribe({
        next: (res: any) => {
          if(res){
            let token = res;
            localStorage.setItem('MidTechAdminToken', token);
            this.router.navigate(['/home'])
          }
        },
        error: (err: any) => {
           this.messages = [{ severity: 'error', detail: 'Credenciales incorrectas' }];
           this.password = "";
        }
      });
  }
}
