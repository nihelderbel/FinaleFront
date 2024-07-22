import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsService {
  constructor(private http: HttpClient) { }
  private urlAddUserMsParAdminMedical = 'http://localhost:8281/userMS/addUserMSParAdminSansImage/';
  addUserOemsParAdminSansImage(idAdmin:number  , value: any): Observable<any> {
  return this.http.post(`${this.urlAddUserMsParAdminMedical}`+idAdmin, value);} 

  private urlLogin = 'http://localhost:8281/userMS/login';
  login(username : string, password: string) {
  return this.http.post(`${this.urlLogin}`,{username, password});}
  
  private urlgetUser = 'http://localhost:8281/userMS/getuserMS';
  getUserms(id: number): Observable<Object> {
  return this.http.get(`${this.urlgetUser}/${id}`);}

  private urlUpdate= 'http://localhost:8281/userMS/updateUserMS/';
  updatUserm(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}
}

