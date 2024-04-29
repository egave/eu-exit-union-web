import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INSCRITS_API } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class ChartsInscritsService {

  constructor(private httpClient: HttpClient) {}

  getInscritsInfo() {
    return this.httpClient.get(INSCRITS_API);
  }
}
