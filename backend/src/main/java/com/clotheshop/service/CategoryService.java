package com.clotheshop.service;

import com.clotheshop.dto.CategoryDtos;
import com.clotheshop.entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAll();
    Category getById(Long id);
    Category create(CategoryDtos.CategoryRequest request);
    Category update(Long id, CategoryDtos.CategoryRequest request);
    void delete(Long id);
}
