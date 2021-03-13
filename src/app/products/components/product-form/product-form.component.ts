import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unit } from 'src/app/units/interfaces/interfaces';
import { UnitService } from 'src/app/units/service/unit.service';
import { Product } from '../../interfaces/interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  @Input() units: Unit[];

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  saveProduct() {
    if (this.product) {
      console.log('actualizando producto');
      console.log(this.productForm.value);
    } else {
      console.log('creando producto');
      console.log(this.productForm.value);
    }
  }

  private createForm() {
    this.productForm = this.fb.group({
      name: [
        this.product ? this.product.name : '',
        [Validators.required, Validators.minLength(2)],
      ],
      code: [
        this.product ? this.product.code : '',
        [Validators.required, Validators.minLength(2)],
      ],
      description: [
        this.product ? this.product.description : '',
        [Validators.required, Validators.minLength(2)],
      ],
      price: [
        this.product ? this.product.price : 1.0,
        [Validators.required, Validators.min(1), Validators.max(9999)],
      ],
      unit: [this.unitDefaultField(this.product), [Validators.required]],
    });
  }

  private unitDefaultField(product: Product | null) {
    return product
      ? this.units.find((u) => u.id === product.unit.id)
      : this.units[0] || '';
  }
}
