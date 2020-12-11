import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { NotesService } from '../shared/notes.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() title!: string;
  @Input() body!: string;
  @Input() noteId!: number;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter();

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2,) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewebleHeight = parseInt(style.getPropertyValue('height'), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewebleHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
      console.log(23232);
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  onXButtonClick(): void {
    this.deleteEvent.emit();
  }
}
