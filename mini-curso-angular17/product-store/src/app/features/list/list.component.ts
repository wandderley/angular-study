import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';


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
  confirmationDialogService = inject(ConfirmationDialogService);

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
    this.confirmationDialogService
      .openDialog()
      .pipe(filter((answer) => answer === true))
      .subscribe(()=> {
        this.productsService.delete(product.id).subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.products = products;
          });
      })      
    });
  }
}