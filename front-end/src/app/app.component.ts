import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/@core/services/user/jwt.service';

@Component({
  selector: 'shop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front-end';
  constructor(private jwtService: JwtService) { }
  ngOnInit() {
    this.jwtService.getUserProfileByToken();
  }
}
