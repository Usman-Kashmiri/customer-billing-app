import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpResponse } from 'src/app/core/interfaces/ihttp-response';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  constructor(
    private _apiService: ApiService,
    private _localStorage: LocalStorageService
  ) { }

  /**
   * ---
   * Get Bills
   * ---
   * @name getBills
   * @description Get all bills
   * @returns {Observable<any>}
   */
  getBills(): Observable<any> {
    return this._apiService.get('bills');
  }
}
