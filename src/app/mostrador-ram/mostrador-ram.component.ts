import { Component } from '@angular/core';
import { LoginServiceService } from '../Services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrador-ram',
  standalone: true,
  imports: [],
  templateUrl: './mostrador-ram.component.html',
  styleUrl: './mostrador-ram.component.css'
})
export class MostradorRamComponent {

  constructor(private loginService: LoginServiceService,
              private router: Router) { }

  ngOnInit(){
      this.loginService.checkLogin().subscribe({
        error: () => {
            this.router.navigate(['/'])
        },
        complete: () => {
        }
      });
  }

}
