import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  articles: Article[];

  constructor(private postsService: PostService) { }

  ngOnInit(): void {
    this.postsService.getArticles().subscribe(result => {
      this.articles = result.articles;
    });
  }

}
