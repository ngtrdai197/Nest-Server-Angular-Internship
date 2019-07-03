import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'shop-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.onSetTitle();
  }

  
  onSetTitle() {
    this.title.setTitle('Trang chủ');
  }
}
