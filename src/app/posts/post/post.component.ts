import { Article } from './../../interfaces/article';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  article: Article;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // ver.1
    // this.route.paramMap.subscribe(paramMap => {
    //   console.log(paramMap.get('id'));
    // });

    // ver.2 使用 map operator
    // this.route.paramMap.pipe(
    //   map(paramMap => paramMap.get('id'))
    // ).subscribe(id => console.log(id));

    // ver.3 巢狀 subscribe
    // this.route.paramMap
    //   .pipe(map((paramMap) => paramMap.get('id')))
    //   .subscribe((id) => {
    //     this.postService.getArticle(id).subscribe((result) => {
    //       this.article = result.article;
    //       console.log(this.article);
    //     });
    //   });

    // ver.4 搭配 switchMap 以避免巢狀 subscribe
    this.route.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id')),
        switchMap((id) => this.postService.getArticle(id))
      )
      .subscribe((result) => {
        this.article = result.article;
      });
  }
}
