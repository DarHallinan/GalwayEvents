import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router/src/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes, Router } from '@angular/router';
import {PostService} from '../services/post.service';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post : any = [];
  // variables for updating
  myTitle : String; 
  myLocation : String; 
  myTime : String; 
  myDate : String; 
  myPrice : String; 
  myLink : String; 
  constructor(private router:Router, private route: ActivatedRoute, private service:PostService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.service.getPost(this.route.snapshot.params['id']).subscribe(data =>
    {
      this.post = data;
      console.log(this.post);
      this.myTitle = this.post.title;
      this.myLocation = this.post.location;
      this.myTime = this.post.time;
      this.myDate = this.post.data;
      this.myPrice = this.post.price;
      this.myLink = this.post.link;
      console.log("message" +this.myTitle);

    });
  }
  onEditPost(form: NgForm) {
    this.service.updatePost(this.post._id, form.value.title, form.value.location, form.value.time, form.value.date, form.value.price, form.value.link).subscribe(() =>
    {
      this.router.navigate(['/list']);
    });
  }

}
