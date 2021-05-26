import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent implements OnInit {

  /**
   * This will inject genre name and description to class
   * at movie-card component and will be used in dialog to view genre
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      name: string;
      description: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
