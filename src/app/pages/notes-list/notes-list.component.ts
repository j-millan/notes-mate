import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }),
        animate(50, style({
            height: '*',
            'margin-bottom': '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingLeft: '*',
            paddingRight: '*',
        })),
        animate(68),
      ]),
      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(0.95)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          'margin-bottom': 0
        }))
      ]),
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height:0
          }),
          stagger(100, [animate('0.2s ease')])
        ], { optional: true })
      ])
    ])
  ],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notes = this.notesService.all();
    this.filteredNotes = this.notes;
  }

  deleteNote(id: number): void {
    this.notesService.delete(id);
  }

  filter(query: string): void {
    query = query.toLowerCase().trim();
    let results = Array<Note>();
    
    let terms: String[] = query.split(' ');
    terms = this.removeDuplicates(terms);

    terms.forEach(word => {
      let relevant: Note[] = this.relevantNotes(word);
      results = [...results, ...relevant];
    });
    
    let uniqueResults = this.removeDuplicates(results);
    
    this.filteredNotes = uniqueResults;    
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    const uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  relevantNotes(query: any): Array<Note> {
    query = query.toLowerCase().trim();
    let relevant = this.notes.filter(note => note.title.toLowerCase().includes(query) || note.body && note.body.toLowerCase().includes(query));
    return relevant;
  }
}
