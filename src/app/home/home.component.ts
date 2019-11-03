import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'fd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private metaService: Meta) { }

  ngOnInit() {
    this.metaService.updateTag({ name: 'robots', content: 'all' });
  }

}
