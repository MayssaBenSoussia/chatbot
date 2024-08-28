import { Component ,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { UserInputComponent } from './user-input/user-input.component';
import { Message, MESSAGE_TYPE, OpenAIResponse } from './utility/constants';
import { v4 as uuidv4 } from 'uuid';
import { HuggingFaceService } from './services/huggingface.service';
import { HttpClientModule , HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HeaderComponent, 
    MessagePanelComponent, 
    UserInputComponent, 
    HttpClientModule,
    
  ],
  providers: [HuggingFaceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'mychatbot';
  data: Message[] = [];
  loading: boolean = false
  hide: boolean = false;

  constructor(private huggingFaceService: HuggingFaceService) {}

  toggleChat($event: string){
    this.hide = $event === "true"? true: false;
  }

  getMessage($event: string) {
    if (!this.loading) {
      const userMessage = this.createMessage($event, MESSAGE_TYPE.USER);
      this.data = [...this.data, userMessage];
      this.loading = true;
  
      this.huggingFaceService.getCompletion($event).subscribe(
        (response: any) => {
          console.log("resop",response)
          const assistantMessage = this.createMessage(
            response[0].generated_text.trim() || 'No response received',
            MESSAGE_TYPE.ASSISTANT
          );
          this.data = [...this.data, assistantMessage];
          this.loading = false;
        },
        (error: HttpErrorResponse) => { // Explicitly type the error parameter
          console.error('Error during API call:', error.message);
          this.loading = false;
        }
      );
    } else {
      const userMessage = this.createMessage($event, MESSAGE_TYPE.USER);
      this.data = [...this.data, userMessage];
    }
  }

  createMessage(content: string, type: MESSAGE_TYPE): Message{
    return {
      id: uuidv4(),
      sender: type,
      content: content,
      dateTime: new Date(),
    }
  }

  public debounce(func: Function, timeout = 400){
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
}

