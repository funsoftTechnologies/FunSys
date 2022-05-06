package com.funsoft.spring.ligneDepense;

import com.funsoft.spring.article.Article;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "lignedepense")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LigneDepense {

    @Id @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private long id;
    private int quantite;
    private double total;
    @OneToOne private Article article;

//    public long getId() {
//        return id;
//    }
//
//    public void setId(long id) {
//        this.id = id;
//    }
//
//    public int getQuantite() {
//        return quantite;
//    }
//
//    public void setQuantite(int quantite) {
//        this.quantite = quantite;
//    }
//
//    public double getTotal() {
//        return total;
//    }
//
//    public void setTotal(double total) {
//        this.total = total;
//    }
//
//    public Article getArticle() {
//        return article;
//    }
//
//    public void setArticle(Article article) {
//        this.article = article;
//    }
}
