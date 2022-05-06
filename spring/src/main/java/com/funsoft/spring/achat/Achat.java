package com.funsoft.spring.achat;

import com.funsoft.spring.ligneDepense.LigneDepense;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "achat")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Achat {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private String dateAchat;
    private String sign;
    private double total;
    @OneToMany
    private List<LigneDepense> ligneDepenses = new ArrayList<>();

//    public long getId() {
//        return id;
//    }
//
//    public void setId(long id) {
//        this.id = id;
//    }
//
//    public String getDateAchat() {
//        return dateAchat;
//    }
//
//    public void setDateAchat(String date) {
//        this.dateAchat = date;
//    }
//
//    public List<LigneDepense> getLigneDepenses() {
//        return ligneDepenses;
//    }
//
//    public void setLigneDepenses(List<LigneDepense> ligneDepenses) {
//        this.ligneDepenses = ligneDepenses;
//    }
//
//    public String getSign() {
//        return sign;
//    }
//
//    public void setSign(String sign) {
//        this.sign = sign;
//    }
//
//    public double getTotal() {
//        return total;
//    }
//
//    public void setTotal(double total) {
//        this.total = total;
//    }
}





