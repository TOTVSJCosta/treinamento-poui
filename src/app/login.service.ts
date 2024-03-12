import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PoMenuItem, PoNotificationService } from '@po-ui/ng-components';

export interface UserInfo {
  id: string;
  nome: string;
  empresa: string;
  filial: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly URL = 'http://localhost:8080/rest/poui/login'

  private userInfo!: Observable<UserInfo>;

  constructor(
    private http: HttpClient,
    private msg: PoNotificationService) { }

  login(loginEvent: any) {
    let params = new HttpParams()
      .set('user', loginEvent.login)
      .set('pwd', loginEvent.password);

    return this.http.post(this.URL, {params})
      .pipe(
        catchError(error => {
          if (error.status !== 0) {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            this.msg.error('Acesso negado');
          }
          // Return an observable with a user-facing error message.
          return throwError(() => new Error('Something bad happened; please try again later.'));
        })
      );
  }

}
