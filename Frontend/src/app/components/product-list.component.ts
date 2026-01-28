import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  // same form used for create + edit
  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    category_id: 0,
  };

  selectedProduct: Product | null = null;
  isEditing = false;

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalRecords = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadProducts(): void {
    this.productService
      .getAllProducts(this.currentPage, this.pageSize)
      .subscribe((res) => {
        this.products = res.data.map((p: any) => ({
          id: p.ProductId,
          name: p.ProductName,
          description: p.description,
          price: Number(p.price),
          category_id: p.CategoryId,
          categoryName: p.CategoryName,
        }));

        this.currentPage = res.pagination.page;
        this.totalPages = res.pagination.totalPages;
        this.totalRecords = res.pagination.total;
      });
  }

  // CREATE + UPDATE (same method like Category)
  saveProduct(): void {
    if (
      !this.newProduct.name ||
      !this.newProduct.category_id ||
      this.newProduct.price <= 0
    ) {
      alert('All fields are required');
      return;
    }

    // UPDATE
    if (this.isEditing && this.selectedProduct?.id) {
      this.productService
        .updateProduct(this.selectedProduct.id, this.newProduct)
        .subscribe(() => {
          alert('Product updated successfully');
          this.loadProducts();
          this.resetForm();
        });
    }
    // CREATE
    else {
      this.productService.createProduct(this.newProduct).subscribe(() => {
        alert('Product created successfully');
        this.loadProducts();
        this.resetForm();
      });
    }
  }

  editProduct(product: Product): void {
    this.selectedProduct = product;
    this.newProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category_id,
    };
    this.isEditing = true;
  }

  deleteProduct(id?: number): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  resetForm(): void {
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      category_id: 0,
    };
    this.selectedProduct = null;
    this.isEditing = false;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }
}
