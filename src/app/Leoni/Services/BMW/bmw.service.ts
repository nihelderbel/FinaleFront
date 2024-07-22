import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BmwService {

  constructor(private http: HttpClient) { }
  private urlAddUserBMWParAdminMedical = 'http://localhost:8281/userBMw/addUserBMWParAdminSansImage/';
  addUserBMWParAdminSansImage(idAdmin:number  , value: any): Observable<any> {
  return this.http.post(`${this.urlAddUserBMWParAdminMedical}`+idAdmin, value);} 

  private urlLogin = 'http://localhost:8281/userBMw/login';
  login(username : string, password: string) {
  return this.http.post(`${this.urlLogin}`,{username, password});}
  
  private urlgetUser = 'http://localhost:8281/userBMw/getuserBMW';
  getUserBmw(id: number): Observable<Object> {
  return this.http.get(`${this.urlgetUser}/${id}`);}

  private urlUpdate= 'http://localhost:8281/userBMw/updateUserBMW/';
  updatUserBMW(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}
}
