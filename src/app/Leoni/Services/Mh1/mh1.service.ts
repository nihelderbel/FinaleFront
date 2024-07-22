import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Mh1Service {

 
  constructor(private http: HttpClient) { }
  private urlAddUserMh1ParAdminMedical = 'http://localhost:8281/userMH1/addUserMH1ParAdminSansImage/';
  addUserOemsParAdminSansImage(idAdmin:number  , value: any): Observable<any> {
  return this.http.post(`${this.urlAddUserMh1ParAdminMedical}`+idAdmin, value);} 

  private urlLogin = 'http://localhost:8281/userMH1/login';
  login(username : string, password: string) {
  return this.http.post(`${this.urlLogin}`,{username, password});}
  
  private urlgetUser = 'http://localhost:8281/userMH1/getuserMh';
  getUsermh(id: number): Observable<Object> {
  return this.http.get(`${this.urlgetUser}/${id}`);}

  private urlUpdate= 'http://localhost:8281/userMH1/updateUserMh1/';
  updatUsermh1(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}
}
