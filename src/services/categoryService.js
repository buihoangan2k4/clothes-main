import { axiosConfig } from "../components/utils/apiFunction";

class CategoryService {
    async getCategories() {
        const response = await axiosConfig.get("/categories/");
        return response.data;
    }

    async getCategoryById(id) {
        const response = await axiosConfig.get("/categories/" + id);
        return response.data;
    }

    async deleteCategory(id) {
        const response = await axiosConfig.delete("/categories/" + id);
        return response.data;
    }

    async createCategory(category) {
        const response = await axiosConfig.post("/categories", category);
        return response.data;
    }

    async updateCategory(category, id) {
        const response = await axiosConfig.put("/categories/" + id, category);
        return response.data;
    }
}

const categoryService = new CategoryService();
export default categoryService;
