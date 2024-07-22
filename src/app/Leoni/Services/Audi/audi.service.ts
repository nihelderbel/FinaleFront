import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudiService {

  constructor(private http: HttpClient) { }
  private urlAddUserAudiParAdminMedical = 'http://localhost:8281/addUserAudiParAdminSansImage/';
  addUserAudiParAdminSansImage(idAdmin:number  , value: any): Observable<any> {
  return this.http.post(`${this.urlAddUserAudiParAdminMedical}`+idAdmin, value);} 

  private urlLogin = 'http://localhost:8281/userAudi/login';
  login(username : string, password: string) {
  return this.http.post(`${this.urlLogin}`,{username, password});}
  
  private urlgetUser = 'http://localhost:8281/userAudi/getuserAudi';
  getUserAudi(id: number): Observable<Object> {
  return this.http.get(`${this.urlgetUser}/${id}`);}

  private urlUpdate= 'http://localhost:8281/userAudi/updateUserAudi/';
  updatUserAudi(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}
}
