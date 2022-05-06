package com.funsoft.spring.appareil;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


@RepositoryRestResource(collectionResourceRel = "restAppareils", path = "restAppareils")
public interface AppareilRepository extends JpaRepository<Appareil, Long> {
    List<Appareil> findAppareilssByNameContainingIgnoreCase(String name);
}
