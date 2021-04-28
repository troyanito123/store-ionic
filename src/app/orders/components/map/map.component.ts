import { Component, Input, OnInit } from '@angular/core';

import * as Mapboxgl from 'mapbox-gl';
import { CartService } from 'src/app/cart/services/cart.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: Mapboxgl.Map;
  location: string;

  @Input() lockLocation: string;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.createdMap();
  }

  createdMap() {
    (Mapboxgl.accessToken as any) = environment.mapBoxKey;
    this.map = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: [this.getLng(this.lockLocation), this.getLat(this.lockLocation)],
      zoom: 14.5,
    });
    if (this.lockLocation) {
      this.createMarkerFixed(this.lockLocation);
    } else {
      this.createdMarker(-66.16090109719788, -17.442175031276946);
    }
  }

  createdMarker(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({ draggable: true })
      .setLngLat([lng, lat])
      .addTo(this.map);
    marker.on('dragend', () => {
      this.location = `${marker.getLngLat().lng},${marker.getLngLat().lat}`;
      this.cartService.setLocation(this.location);
    });
  }

  createMarkerFixed(location: string) {
    const arr = location.split(',');
    const lng = Number(arr[0]);
    const lat = Number(arr[1]);
    new Mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
  }

  getLng(location: string) {
    if (location) {
      const arr = location.split(',');
      return Number(arr[0]);
    }
    return -66.16090109719788;
  }

  getLat(location: string) {
    if (location) {
      const arr = location.split(',');
      return Number(arr[1]);
    }
    return -17.442175031276946;
  }
}
