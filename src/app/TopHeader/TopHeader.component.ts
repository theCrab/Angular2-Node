import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-TopHeader',
  templateUrl: './TopHeader.component.html',
  styleUrls:['./TopHeader.component.css']
})
export class TopHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  checkLogin() {
    var token = localStorage.getItem('token') ?
      '?token=' + localStorage.getItem('token')
      : '';
    if (token !== '') {
      return true;
    }
    return false;
  }

  switchMenu(){
  }


}