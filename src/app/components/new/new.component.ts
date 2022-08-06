import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../common/post";
import {ActivatedRoute} from "@angular/router";
import {Review} from "../../common/review";
import {User} from "../../common/user";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  post: Post;
  body: string;
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPost(+this.route.snapshot.paramMap.get('id'));
  }

  getPost(id: number){
    this.postService.getPostById(id).subscribe({
      next: res => this.post = res,
      error: err => console.log(err)
    });
  }

  reviewPost(){
    this.postService.addReviewToPost(+this.route.snapshot.paramMap.get('id'), this.body, localStorage.getItem('token')).subscribe({
      next: (res) => {
        let r: Review = new Review();
        let user: User = JSON.parse(localStorage.getItem('user'));
        r.body = res;
        r.user = user;
        this.getPost(+this.route.snapshot.paramMap.get('id'));
      },
      error: err => console.log(err)
    });
  }

}
