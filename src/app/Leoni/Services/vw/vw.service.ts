import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VwService {

  constructor(private http: HttpClient) { }
  private urlAddUserVwParAdminMedical = 'http://localhost:8281/userVW/addUserVWParAdminSansImage/';
  addUserVWParAdminSansImage(idAdmin:number  , value: any): Observable<any> {
  return this.http.post(`${this.urlAddUserVwParAdminMedical}`+idAdmin, value);} 

  private urlLogin = 'http://localhost:8281/userVW/login';
  login(username : string, password: string) {
  return this.http.post(`${this.urlLogin}`,{username, password});}
  
  private urlgetUser = 'http://localhost:8281/userVW/getuserVW';
  getUservw(id: number): Observable<Object> {
  return this.http.get(`${this.urlgetUser}/${id}`);}

  private urlUpdate= 'http://localhost:8281/userVW/updateUserVW/';
  updatUserVW(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}
}
