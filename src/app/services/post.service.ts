import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../post.model';
//import { Stream } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  
    getPostsData(): Observable<any> {
      return this.http.get("http://localhost:8081/api/posts");
    }

  addPost(title: string, location: string, time: string, date: string, price: string, link: string): Observable<any> {
    const post: Post = {title: title, location: location, time: time, date: date, price: price, link: link}
    return this.http.post("http://localhost:8081/api/posts",post);
  }

  deletePost(id: String): Observable<any> {
    return this.http.delete("http://localhost:8081/api/posts/"+id);
  }

  getPost(id:String): Observable<any> {
    return this.http.get("http://localhost:8081/api/posts/"+id);
  }

  updatePost(id:String, title: string, location: string, time: string, date: string, price: string, link: string): Observable<any> {
    const post: Post = {title: title, location: location, time: time, date: date, price: price, link: link}
  return this.http.put("http://localhost:8081/api/posts/"+id, post);
  }
}
