import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule
} from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { LazyUniversalModuleLoaderProvider } from 'localize-router-lazy-universal-module-loader';
@NgModule({
  imports: [
    // AppModule - FIRST!!!
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
  ],
  providers: [LazyUniversalModuleLoaderProvider],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
