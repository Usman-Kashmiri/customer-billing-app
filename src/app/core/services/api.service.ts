import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IError } from '../interfaces/ierror';
import { IHttpResponse } from '../interfaces/ihttp-response';
import { IParams } from '../interfaces/iparams';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token?: string;
  constructor(private _http: HttpClient,
    private _localStorage: LocalStorageService,
    private _router: Router
  ) { }

  /**
 * ---
 * Handle Error
 * ---
 * @name handleError
 * @params {IError} error
 * @description This method is used to handle errors.
 */
  handleError(error: IError) {
    if (error.error == "Forbidden") {
      this._router.navigate(['/login']);
    }
  }

  /**
   * ---
   * Get Token
   * ---
   * @name getToken
   * @description This method is used to get the token.
   * @returns {string}
   */
  getToken(): string {
    this.token = this._localStorage.get('token')!;
    return this.token;
  }

  /**
   * ---
   * Get
   * ---
   * @name get
   * @description This method is used to get data from the server.
   * @param {string} url
   * @returns {Observable<IHttpResponse>}
   */
  get(url: string, params?: any): Observable<IHttpResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.getToken()}`
    });
    
    return this._http.get<IHttpResponse>(`${environment.api}/${url}`, { params: params, headers: headers });
  }

  /**
   * ---
   * Handle Query Params
   * ---
   * @name handleQueryParams
   * @description This method is used to handle query params.
   * @param {IParams[]} params
   */
  handleQueryParams(params: IParams[]) {
    let queryParams = '';
    params.forEach(param => {
      queryParams += `${param.name.key}=${param.name.value}&`;
    });
    return queryParams;
  }

  /**
   * ---
   * Post
   * ---
   * @name post
   * @description This method is used to post data to the server.
   * @param {string} url
   * @param {any} data
   * @param {any} headers
   * @returns {Observable<any>}
   */
  post(url: string, data: any, options: any): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.getToken()}`
    });

    options['headers'] = headers;
    return this._http.post(`${environment.api}/${url}`, data, options)
  }

  /**
   * ---
   * Put
   * ---
   * @name put
   * @description This method is used to put data to the server.
   * @param {string} url
   * @param {any} data
   * @param {any} headers
   * @returns {Observable<any>}
   */
  put(url: string, data: any, options?: any): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.getToken()}`
    });

    options['headers'] = headers;
    return this._http.put(`${environment.api}/${url}`, data, options)
  }

  /**
   * ---
   * Delete
   * ---
   * @name delete
   * @description This method is used to delete data from the server.
   * @param {string} url
   * @param {any} headers
   * @returns {Observable<any>}
   */
  delete(url: string, options: any): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.getToken()}`
    });

    options['headers'] = headers;
    return this._http.delete(`${environment.api}/${url}`, options)
  }
}
