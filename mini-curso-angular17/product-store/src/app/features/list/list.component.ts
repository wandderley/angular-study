import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs';

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


@Component({
  selector: 'app-list',
  imports: [
    CardComponent,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  productsService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);

  products: Product[] = [];

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(()=>{
          this.productsService.getAll().subscribe((products) => {
            this.products = products;
          });
        })
      });
  }
}