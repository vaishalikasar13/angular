import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(private ajax: Http) { }

  private tableData = [];
  private headers = new Headers({'Content-Type':'application/json'});
  
  private showData = function () { 
    this.ajax.get('http://localhost:3300/posts').subscribe(data => { 
      // console.log(data.json());
      this.tableData = data.json();
    });
  }
  
  private deleteData(id) { 
    // console.log(data);
    const url = `${"http://localhost:3300/posts"}/${id}`;

    this.ajax.delete(url, { headers: this.headers }).toPromise().then(() => { 
      this.showData();
    });
  }
  
  ngOnInit() {
    this.showData();
  }

}
