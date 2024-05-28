import { Component, EventEmitter, Output } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { LoginServiceService } from '../Services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  imports: [ImageModule],
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private loginService: LoginServiceService,
              private router: Router) { }

  @Output() agregarAlCarroOutput = new EventEmitter<void>();

  ngOnInit(){
      this.loginService.checkLogin().subscribe({
        error: () => {
            this.router.navigate(['/'])
        },
      });
  }
}
