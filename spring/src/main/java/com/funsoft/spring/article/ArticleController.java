package com.funsoft.spring.article;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
//@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping("/articles")
public class ArticleController {

    ArticleRepository articleRepository;

    public ArticleController(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }


    @GetMapping
    public Iterable<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    @GetMapping("/{name}")
    public Iterable<Article> getByName(@PathVariable(value = "name") String name) {
        return articleRepository.findArticlesByNameContainingIgnoreCase(name);
    }

    @PostMapping
    public Article addNewArticle(@RequestBody Article article) {
        return this.articleRepository.save(article);
    }

    @PutMapping
    public Article updateEmployee(@RequestBody Article article) {
        return this.articleRepository.save(article);
    }

    @DeleteMapping("/{id}")
    public void deleteArticle(@PathVariable(value = "id") Long id) {
        if(articleRepository.findById(id).isPresent()){
            Article article = articleRepository.findById(id).get();
            articleRepository.delete(article);
        }
    }

}