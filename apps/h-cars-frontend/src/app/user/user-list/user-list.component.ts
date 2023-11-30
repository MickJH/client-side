import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'client-side-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  followUser(userId: string): void {
    this.userService.followUser(userId).subscribe(
      () => {
        this.errorMessage = 'User followed successfully';
      },
      (error) => {
        if (
          error.status === 400 &&
          error.error.message === 'missing parameters'
        ) {
          this.displayErrorMessage('Missing parameters');
        } else if (
          error.status === 404 &&
          error.error.message === 'user doesnt exist'
        ) {
          this.displayErrorMessage('User not found');
        } else if (
          error.status === 400 &&
          error.error.message === 'cannot follow yourself'
        ) {
          this.displayErrorMessage('Cannot follow yourself');
        } else if (
          error.status === 400 &&
          error.error.message === 'You are already following this user'
        ) {
          this.displayErrorMessage('You are already following this user');
        } else {
          this.displayErrorMessage('Unexpected error during follow operation');
        }
      }
    );
  }

  private displayErrorMessage(message: string): void {
    this.errorMessage = message;
  }
}
