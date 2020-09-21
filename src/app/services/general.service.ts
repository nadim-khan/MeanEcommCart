import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Fees } from './fees';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  feeApi = environment.feeStructureApi;
  broadcastApi = environment.broadcastApi;
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  getFeeStructure() {
    return this.http.get<Fees>(`${this.feeApi}/getFeeStructure`);
  }

  postNewFeeDetails(details) {
    return this.http.post<Fees>(`${this.feeApi}/feeUpdate`, details);
  }

  feeDelete(details) {
    console.log(details);
    return this.http.post<any>(`${this.feeApi}/feeDelete`, details);
  }

}
