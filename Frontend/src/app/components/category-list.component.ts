import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  isEditing = false;

  newCategory: Category = { name: '', description: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  createCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe(() => {
      this.loadCategories();
      this.newCategory = { name: '', description: '' };
    });
  }

  editCategory(category: Category): void {
    this.selectedCategory = { ...category };
    this.isEditing = true;
  }

  updateCategory(): void {
    if (!this.selectedCategory?.id) return;

    this.categoryService
      .updateCategory(this.selectedCategory.id, this.selectedCategory)
      .subscribe(() => {
        this.loadCategories();
        this.cancelEdit();
      });
  }

  deleteCategory(id?: number): void {
    if (!id) return;

    this.categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }

  cancelEdit(): void {
    this.selectedCategory = null;
    this.isEditing = false;
  }
}
