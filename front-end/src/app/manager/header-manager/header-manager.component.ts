import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/@core/services/user/jwt.service';
import { Router } from '@angular/router';
import { IUser } from 'src/@core/interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/@core/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'shop-header-manager',
  templateUrl: './header-manager.component.html',
  styleUrls: ['./header-manager.component.scss']
})
export class HeaderManagerComponent implements OnInit {

  user: IUser;
  public editForm: FormGroup;
  constructor(private jwtService: JwtService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.buildForm();
  }

  onSignOut() {
    this.jwtService.destroyToken();
    this.router.navigate(['']);
  }

  onUpdateProfile() {
    const user: IUser = {
      address: this.editForm.value.address,
      email: this.editForm.value.email,
      fullName: this.editForm.value.fullName,
      phone: this.editForm.value.phone,
      _id: this.user._id
    };
    this.userService.onUpdateUser(user).subscribe(response => {
      if (response) {
        this.jwtService.getUserProfileByToken();
        this.toastService.success('Cập nhật thành công', 'Thông báo');
      }
    });
  }

  pushProfile() {
    this.editForm = this.formBuilder.group({
      username: [this.user.username, [Validators.required]],
      fullName: [this.user.fullName, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      phone: [this.user.phone, [Validators.required]]
    });
  }

  private getProfile() {
    this.jwtService.getProfile.subscribe(user => {
      this.user = user;
    });
  }

  private buildForm() {
    this.editForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }
}
