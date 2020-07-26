import { Component } from '@angular/core';

@Component({
	selector: 'leafletDrawDemo',
	templateUrl: './leaflet-draw-demo.component.html'
})
export class LeafletDrawDemoComponent {
	showDemo = false;

	ngOnInit() {

		
		setTimeout(() => {
			this.showDemo = true;
		}, 1000);

	}
}
