import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { UserRegistrationInfo } from '../entities/user.entities';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs';
import { ResponseWithData, Response } from '../entities/response.entities';
import { stringify } from 'qs';

class TokenInfo {
  token: string;
  expirationTime: Date;

  constructor(token: string, expirationTime: number) {
    this.token = token;
    this.expirationTime = new Date(expirationTime);
    console.log(expirationTime);
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService,
              private http: HttpClient) { }

  register (registerUserInfo: UserRegistrationInfo) {
    return this.http.post<Response>(`${environment.getApiUrl()}/api/auth/registration`, registerUserInfo);
  }

  login (login: string, password: string) {
    const query = stringify({login, password})
    return this.http.get(`${environment.getApiUrl()}/api/auth/login?${query}`)
      .pipe(
        tap((response: any) => {
          this.setToken(response);
        }),
        map((response: any) => {
          return new Response(response["message"], response["success"]);;
        })
      )
  }

  logout() {
    this.cookieService.delete(environment.tokenHeader);
  }

  private setToken(response: ResponseWithData<TokenInfo>){
    console.log('auth service[setToken]', response);
    if(!response.data || response.data.token == ''){
      throw new Error("Error!");
    }
    console.log(new Date(response.data.expirationTime));
    this.cookieService.set(environment.tokenHeader, response.data.token, new Date(response.data.expirationTime));
  }

  isLoggedIn(){
    console.log('auth service[isLoggedIn]', this.cookieService.get(environment.tokenHeader));
    return this.cookieService.check(environment.tokenHeader);
  }

}
