import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper';

import { ProfilService } from './profil.service';
import { AlertService } from "../../../alert/alert.service";
import { User } from "../user";
import { BaseUrl } from "../../../shared/baseUrl";


@Component({
  selector: 'app-identity-form',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
  user: User;
  urlPhoto = BaseUrl.URL + '/profil/photo/png/unknown.png';

  isPatchUsername = false;

  isImageLoading;
  previewImage: any;
  previewImageBackup: any;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;

  url: string | ArrayBuffer;
  currentFileUpload: File = null;
  submitted = false;

  usernameFormControl = new FormControl('');

  profileForm = this.formBuilder.group({
    id: [''],
    username: [''],
    email: [''],
    photoname: [''],
    actived: [''],
    roles: [''],
  });

  @ViewChild(ImageCropperComponent, {static: false}) imageCropper: ImageCropperComponent;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private diskService: ProfilService,
              private profilService: ProfilService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    const username = JSON.parse(localStorage.getItem('userName'));
    this.profilService.getProfilByUsername(username).subscribe(value => {
        this.user = value;
        this.usernameFormControl.setValue(this.user.username);
        console.log(this.user);

        this.isImageLoading = true;

        this.profilService.getProfilPhoto(this.user.photoname).subscribe(data => {
          console.log(data);
          this.previewImage = "data:image/png;base64,"+data;
          this.previewImageBackup = this.previewImage;
          this.isImageLoading = false;
        }, error => {
          this.previewImage = this.urlPhoto;
          this.isImageLoading = false;
          console.log(error);
        });

          this.profileForm.setValue(this.user);
    });
  }

  onSubmit() {
    let file = this.croppedImage;
    let filename = this.user.username + '.png';
    let id = this.user.id;

    this.profilService.updateProfil(file, filename, id).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.router.navigate(['/profil']).then(r => {
            console.log('Profil updated!: ' + r);
            this.alertService.success('Profil updated!');
          });
        }
      },error =>  {
        this.alertService.error('Error in updated profil!');
        console.log('Error in updated profil!')
      })
    this.onReset();
  }

  onPatchUsername($event: KeyboardEvent) {
    if($event.code == 'Enter') {
    console.log(this.usernameFormControl.value)
      let id = this.user.id; let username = this.usernameFormControl.value;
      this.profilService.patchUsername(id, username);
    }

  }

  fileChangeEvent(event: any): void {
    this.currentFileUpload = event.target.files.item(0);
    console.log(this.currentFileUpload);
    this.imageChangedEvent = event;
    this.showCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.previewImage = event.base64;
    this.croppedImage = base64ToFile(event.base64);
    console.log('this.croppedImage: ' + this.croppedImage);
    console.log('this.previewImage: ' + this.previewImage);
  }

  imageLoaded($event: LoadedImage) {
    console.log('Image loaded');
  }

  cropperReady() {
    console.log('Cropper ready');
  }

  loadImageFailed() {
    this.alertService.error('Problème de chargement, verifier le format du fichier');
  }

  openInput() {
    document.getElementById('fileInput').click();
  }

  onReset() {
    this.showCropper = false;
    this.imageChangedEvent = null;

    if(this.previewImageBackup)
      this.previewImage = this.previewImageBackup;
    else
      this.previewImage = this.urlPhoto;
  }
}
