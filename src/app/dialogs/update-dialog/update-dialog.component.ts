import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/interfaces/contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  updateContact!: Contact;
  contactToUpdate!: Contact;

  updateForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  constructor(public dialogRef: MatDialogRef<UpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Contact, private contactService: ContactsService) {
    this.contactToUpdate = data;
  }

  ngOnInit() {
    this.updateForm.controls['firstName'].setValue(this.contactToUpdate.firstName);
    this.updateForm.controls['lastName'].setValue(this.contactToUpdate.lastName);
    this.updateForm.controls['phoneNumber'].setValue(this.contactToUpdate.phoneNumber);
    this.updateForm.controls['address'].setValue(this.contactToUpdate.address);
    console.log(this.contactToUpdate);
  }

  onSubmit() {
    this.updateContact = {
      id: this.contactToUpdate.id,
      firstName: this.updateForm.controls['firstName'].value as string,
      lastName: this.updateForm.controls['lastName'].value as string,
      phoneNumber: this.updateForm.controls['phoneNumber'].value as string,
      address: this.updateForm.controls['address'].value as string
    };

    this.contactService.updateContact(this.updateContact).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Contact updated successfully');
      }
    });

    this.dialogRef.close();
  }
}
