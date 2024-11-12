import { Component, EventEmitter, Output } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { LoginServiceService } from '../Services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  imports: [CardModule,
    ImageModule],
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private loginService: LoginServiceService,
              private router: Router) { }

  @Output() agregarAlCarroOutput = new EventEmitter<void>();
  mobile: boolean = true;

  ngOnInit(){
    this.getMobile();
      this.loginService.checkLogin().subscribe({
        error: () => {
            this.router.navigate(['/'])
        },
      });
  }

  getMobile(){
    if(window.innerWidth <= 800){
      this.mobile = true;
    }else{
      this.mobile = false;
    }
  }
}
