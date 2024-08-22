import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {
  toggle = false;
  @Output() toggleChat = new EventEmitter<string>()

  hide(){
    this.toggle = !this.toggle;
    window?.top?.postMessage(this.toggle.toString(), '*')
    this.toggleChat.emit(this.toggle.toString())
  }
}

