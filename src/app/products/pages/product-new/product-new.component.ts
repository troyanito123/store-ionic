import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Unit } from 'src/app/units/interfaces/interfaces';
import { UnitService } from 'src/app/units/service/unit.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss'],
})
export class ProductNewComponent implements OnInit {
  units: Unit[] = [];

  constructor(
    private unitService: UnitService,
    private utilsService: UtilsService
  ) {}

  async ngOnInit() {
    const loading = await this.utilsService.createLoading();
    loading.present();
    this.unitService.getAll().subscribe((units) => {
      this.units = units;
      loading.dismiss();
    });
  }
}
