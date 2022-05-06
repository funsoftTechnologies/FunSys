package com.funsoft.spring.matrix;

import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/matrix")
public class MatrixController {

    private final MatrixService matrixService;

    public MatrixController(MatrixService matrixService) {
        this.matrixService = matrixService;
    }

    @PostMapping
    public int[][] postMatrix(@RequestBody int[][] matrix) {
        return this.matrixService.postMatrix(matrix);
    }
}
