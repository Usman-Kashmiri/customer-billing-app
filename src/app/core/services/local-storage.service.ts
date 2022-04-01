import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * ---
   * Get the data from localstorage
   * ---
   * @param key
   * @returns {string|null|Object|string[]}
   */
  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * ---
   * Set the data to localstorage
   * ---
   * @param key
   * @param value
   * @returns {void}
   */
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * ---
   * Remove the data from localstorage
   * ---
   * @param key
   * @returns {void}
   */
  remove(key: string | Array<string>): void {
    if (Array.isArray(key)) {
      key.forEach(k => localStorage.removeItem(k));
    } else {
      localStorage.removeItem(key);
    }
  }
}
