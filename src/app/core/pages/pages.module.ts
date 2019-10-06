import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { SharedModule } from '@fd/shared';

@NgModule({
  declarations: [LogoutComponent, ErrorComponent],
  imports: [CommonModule, SharedModule]
})
export class PagesModule {}
