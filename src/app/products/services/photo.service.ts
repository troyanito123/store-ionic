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

  setImage(newImage: NewImage) {
    this._images.push(newImage);
    this.emitChanges();
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

  async takePicture() {
    const image = await this.processImage(CameraSource.Camera);
    const id = Date.now().toPrecision();
    this._images.push({ id, image });
    this.emitChanges();
  }

  async chooseGallery() {
    const image = await this.processImage(CameraSource.Photos);
    const id = Date.now().toPrecision();
    this._images.push({ id, image });
    this.emitChanges();
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
