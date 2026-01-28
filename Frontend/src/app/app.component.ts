import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './components/category-list.component';
import { ProductListComponent } from './components/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CategoryListComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product Management System';
  activeTab: string = 'categories';

  switchTab(tab: string): void {
    this.activeTab = tab;
  }
}