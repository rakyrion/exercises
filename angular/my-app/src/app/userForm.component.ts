import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: 'app-user-form',
	template: `
    <form [formGroup]="userForm" (ngSubmit)="doSubmit()">
        <input type="text" placeholder="email" formControlName="email">
        <input type="text" placeholder="name" formControlName="name">
        <input type="date" placeholder="birthday" formControlName="birthday">
        <input type="number" placeholder="zip" formControlName="zip">
        <input type="text" placeholder="city" formControlName="city">
		<button type="submit">Submit</button>
    </form>
  `
})
export class AppUserForm {

	@Output()
	event = new EventEmitter<{ email: string; name: string; birthday: Date; address: { zip: number; city: string; }; }>;

	// DECLARE FORM GROUP
	userForm: FormGroup

	constructor(
		private formBuilder: FormBuilder
	) {
		// INITIALIZE USER FORM AND SET BASIC VALIDATORS
		this.userForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			name: ['', Validators.required],
			birthday: [''],
			zip: [''],
			city: ['']
		})
	}

	doSubmit(): void {
		// FIRST CHECK IF FORM IS VALIDA (ALL VALIDATORS HAVE BEEN PASSED)
		if (this.userForm.valid) {
			const formData = {
				email: this.userForm.value.email,
				name: this.userForm.value.name,
				birthday: this.userForm.value.birthday,
				address: {
					zip: this.userForm.value.zip,
					city: this.userForm.value.city
				}
			}
			// EMIT EVENT WITH FORMDATA
			this.event.emit(formData);
		}

	}
}
