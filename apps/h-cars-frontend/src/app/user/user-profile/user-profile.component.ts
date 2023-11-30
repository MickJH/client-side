import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Import your user service
import { User } from '../user.model';

@Component({
  selector: 'client-side-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((user) => {
      this.user = user;
    });
  }
}
