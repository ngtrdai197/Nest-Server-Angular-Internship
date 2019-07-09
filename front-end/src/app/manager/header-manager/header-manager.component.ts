import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/@core/services/user/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shop-header-manager',
  templateUrl: './header-manager.component.html',
  styleUrls: ['./header-manager.component.scss']
})
export class HeaderManagerComponent implements OnInit {

  constructor(private jwtService: JwtService,
    private router: Router) { }

  ngOnInit() {
  }

  onSignOut() {
    this.jwtService.destroyToken();
    this.router.navigate(['']);
  }
}
