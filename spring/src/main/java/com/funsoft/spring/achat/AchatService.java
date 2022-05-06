package com.funsoft.spring.achat;

import com.funsoft.spring.ligneDepense.LigneDepense;
import com.funsoft.spring.ligneDepense.LigneDepenseRepository;
import org.springframework.stereotype.Service;

@Service
public class AchatService {

    AchatRepository achatRepository;
    LigneDepenseRepository ligneDepenseRepository;

    public AchatService(AchatRepository achatRepository, LigneDepenseRepository ligneDepenseRepository) {
        this.achatRepository = achatRepository;
        this.ligneDepenseRepository = ligneDepenseRepository;
    }

    public Achat save(Achat achat) {
        this.ligneDepenseRepository.saveAll(achat.getLigneDepenses());
        return this.achatRepository.save(achat);
    }

    public void delete(Long id) {
        if(achatRepository.findById(id).isPresent()){
            Achat achat = achatRepository.findById(id).get();
            achatRepository.delete(achat);
        }
    }
}
