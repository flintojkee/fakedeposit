import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  constructor(private http: HttpClient) {}
  private pages = {
    calculator: {
      type: 'calculator',
      name: 'CalculatorPage'
    }
  };
  api = 'https://fakedeposit-cms.herokuapp.com/api/v2/pages/?type=';
  getPageData(page: string) {
    return this.http.get(
      `${this.api}${this.pages[page].type}.${this.pages[page].name}&fields=_,intro`
    );
  }
}
