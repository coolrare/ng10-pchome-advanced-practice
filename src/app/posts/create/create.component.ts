import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { timestamp } from 'rxjs/operators';

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
    title: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control(''),
    tags: this.tags,
  });

  // get tags(): FormArray {
  //   return this.post.get('tags') as FormArray;
  // }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  addTag(tag: string): void {
    this.tags.push(this.formBuilder.control(tag));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }
}
