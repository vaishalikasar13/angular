import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private ajax: Http,private router:Router) { }

  private status;

  private onSubmit = function (data) {
    console.log(data);
    this.ajax.post('http://localhost:3300/posts',data.value).subscribe(data => {
      if (data.status === 201) {
        this.router.navigate(['/show']);
      }
    });
  }

  ngOnInit() {
  }

}
