import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  //this is a form submit for the contact to work correctly
  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const message = form.value.message;

}
}
