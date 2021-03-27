import { EventEmitter, Injectable } from '@angular/core';
import {
  Camera,
  CameraOptions,
  CameraResultType,
  CameraSource,
} from '@capacitor/core';
import { NewImage } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private _images: NewImage[] = [];
  images$: EventEmitter<NewImage[]> = new EventEmitter();

  private _productImages: NewImage[] = [];
  productImages$: EventEmitter<NewImage[]> = new EventEmitter();

  setImage(newImage: NewImage) {
    this._images.push(newImage);
    this.emitChanges();
  }

  get images() {
    return [...this._images];
  }

  deleteImage(id: string) {
    this._images = this._images.filter((i) => i.id !== id);
    this.emitChanges();
  }

  deleteAllImages() {
    this._images = [];
    this.emitChanges();
  }

  constructor() {}

  async takePicture(isNew = true, id?: string) {
    const image = await this.processImage(CameraSource.Camera);
    if (isNew) {
      const id = Date.now().toPrecision();
      this._images.push({ id, image });
      this.emitChanges();
    } else {
      this._productImages.push({ id, image });
      this.productImages$.emit(this._productImages);
    }
  }

  async chooseGallery(isNew = true, id?: string) {
    const image = await this.processImage(CameraSource.Photos);
    if (isNew) {
      const id = Date.now().toPrecision();
      this._images.push({ id, image });
      this.emitChanges();
    } else {
      this._productImages.push({ id, image });
      this.productImages$.emit(this._productImages);
    }
  }

  private async processImage(source: CameraSource) {
    const opts: CameraOptions = {
      resultType: CameraResultType.Uri,
      source,
      allowEditing: false,
      quality: 50,
      correctOrientation: true,
    };
    return await Camera.getPhoto(opts);
  }

  private emitChanges() {
    this.images$.emit(this._images);
  }
}
