import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent implements OnInit {

  /**
   * This will inject movie's name, image path, description, director and genre to class
   * at movie-card component and will be used in dialog to view movie's details
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      title: string;
      imagepath: string;
      description: string;
      director: string;
      genre: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
