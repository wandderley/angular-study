import { ChangeDetectionStrategy, Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar Produto</h2>
    <mat-dialog-content>
      Tem certeza que deseja deletar este produto?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNo()">Não</button>
      <button mat-button (click)="onYes()" cdkFocusInitial>Sim</button>
  </mat-dialog-actions>
  `,
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ConfirmationDialogComponent {

  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false)
  }
  onYes() {
    this.matDialogRef.close(true)
  }
}

@Injectable({
  providedIn: 'root'
})

export class ConfirmationDialogService {
  matDialog = inject(MatDialog);

  constructor() { }

  openDialog(): Observable<boolean> {
    return this.matDialog
      .open(ConfirmationDialogComponent).afterClosed()
  }
}
