import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MnService {

  constructor(private http: HttpClient) { }
  private urlAddUserMnParAdminMedical = 'http://localhost:8281/userMN/addUserMNParAdminSansImage/';
  addUserOemsParAdminSansImage(idAdmin:number  , value: any): Observable<any> {
  return this.http.post(`${this.urlAddUserMnParAdminMedical}`+idAdmin, value);} 

  private urlLogin = 'http://localhost:8281/userMN/login';
  login(username : string, password: string) {
  return this.http.post(`${this.urlLogin}`,{username, password});}
  
  private urlgetUser = 'http://localhost:8281/userMN/getuserMN';
  getUsermn(id: number): Observable<Object> {
  return this.http.get(`${this.urlgetUser}/${id}`);}

  private urlUpdate= 'http://localhost:8281/userMN/updateUserMN/';
  updatUserm(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}
}

