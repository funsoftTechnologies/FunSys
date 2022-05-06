package com.funsoft.spring.ligneDepense;

import com.funsoft.spring.article.Article;
import com.funsoft.spring.article.ArticleRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/ligneDepenses")
public class LigneDepenseController {

    LigneDepenseRepository ligneDepenseRepository;
    ArticleRepository articleRepository;

    public LigneDepenseController(LigneDepenseRepository ligneDepenseRepository, ArticleRepository articleRepository) {
        this.ligneDepenseRepository = ligneDepenseRepository;
        this.articleRepository = articleRepository;
    }

    @GetMapping
    public Iterable<LigneDepense> getAllLigneDepenses() {
        return ligneDepenseRepository.findAll();
    }

    @PostMapping
    public LigneDepense addNewLigneDepense(@RequestBody LigneDepense ligneDepense) {
        if(this.articleRepository.findById(ligneDepense.getArticle().getId()).isPresent()) {
            Article article = this.articleRepository.findById(ligneDepense.getArticle().getId()).get();
            LigneDepense ld = new LigneDepense();
            ld.setArticle(article);
        }
        return this.ligneDepenseRepository.save(ligneDepense);
    }

    @PutMapping
    public LigneDepense updateLigneDepense(@RequestBody LigneDepense ligneDepense) {
        return this.ligneDepenseRepository.save(ligneDepense);
    }

    @DeleteMapping("/{id}")
    public void deleteLigneDepense(@PathVariable(value = "id") Long id) {
        if(ligneDepenseRepository.findById(id).isPresent()){
            LigneDepense ligneDepense = ligneDepenseRepository.findById(id).get();
            ligneDepenseRepository.delete(ligneDepense);
        }
    }
}