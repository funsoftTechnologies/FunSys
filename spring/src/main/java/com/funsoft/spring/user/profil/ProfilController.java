package com.funsoft.spring.user.profil;

import com.funsoft.spring.user.AppUser;
import com.funsoft.spring.user.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

@RestController
@RequestMapping("/profil")
public class ProfilController {

	@Autowired
	private ProfilService profilService;

	@Autowired
	private AppUserRepository appUserRepository;

//	private final String path = "F://IdeaProjects/FunSys/data/photos/";
	private final String path = "F://Funsoft Technologies/Java/FunSys/data/photos/";

	@GetMapping("/{username}")
	public AppUser getByUsername(@PathVariable(value = "username") String username) {
		return this.profilService.findByUsername(username);	}


	@PostMapping
	public AppUser register(@RequestBody ProfilForm profilForm) {
		return this.profilService.saveUser(profilForm.getUsername(), profilForm.getEmail(), "unknown.png", profilForm.getPassword(), profilForm.getConfirmedPassword()); }


	@PutMapping
	public AppUser put(@RequestBody ProfilForm profilForm) {
		return this.profilService.updateUser(profilForm.getUsername(), profilForm.getEmail(), profilForm.getPhotoname()); }


//	@PatchMapping("/{id}/{filename}")
//	public ResponseEntity<AppUser> patchFilename(@PathVariable long id, @PathVariable String filename) {
//		try {
//			AppUser user = appUserRepository.getOne(id);
//			user.setPhotoname(filename);
//			return new ResponseEntity<>(appUserRepository.save(user), HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); }
//	}

	@PatchMapping("/{id}/{username}")
	public ResponseEntity<AppUser> patchUsername(@PathVariable long id, @PathVariable String username) {
		try {
			AppUser user = appUserRepository.getOne(id);
			user.setUsername(username);
			user.setPhotoname(username + ".png");
			return new ResponseEntity<>(appUserRepository.save(user), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); }
	}

	@GetMapping(value = "/photo/byte/{filename}")
	public String get(@PathVariable("filename") String filename) throws IOException {
		return Base64.getEncoder().encodeToString(Files.readAllBytes(Paths.get(this.path + filename))); }


	@PostMapping(value = "/photo")
	public ResponseEntity<Object> post(@RequestPart("file") MultipartFile multipartFile) throws IOException {
		System.out.println(multipartFile.getOriginalFilename());
		multipartFile.transferTo(new File(this.path + multipartFile.getOriginalFilename()));
		return ResponseEntity.ok().build();	}


	@GetMapping(value = "/photo/png/{photoname}",produces = MediaType.IMAGE_PNG_VALUE)
	public byte[] get2(@PathVariable("photoname") String photoname) throws IOException {
//		return Files.readAllBytes(Paths.get(this.path +  photoname));
		return Files.readAllBytes(Paths.get("F://IdeaProjects/FunSys/data/photos/" + photoname));
	}
}
