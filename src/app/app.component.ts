import { Component, OnInit } from '@angular/core';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username?: string;
  title = 'SportBidsWeb';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.storageService.getToken();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      this.username = user.username;
    }
  }

  logout() :void {
    this.storageService.signOut();
    window.location.reload();
  }
}
