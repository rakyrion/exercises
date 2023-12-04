import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, concat, concatMap, of, takeUntil, timer } from "rxjs";

@Component({
	selector: 'app-users',
	template: `
    <input type="text" [(ngModel)]="query" (ngModelChange)="querySubject.next($event)">
    <div *ngFor="let user of users">
        {{ user.email }}
    </div>
  `
})
export class AppUsers implements OnInit, OnDestroy {
	// INIT A NEW OBSERVABLE TO USE ON DESTROY
	private destroy$ = new Subject<void>();

	query = '';
	querySubject = new Subject<string>();

	users: { email: string; }[] = [];

	constructor(
		private userService: any
	) {
	}

	ngOnInit(): void {
		concat(
			of(this.query),
			this.querySubject.asObservable()
		).pipe(
			concatMap(q =>
				timer(0, 60000).pipe(
					this.userService.findUsers(q)
				)
			)
		// ADD NEW PIPE THAT WILL CANCEL ALL SUBSCRIPTIONS ON COMPONENT DESTROY
		).pipe(
			takeUntil(this.destroy$)
		).subscribe({
			next: (res) => this.users = res as { email: string }[]
		});
	}

	// COMPLETE 
	ngOnDestroy(): void {
		// COMPLETE DESTROY AND QUERYSUBJECT OBSERVABLES
		this.destroy$.next()
		this.destroy$.complete();
		this.querySubject.complete()
	}
}
