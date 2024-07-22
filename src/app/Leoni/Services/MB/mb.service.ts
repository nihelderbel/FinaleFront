import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MbService {

  constructor(private http: HttpClient) { }
  private urlAddUserMBParAdminMedical = 'http://localhost:8281/userMB/addUserMBParAdminSansImage/';
  addUserAudiParAdminSansImage(idAdmin:number  , value: any): Observable<any> {
  return this.http.post(`${this.urlAddUserMBParAdminMedical}`+idAdmin, value);} 

  private urlLogin = 'http://localhost:8281/userMB/login';
  login(username : string, password: string) {
  return this.http.post(`${this.urlLogin}`,{username, password});}
  
  private urlgetUser = 'http://localhost:8281/userMB/getuserMb';
  getUserMb(id: number): Observable<Object> {
  return this.http.get(`${this.urlgetUser}/${id}`);}

  private urlUpdate= 'http://localhost:8281/userMB/updateUserMb/';
  updatUserMb(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}
}
