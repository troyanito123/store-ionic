import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewImage } from '../../interfaces/interface';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-product-new-images',
  templateUrl: './product-new-images.component.html',
  styleUrls: ['./product-new-images.component.scss'],
})
export class ProductNewImagesComponent implements OnInit, OnDestroy {
  newImages: NewImage[] = [];

  imagesSubs: Subscription;

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.newImages = this.photoService.images;
    this.imagesSubs = this.photoService.images$.subscribe((images) => {
      this.newImages = images;
    });
  }

  ngOnDestroy() {
    this.imagesSubs?.unsubscribe();
  }

  takePicture() {
    this.photoService.takePicture();
  }

  toGallery() {
    this.photoService.chooseGallery();
  }

  cleanImages() {
    this.photoService.deleteAllImages();
  }

  removeOneImage(id: string) {
    this.photoService.deleteImage(id);
  }
}
