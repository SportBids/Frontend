import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    user?: User | null;
    title = 'SportBidsWeb';

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout(): void {
        this.accountService.logout();
    }
}
