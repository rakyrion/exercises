import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
	selector: 'app-users',
	// USE STORED CAPITALIZEDUSERS INSTEAD
	template: `
    <div *ngFor="let user of capitalizedUsers">
        {{ getCapitalizeFirstWord(user.name) }}
    </div>
  `
})
export class AppUsers implements OnInit, OnChanges {

	@Input()
	users: { name: string; }[] = [];

	// STORE CAPITALIZED USERS
	capitalizedUsers: string[] = [];

	// ON COMPONENT INIT CAPITALIZE USER NAMES
	ngOnInit(): void {
		this.capitalizeUserNames()
	}

	// CONTROL CHANGES ON USERS TO CAPITALIZE AGAIN
	ngOnChanges(changes: SimpleChanges): void {
		if (changes['users']) {
			this.capitalizeUserNames()
		}
	}

	private capitalizeUserNames(): void {
		if (this.users) {
			this.capitalizedUsers = this.users
				.filter(user => user && user.name)
				.map(user => this.getCapitalizeFirstWord(user.name));
		}
	}

	getCapitalizeFirstWord(name: string): string {
		if (!name) return ''
		// CHAR AT IS FASTER THAN SUBSTRING
		return name.split(' ').map(n => n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()).join(' ');

	}
}
