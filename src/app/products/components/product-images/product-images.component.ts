import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../interfaces/interface';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
})
export class ProductImagesComponent implements OnInit {
  @Input() images: Image[];

  constructor() {}

  ngOnInit() {}
}
