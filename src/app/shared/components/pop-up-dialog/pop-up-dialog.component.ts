import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.scss']
})
export class PopUpDialogComponent {

  constructor (
    public dialogRef: MatDialogRef<PopUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public text: string
  ) { }

}
