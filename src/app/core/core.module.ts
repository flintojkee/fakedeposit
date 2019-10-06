import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-protection';
import { LayoutModule } from './layout';
import { PagesModule } from './pages/pages.module';

@NgModule({
  imports: [CommonModule, LayoutModule, PagesModule],
  exports: [],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
