package com.funsoft.spring.achat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "restAchats", path = "restAchats")
public interface AchatRepository extends JpaRepository<Achat, Long> {
    List<Achat> findAchatsByDateAchat(String date);
}
