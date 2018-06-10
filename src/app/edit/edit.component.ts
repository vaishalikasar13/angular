import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  data: object = {};
  postDataObj: object = {};

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private http:Http) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(para => {
      this.id = +para['id'];
    });

    this.fillFormDetails(this.id);
  }

  private fillFormDetails(id) { 
    this.http.get('http://localhost:3300/posts').subscribe(data => {
      // console.log(data.json());
      const postData = data.json();
      for (let post in postData) { 
        // console.log(+postData[post].id);
        if (+postData[post].id === this.id) { 
          this.data = postData[post];
        }
      }
    });
  }

  private onEdit(postData) {
    const url = `${"http://localhost:3300/posts"}/${this.id}`;
    this.postDataObj = {
      "title": postData.title,
      "author": postData.author
    };

    console.log(url);


    this.http.put(url, this.postDataObj, { headers: this.headers }).toPromise().then(() => { 
      this.router.navigate(['/show']);
    });
  }

}
