import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/home/interfaces/interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() product: Product;
  @Input() cant: number;

  constructor() {}

  ngOnInit() {}
}
