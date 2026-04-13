package com.clotheshop.controller;

import com.clotheshop.dto.ApiResponse;
import com.clotheshop.dto.CategoryDtos;
import com.clotheshop.entity.Category;
import com.clotheshop.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping({"", "/"})
    public ApiResponse<List<Category>> all() {
        return new ApiResponse<>("OK", categoryService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<Category> one(@PathVariable Long id) {
        return new ApiResponse<>("OK", categoryService.getById(id));
    }

    @PostMapping({"", "/"})
    public ApiResponse<Category> create(@Valid @RequestBody CategoryDtos.CategoryRequest request) {
        return new ApiResponse<>("Created", categoryService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<Category> update(@PathVariable Long id, @Valid @RequestBody CategoryDtos.CategoryRequest request) {
        return new ApiResponse<>("Updated", categoryService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return new ApiResponse<>("Deleted", "success");
    }
}
