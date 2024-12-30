import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: any;
  constructor(private productService: ProductService) {}
}
