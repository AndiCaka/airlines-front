import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../common/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('http://localhost:8080/news');
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`http://localhost:8080/news/`+id);
  }

  addPost(post: Post): Observable<any> {
    return this.httpClient.post('http://localhost:8080/news',post);
  }

  upload(id: number, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest('POST', `http://localhost:8080/news/${id}/upload-image`, formData, {
      responseType: 'text',
      reportProgress: true
    });
    return this.httpClient.request(request);
  }

  addReviewToPost(id: number, body: string, jwt: string): Observable<any>{
    return this.httpClient.post(`http://localhost:8080/news/${id}/comment`, body, {responseType: 'text', headers: {Authorization: jwt}});
  }

  deletePost(id: number): Observable<Post> {
    return this.httpClient.delete<Post>(`http://localhost:8080/news/`+id);
  }
}
