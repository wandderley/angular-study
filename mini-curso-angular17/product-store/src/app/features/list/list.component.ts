import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  imports: [CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  productsService = inject(ProductsService);

  products: Product[] = []

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
}
