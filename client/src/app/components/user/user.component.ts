import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { User } from '../../api/user';
import { UserService } from '../../services/user/user.service';
import { PasswordChangeRequest } from '../../api/passwordChangeRequest';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User;
  passwordChangeRequest: PasswordChangeRequest;
  requestChange: boolean = false;
  requestPasswordChange: boolean = false;
  form: any = {
    name: null,
    surname: null,
    email: null,
    username: null,
  };
  updatePasswordForm: any = {
    oldPassword: null,
    newPassword: null,
  };
  @Output() updateEvent = new EventEmitter<Data>();
  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService
  ) {}
  ngOnInit() {
    // fetch user from api
    const userId = this.tokenStorage.getUser().id;
    this.userService
      .getUser(userId)
      .subscribe((user: User) => (this.user = user));
  }

  changeData() {
    this.requestChange = true;
  }

  changePassword() {
    this.requestPasswordChange = true;
  }

  cancelUpdate() {
    this.requestChange = false;
  }
  cancelPasswordChange() {
    this.requestPasswordChange = false;
  }
  updateData() {
    this.userService
      .updateUser(this.user)
      .subscribe((user: User) => (this.user = user));
    this.requestChange = false;
  }

  updatePassword() {
    this.passwordChangeRequest = this.updatePasswordForm;
    const userId = this.tokenStorage.getUser().id;
    // this.requestPasswordChange = this.updatePasswordForm;
    this.userService
      .updatePassword(this.passwordChangeRequest, userId)
      .subscribe(
        (passwordChangeRequest: PasswordChangeRequest) =>
          (this.passwordChangeRequest = passwordChangeRequest)
      );
    this.requestPasswordChange = false;
  }
}
