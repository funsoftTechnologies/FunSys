package com.funsoft.spring.achat;

import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/achats")
public class AchatController {

    AchatRepository achatRepository;
    AchatService achatService;

    public AchatController(AchatRepository achatRepository, AchatService achatService) {
        this.achatRepository = achatRepository;
        this.achatService = achatService;
    }

    @GetMapping
    public Iterable<Achat> getAllAchats() {
        return achatRepository.findAll();
    }

    @GetMapping("/{date}")
    public Iterable<Achat> getByDate(@PathVariable(value = "date") String date) {
        return achatRepository.findAchatsByDateAchat(date);
    }

    @PostMapping
    public Achat addNewAchat(@RequestBody Achat achat) {
        return this.achatService.save(achat);
    }

    @PutMapping
    public Achat updateAchat(@RequestBody Achat achat) {
        return this.achatRepository.save(achat);
    }

    @DeleteMapping("/{id}")
    public void deleteAchat(@PathVariable(value = "id") Long id) {
        this.achatService.delete(id);
    }

}