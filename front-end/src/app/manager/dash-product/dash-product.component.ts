import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'shop-dash-product',
  templateUrl: './dash-product.component.html',
  styleUrls: ['./dash-product.component.scss']
})
export class DashProductComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.onSetTitle();
  }
  onSetTitle(){
    this.title.setTitle('Quản lý sản phẩm');
  }
}
