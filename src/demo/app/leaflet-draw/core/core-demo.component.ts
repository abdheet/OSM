import { Component } from '@angular/core';

import {  featureGroup, FeatureGroup, icon, latLng, tileLayer } from 'leaflet';
import { CoreDemoService } from '../../../../app/core-demo.service'
import { Geofenceinterface } from '../../../../app/geofenceinterface';



@Component({
	selector: 'leafletDrawCoreDemo',
	templateUrl: './core-demo.component.html'
})
export class LeafletDrawCoreDemoComponent {
	constructor(public coreDemoService: CoreDemoService){}
	JsonData : any;
	JsonDataNew: any;

	newarray : Array<any> = new Array<any>();
	geoFence : Geofenceinterface = {name , coordinates: null} ; 
	againnewarray : Array<any> =  new Array<any>();
	ngOnInit() {
		if(!navigator.geolocation){
			console.log("GeoLocation not supported")
		}
		
		navigator.geolocation.getCurrentPosition((position) => {
			// console.log(
			//   `lat: ${position.coords.latitude}, long: ${position.coords.longitude}`
			// );
	});
	this.watchPosition();
}
watchPosition() {
    let desLat = 0;
	let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
		 
        // console.log(
        //   `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
		// ); 
		
		this.againnewarray.push(`latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`)
		

	//	console.log(this.againnewarray);
	
	//	console.log("{"+JSON.stringify(this.againnewarray)+"}");
		
		this.coreDemoService.userCurrentLocation(JSON.stringify(this.againnewarray));
		this.againnewarray.splice(0,this.againnewarray.length);
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
			 
			this.JsonDataNew = JSON.stringify((this.JsonData));
		this.geofunc();


        }
        // if(type==='circle'){
		// 	let circleCoordinates = layer.getLatLng();
			
		// 	console.log(circleCoordinates);
		// 	this.JsonData = JSON.stringify(circleCoordinates);
		// 	console.log(this.JsonData);
		// 	this.JsonDataNew = JSON.stringify((this.JsonData));
        // }
        if(type==='marker'){
            let circleCoordinates = layer.getLatLng();
			console.log(circleCoordinates);
			this.JsonData = JSON.stringify(circleCoordinates);
			console.log(this.JsonData);
			this.JsonDataNew = JSON.stringify((this.JsonData));
			this.geofunc();
        }
        if(type==='rectangle'){
            let circleCoordinates = layer._latlngs;
			console.log(circleCoordinates[0]);
			this.JsonData = circleCoordinates[0];
			
			//console.log(JSON.stringify(this.JsonData));
			
			this.geofunc();
        }
        if(type==='polyline'){
            let circleCoordinates = layer._latlngs;
			console.log(circleCoordinates[0]);
			this.JsonData = circleCoordinates[0];
			
	
			this.geofunc()
		}
		
		this.drawnItems.addLayer(layer);
	}

	public onDrawStart(e: any) {
		 
		console.log('Draw Started Event!');
	}
	onbuttonsubmit()
	{
		this.coreDemoService.saveFencing(JSON.stringify(this.geoFence));
	}
	geofunc()
	{
		this.JsonData.forEach((element: any) => {
			

			
			this.newarray.push([element.lat,element.lng]);
			});
			
			this.geoFence.name = 'abheet';
			this.geoFence.coordinates = [...this.newarray];

			console.log(this.geoFence);
			console.log(JSON.stringify(this.geoFence));
			
			this.newarray.splice(0,this.newarray.length);
			
		
	}

}
