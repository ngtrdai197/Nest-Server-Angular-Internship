import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/@core/services/user/jwt.service';
import { IUser } from 'src/@core/interface';
import { API } from 'src/@core/config/API';

@Component({
  selector: 'shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: IUser;
  role =  API.ROLES;
  constructor(private router: Router, private jwtService: JwtService) { }

  ngOnInit() {
    this.jwtService.getProfile.subscribe(data => this.currentUser = data);
  }
  myAccount() {
    this.router.navigate(['/auth']);
  }
  onNavigateAdmin(){
    this.router.navigate(['/admin/dash-board']);
  }
  onSignOut(){
    this.jwtService.destroyToken();
    this.jwtService.setUserProfile(null);
    this.router.navigate(['/']);
  }
}
