package com.clotheshop.service.impl;

import com.clotheshop.dto.CategoryDtos;
import com.clotheshop.entity.Category;
import com.clotheshop.repository.CategoryRepository;
import com.clotheshop.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public Category create(CategoryDtos.CategoryRequest request) {
        return categoryRepository.save(Category.builder()
                .categoriesName(request.getCategoriesName())
                .description(request.getDescription())
                .build());
    }

    @Override
    public Category update(Long id, CategoryDtos.CategoryRequest request) {
        Category category = getById(id);
        category.setCategoriesName(request.getCategoriesName());
        category.setDescription(request.getDescription());
        return categoryRepository.save(category);
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
