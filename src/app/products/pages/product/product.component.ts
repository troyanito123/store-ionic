import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { concatMap, mergeMap, switchMap } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Unit } from 'src/app/units/interfaces/interfaces';
import { UnitService } from 'src/app/units/service/unit.service';
import { Product } from '../../interfaces/interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Product;
  units: Unit[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private utilsService: UtilsService,
    private unitService: UnitService
  ) {}

  async ngOnInit() {
    const loading = await this.utilsService.createLoading();
    loading.present();
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          forkJoin(
            this.productService.getOneProduct(id),
            this.unitService.getAll()
          )
        )
      )
      .subscribe((res) => {
        this.product = res[0];
        this.units = res[1];
        loading.dismiss();
      });
  }

  get isLoadedData() {
    return this.product && this.units.length > 0;
  }
}
