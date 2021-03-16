import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductValidatorService } from 'src/app/shared/services/product-validator.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Unit } from 'src/app/units/interfaces/interfaces';
import { NewImage, Product } from '../../interfaces/interface';
import { PhotoService } from '../../services/photo.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  @Input() units: Unit[];

  newImages: NewImage[] = [];
  imagesSubs: Subscription;

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private photoService: PhotoService,
    private productService: ProductService,
    private utilsService: UtilsService,
    private productValidator: ProductValidatorService
  ) {}

  ngOnInit() {
    this.imagesSubs = this.photoService.images$.subscribe(
      (images) => (this.newImages = images)
    );
    this.createForm();
  }

  ngOnDestroy() {
    this.imagesSubs?.unsubscribe();
  }

  async saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      if (this.newImages.length < 1) {
        const alert = await this.utilsService.createAlert(
          'Imagenes',
          'El producto debe tener al menos una imagen.'
        );
        alert.present();
      }
      return;
    }

    const images = [];
    for (const image of this.newImages) {
      const blob = await fetch(image.image.webPath).then((r) => r.blob());
      images.push(blob);
    }

    const loading = await this.utilsService.createLoading(
      'Creando producto...'
    );
    loading.present();
    if (this.product) {
      console.log('actualizando producto');
    } else {
      this.createProduct(loading, images);
    }
  }

  invalidField(field: string) {
    return (
      this.productForm.get(field).invalid && this.productForm.get(field).touched
    );
  }

  get invalidNameMsg(): string {
    const errors = this.productForm.get('name').errors;
    if (errors?.required) {
      return 'Nombre es obligatorio';
    } else if (errors?.minlength) {
      return 'Nombre debe contener minimo 2 caracters';
    }
    return '';
  }

  get invalidCodeMsg(): string {
    const errors = this.productForm.get('code').errors;
    if (errors?.required) {
      return 'Codigo es obligatorio';
    } else if (errors?.minlength) {
      return 'Codigo debe contener minimo 2 caracters';
    } else if (errors?.codetaken) {
      return 'Codigo ya existe';
    }
    return '';
  }

  get invalidDescriptionMsg(): string {
    const errors = this.productForm.get('description').errors;
    if (errors?.required) {
      return 'Descripcion es obligatorio';
    } else if (errors?.minlength) {
      return 'Descripcion debe contener minimo 2 caracters';
    }
    return '';
  }

  get invalidPriceMsg(): string {
    const errors = this.productForm.get('price').errors;
    if (errors?.required) {
      return 'Precio es obligatorio';
    } else if (errors?.min) {
      return 'Precio debe ser minimo de 1';
    } else if (errors?.max) {
      return 'Precio debe ser maximo de 9999';
    }
    return '';
  }

  get invalidUnitMsg(): string {
    const errors = this.productForm.get('unit').errors;
    if (errors?.required) {
      return 'Unidad del producto es obligatorio';
    }
    return '';
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
        [this.productValidator],
      ],
      description: [
        this.product ? this.product.description : '',
        [Validators.required, Validators.minLength(2)],
      ],
      price: [
        this.product ? Number(this.product.price) : 1.0,
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

  private createProduct(loading: HTMLIonLoadingElement, images: any[]) {
    console.log('creando producto');
    const { name, code, description, price, unit } = this.productForm.value;
    this.productService
      .createProduct(name, code, description, price, unit.id, images)
      .subscribe(async (res) => {
        if (res) {
          this.productForm.reset();
          this.photoService.deleteAllImages();
          loading.dismiss();
          this.router.navigate(['/products']).then(async () => {
            const toast = await this.utilsService.createToast(
              'Producto creado correctamente'
            );
            toast.present();
          });
        } else {
          const alert = await this.utilsService.createAlert(
            'Error',
            'Ocurrio un error al crear el producto, intente denuevo por favor'
          );
          alert.present();
        }
      });
  }
}
