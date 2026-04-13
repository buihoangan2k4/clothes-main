import { axiosConfig } from "../components/utils/apiFunction";

class ProductService {
    async getProducts() {
        const response = await axiosConfig.get("/products/available", {
            params: {
                page: 1,
                pageSize: 100,
            },
        });
        return response.data;
    }
    async getProductsAdmin(search) {
        const response = await axiosConfig.get("/products/search", {
            params: {
                page: 1,
                pageSize: 100,
                search: search,
            },
        });
        return response.data;
    }

    async getProductsByCategory(categoryId) {
        const response = await axiosConfig.get(
            "/products?category=" + categoryId
        );
        return response.data;
    }

    async getProductById(id) {
        const response = await axiosConfig.get("/products/" + id);
        return response.data;
    }

    async getProductsBySearch(search, categoryId) {
        let url = "/products/search";
        if (search || categoryId) {
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (categoryId) params.append("categoryId", categoryId);
            const newParams = params.toString();
            url += `?${newParams}`;
        }
        const response = await axiosConfig.get(url);
        return response.data;
    }

    async createProduct(product) {
        const response = await axiosConfig.post("/products/", product);
        return response.data;
    }

    async updateProduct(product, id) {
        const response = await axiosConfig.put("/products/" + id, product);
        return response.data;
    }

    async deleteProduct(id) {
        const response = await axiosConfig.delete("/products/delete-products", {
            data: { productIds: [id] },
        });
        return response.data;
    }
}

const productService = new ProductService();
export default productService;
