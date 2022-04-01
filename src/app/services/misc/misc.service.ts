import { Injectable } from '@angular/core';
import { IHttpResponse } from 'src/app/core/interfaces/ihttp-response';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(private _apiService: ApiService) { }

  /**
   * ---
   * Get Dashboard Stats
   * ---
   * @name getDashboardStats
   * @returns {Observable<any>}
   */
  getDashboardStats() {
    return this._apiService.get('dashboard');
  }

  /**
   * ---
   * Get Server Stats
   * ---
   * @name getServerStats
   * @returns {Observable<any>}
   */
  getServerStats() {
    return this._apiService.get('server');
  }
}
