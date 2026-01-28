export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  categoryName?: string;
}

export interface ProductResponse {
  data: Product[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
