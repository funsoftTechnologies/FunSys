import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from "rxjs";
import { MatDialogRef } from '@angular/material/dialog';
import { DBOperation } from "../../../shared/enum";

import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {

  articless$!: Observable<Article[]>;

  dbOps!: DBOperation;
  modalTitle!: string;
  modalBtnTitle!: string;

  article!: Article;
  articleForm!: FormGroup;


  formErrors = {
    name: '',
    price: '',
    sign: '',
  };

  validationMessages = {
    name: { maxlength: 'First Name cannot be more than 50 characters long.', required: 'First Name is required.' },
    price: { maxlength: 'Last Name cannot be more than 50 characters long.', required: 'Last Name is required.' },
    sign: { email: 'Invalid email format.', required: 'Email is required.' },
  };

  constructor(private fb: FormBuilder,
              private articleService: ArticleService,
              public dialogRef: MatDialogRef<ArticleDetailComponent>) {
  }

  ngOnInit(): void {

    this.articless$ = this.articleService.getAll();

    this.articleForm = this.fb.group({
      id:    [''],
      name:  ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', [Validators.required, Validators.maxLength(50)]],
      sign:  ['', Validators.required],
    });

    if (this.dbOps === DBOperation.create) {
      this.articleForm.reset();
    } else {
      console.log(this.article);
      this.articleForm.setValue(this.article);
    }

    this.SetControlsState(this.dbOps !== DBOperation.delete);
  }

  SetControlsState(isEnable: boolean) {
    isEnable ? this.articleForm.enable() : this.articleForm.disable();
  }

  onSubmit() {
    console.log(this.articleForm.value);
    switch (this.dbOps) {

      case DBOperation.create:
        this.articleService.post(this.articleForm.value).subscribe(
          data => this.dialogRef.close('success'),
          error => this.dialogRef.close('error')
        );
        break;

      case DBOperation.update:
        this.articleService.put(this.articleForm.value).subscribe(
          data => this.dialogRef.close('success'),
          error => this.dialogRef.close('error')
        );
        break;

      case DBOperation.delete:
        this.articleService.delete(this.articleForm.value.id).subscribe(
          data => this.dialogRef.close('success'),
          error => this.dialogRef.close('error')
        );
        break;
    }
  }
}
