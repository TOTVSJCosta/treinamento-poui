import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PoMenuItem } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  readonly URL = 'http://localhost:8080/rest/poui/menu';

  constructor(private http: HttpClient) { }

  getMenu(): Observable<PoMenuItem[]> {
    return this.http.get<PoMenuItem[]>(this.URL);
  }
}
