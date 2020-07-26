import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LeafletDrawDemoModule } from './leaflet-draw/leaflet-draw-demo.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
	imports: [
		BrowserModule,
		LeafletDrawDemoModule,
		HttpClientModule,
		FormsModule
	],
	declarations: [
		AppComponent

		

	],
	bootstrap: [ AppComponent ],
	providers: [ ]
})
export class AppModule { }
