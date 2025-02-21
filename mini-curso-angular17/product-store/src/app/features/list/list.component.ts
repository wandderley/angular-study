import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  productsService = inject(ProductsService);

  products: Product[] = []

  ngOnInit(){
    this.productsService.getAll().subscribe((products)=>{
      this.products = products;
    });
  }
}
