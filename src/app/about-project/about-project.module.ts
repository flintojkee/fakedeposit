import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutProjectComponent } from './about-project.component';


const routes: Routes = [
  { path: '', component: AboutProjectComponent }
];

@NgModule({
  declarations: [AboutProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutProjectModule { }
