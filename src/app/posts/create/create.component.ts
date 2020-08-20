import { Router } from '@angular/router';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  tags = this.formBuilder.array([
    this.formBuilder.control('HTML'),
    this.formBuilder.control('CSS'),
    this.formBuilder.control('JavaScript'),
  ]);

  post = this.formBuilder.group({
    title: this.formBuilder.control('', Validators.required),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    tags: this.tags,
  });

  get title(): AbstractControl {
    return this.post.get('title');
  }

  get body(): AbstractControl {
    return this.post.get('body');
  }

  // get tags(): FormArray {
  //   return this.post.get('tags') as FormArray;
  // }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  addTag(tag: string): void {
    this.tags.push(this.formBuilder.control(tag));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  createPost(): void {
    this.postService.createArticle(this.post.value).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
