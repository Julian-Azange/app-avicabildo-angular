import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-empty-tables-modal',
  templateUrl: './empty-tables-modal.component.html',
  styleUrls: ['./empty-tables-modal.component.css']
})
export class EmptyTablesModalComponent {
  constructor(private dialogRef: MatDialogRef<EmptyTablesModalComponent>) { }

  onCancel() {
    this.dialogRef.close(false);
  }
}
