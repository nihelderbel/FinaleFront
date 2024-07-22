import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OemsService {

 
  constructor(private http: HttpClient) { }
  private urlAddUserOemsParAdminMedical = 'http://localhost:8281/userOEMS/addUserOEMSParAdminSansImage/';
  addUserOemsParAdminSansImage(idAdmin:number  , value: any): Observable<any> {
  return this.http.post(`${this.urlAddUserOemsParAdminMedical}`+idAdmin, value);} 

  private urlLogin = 'http://localhost:8281/userOEMS/login';
  login(username : string, password: string) {
  return this.http.post(`${this.urlLogin}`,{username, password});}
  
  private urlgetUser = 'http://localhost:8281/userOEMS/getuserOEMS';
  getUseroems(id: number): Observable<Object> {
  return this.http.get(`${this.urlgetUser}/${id}`);}

  private urlUpdate= 'http://localhost:8281/userOEMS/updateUserOEMS/';
  updatUserOems(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}
}
