package com.funsoft.spring.ligneDepense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "restLigneDepenses", path = "restLigneDepenses")
public interface LigneDepenseRepository extends JpaRepository<LigneDepense, Long> {
}
