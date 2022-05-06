package com.funsoft.spring.article;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


@RepositoryRestResource(collectionResourceRel = "restArticles", path = "restArticles")
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findArticlesByNameContainingIgnoreCase(String name);
}
