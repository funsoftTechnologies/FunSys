package com.funsoft.spring.appareil;

import org.springframework.web.bind.annotation.*;

@RestController
//@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping("/appareils")
public class AppareilController {

    AppareilRepository appareilRepository;

    public AppareilController(AppareilRepository appareilRepository) {
        this.appareilRepository = appareilRepository;
    }


    @GetMapping
    public Iterable<Appareil> getAllAppareils() {
        return appareilRepository.findAll();
    }

    @GetMapping("/{name}")
    public Iterable<Appareil> getByName(@PathVariable(value = "name") String name) {
        return appareilRepository.findAppareilssByNameContainingIgnoreCase(name);
    }

    @PostMapping
    public Appareil addNewArticle(@RequestBody Appareil appareil) {
        return this.appareilRepository.save(appareil);
    }

    @PutMapping
    public Appareil updateEmployee(@RequestBody Appareil appareil) {
        return this.appareilRepository.save(appareil);
    }

    @DeleteMapping("/{id}")
    public void deleteArticle(@PathVariable(value = "id") Long id) {
        if(appareilRepository.findById(id).isPresent()){
            Appareil appareil = appareilRepository.findById(id).get();
            appareilRepository.delete(appareil);
        }
    }

}