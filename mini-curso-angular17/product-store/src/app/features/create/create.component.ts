import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-create',
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  productsService = inject(ProductsService);
  matSnackbar = inject(MatSnackBar);
  router = inject(Router);

  onSubmit(product: Product){  
    this.productsService.post(product).subscribe(() => {
      this.matSnackbar.open('Produto criado com sucesso!', 'OK');
      this.router.navigateByUrl('/');
    })
  }
}
