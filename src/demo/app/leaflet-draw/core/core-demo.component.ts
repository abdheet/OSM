import { Component } from '@angular/core';

import {  featureGroup, FeatureGroup, icon, latLng, tileLayer } from 'leaflet';

@Component({
	selector: 'leafletDrawCoreDemo',
	templateUrl: './core-demo.component.html'
})
export class LeafletDrawCoreDemoComponent {

	JsonData : any;
	ngOnInit() {
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(
			  `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
			);
	});
	this.watchPosition();
}
watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat && position.coords.longitude === desLon) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

	drawnItems: FeatureGroup = featureGroup();
	options = {
		layers: [
			tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
		],
		zoom: 7,
		center: latLng({ lat: 27.2038, lng: 77.5011 })
	};

	drawOptions = {
		position: 'topleft',
		draw: {
			circle:false,
			marker: {
				icon: icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: '2b3e1faf89f94a4835397e7a43b4f77d.png',
					iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
					shadowUrl: 'a0c6cc1401c107b501efee6477816891.png'
				})
			}
		},
		edit: {
			featureGroup: this.drawnItems
		}
	};

	drawLocal: any = {
		draw: {
			toolbar: {
				buttons: {
					polygon: 'Draw an awesome polygon!'
				}
			}
		}
	};

	public onDrawCreated(e: any) {
		
		console.log('Draw Created Event!');

	
		const layer = (e as any).layer;
		const type = (e as any).layerType;
        if(type ==='polygon'){
            let polygonCoordinates = layer._latlngs;
            console.log(polygonCoordinates[0]);
			this.JsonData = polygonCoordinates[0];
			console.log(JSON.stringify((this.JsonData)));
        }
        if(type==='circle'){
			let circleCoordinates = layer.getLatLng();
			
			console.log(circleCoordinates);
			this.JsonData = JSON.stringify(circleCoordinates);
			console.log(this.JsonData);
        }
        if(type==='marker'){
            let circleCoordinates = layer.getLatLng();
			console.log(circleCoordinates);
			this.JsonData = JSON.stringify(circleCoordinates);
			console.log(this.JsonData);
        }
        if(type==='rectangle'){
            let circleCoordinates = layer._latlngs;
			console.log(circleCoordinates[0]);
			this.JsonData = circleCoordinates[0];
			
			console.log(JSON.stringify(this.JsonData));
        }
        if(type==='polyline'){
            let circleCoordinates = layer._latlngs;
			console.log(circleCoordinates[0]);
			this.JsonData = circleCoordinates[0];
			
			console.log(JSON.stringify(this.JsonData));
		}
		
		this.drawnItems.addLayer(layer);
	}

	public onDrawStart(e: any) {
		// tslint:disable-next-line:no-console
		console.log('Draw Started Event!');
	}

}
