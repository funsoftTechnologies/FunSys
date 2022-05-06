package com.funsoft.spring.matrix;

import org.springframework.stereotype.Service;

@Service
public class MatrixService {

    private final int[][] matrix2;

    public MatrixService() {
        this.matrix2 = new int[91][191];

        for (int j = 0; j < 91; j++) {
            for (int i = 0; i < 191; i++) {
                this.matrix2[j][i] = 0;
            }
        }
    }

    public int[][] postMatrix(int[][] matrix) {

        for (int j = 0; j < 91; j++) {
            for (int i = 0; i < 191; i++) {
                this.matrix2[j][i] = 0;
            }
        }
            for (int j = 0; j < 91; j++) {
                for (int i = 0; i < 191; i++) {

                    if(matrix[j][i]==1) {

                        int nombre = 0;

                        for (int y = j - 1; y < j + 2; y++) {

                            for (int x = i - 1; x < i + 2; x++) {

                                if (matrix[y][x] == 1) {
                                    nombre = nombre+1;
                                }

                            }

                        }

                        nombre = nombre-1;

                        if(nombre<2 || nombre>3) {
                            this.matrix2[j][i] = 0;
                        }

                        if(nombre==2 || nombre==3) {
                            this.matrix2[j][i] = 1;
                        }
                    }

                    if(matrix[j][i]==0) {

                        int nombre = 0;

                        for (int y = j - 1; y < j + 2; y++) {

                            for (int x = i - 1; x < i + 2; x++) {

                                if(x>0 && x<191 && y>0 && y<91) {
                                    if (matrix[y][x] == 1) {
                                        nombre = nombre+1;
                                    }
                                }
                            }

                        }
                        if(nombre==3) {
                            this.matrix2[j][i] = 1;
                        }
                    }
                }
            }

        matrix = this.matrix2.clone();
//        for (int j = 0; j < 8; j++) {
//            System.out.println();
//
//            for (int i = 0; i < 15; i++) {
//                System.out.print(matrix[j][i]);
//            }
//        }

        return matrix;
    }

}
