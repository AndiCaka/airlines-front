import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Post} from "../../common/post";
import {AlertComponent} from "../alert/alert.component";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postForm: FormGroup;
  fileList?: FileList;

  id: number = -1;

  progress: number;

  post: Post;
  message: string;
  currentFile: File;
  hasID: boolean;

  constructor(private postService: PostService, private snackbar: MatSnackBar, private router: Router,
              private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.hasID = this.route.snapshot.paramMap.has('id');
    this.controlForm();
    this.route.paramMap.subscribe((param) => {
      this.id = + param.get('id');
      if (this.id > 0){
        this.postService.getPostById(this.id).subscribe(data => {
          this.post = data;
          this.controlForm();
        });
      }
    });
  }

  selectFile(event: any): void {
    this.fileList = event.target.files;
  }

  controlForm(){
    this.postForm = this.formBuilder.group({
      title: new FormControl(`${this.post != null ? this.post.title : ''}`),
      description: new FormControl(`${this.post != null ? this.post.description : ''}`),
      imageURL: new FormControl(`${this.post != null ? this.post.imageURL : ''}`),
      image: new FormControl('')
    });
  }

  onSavePost(){
    let post: Post = new Post();
    post.title = this.postForm.get('title').value;
    post.description = this.postForm.get('description').value;

    this.postService.addPost(post).subscribe({
      next: () => {
        this.router.navigateByUrl("/home").then();
        this.snackbar.openFromComponent(AlertComponent, {
          data: "Post created successfully.",
          duration: 2000,
        });
      },
      error: err => {
        this.snackbar.openFromComponent(AlertComponent, {
          data: err,
          duration: 2000
        });
      }
    });
  }

  upload(){
    this.progress = 0;
    this.currentFile = this.fileList.item(0);
    this.postService.upload(this.id, this.currentFile).subscribe({
      next: (event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.message = event.body.message;
        this.snackbar.openFromComponent(AlertComponent, {
          data: this.message,
          duration: 2000
        });
      }
    },
    error: () => {
      this.progress = 0;
      this.message = 'Could not upload the file!';
      }
    });
  }
}
