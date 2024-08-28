import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailingService } from '../services/mailing.service';
import { HttpClientModule } from '@angular/common/http';

const ENTER_KEY_ASCII = 13;

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [CommonModule, FormsModule,
    HttpClientModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MailingService]

})
export class UserInputComponent {

  @Output() sendMessageEmitter = new EventEmitter<string>()
  message: string = ""

  constructor(private mailingService: MailingService) {

  }
  sendMessage() {
    if (this.message) {
      this.sendMessageEmitter.emit(this.message)
    }
  }

  onKeyUp($event: any) {
    if ($event.which === ENTER_KEY_ASCII) {
      this.sendMessage()
      this.message = ""
    }
  }
  sendEmail() {
    this.mailingService.sendEmail(this.message).subscribe({
      next: (response) => {
        alert('Email successufuly sending');
    },
      error: (error) => {
        alert('There was an error in retrieving data from the server');
      }


  })
  this.message=''
}
}