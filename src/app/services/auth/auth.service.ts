import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IHttpResponse } from 'src/app/core/interfaces/ihttp-response';
import { IUser } from 'src/app/core/interfaces/iuser';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  constructor(
    private _apiService: ApiService,
    private _localStorageService: LocalStorageService
  ) { }

  /**
   * ---
   * Register User
   * ---
   * @name registerUser
   * @param {IUser} user
   * @description This method is used to register a user.
   * @returns {Observable<IHttpResponse>}
   */
  registerUser(user: IUser): Observable<IHttpResponse> {
    return this._apiService.post('register', user, {});
  }

  /**
   * ---
   * Login User
   * ---
   * @name loginUser
   * @param {IUser} user
   * @description This method is used to login a user.
   * @returns {Observable<IHttpResponse>}
   */
  loginUser(user: IUser): Observable<IHttpResponse> {
    return this._apiService.post('login', user, {});
  }

  /**
   * ---
   * Get Logged In
   * ---
   * @name getLoggedIn
   * @description This method is used to get the logged in status.
   * @returns {Observable<Boolean>}
   */
  returnLoggedIn(): void {
    if (this._localStorageService.get('token')) {
      return this.loggedIn.next(true);
    } else {
      return this.loggedIn.next(false);
    }
  }

  /**
   * ---
   * Logout User
   * ---
   * @name logoutUser
   * @description This method is used to logout a user.
   * @returns {Observable<IHttpResponse>}
   */
  logoutUser(): Observable<IHttpResponse> {
    return this._apiService.post('logout', {
      token: this._apiService.getToken()
    }, {});
  }
}
