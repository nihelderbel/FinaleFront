import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  Apiurl ="http://localhost:8281/Audit"
  constructor(private Http:HttpClient) { }
  
getAudit():Observable<any[]>{
  return this.Http.get<any[]>(this.Apiurl+'/all');
}

addAudit(val:any):any{
   return this.Http.post(this.Apiurl+'/addAudit',val);
}

updateAudit(id: number, value: any ): Observable<any> {
  return this.Http.put(`${this.Apiurl}/update/${id}`, value);}


deleteAudit(id:number):Observable<any>{
  return this.Http.delete(`${this.Apiurl}/${id}`);
}

getAuditById(id : number): Observable<number> {
  return this.Http.get<number>(`${this.Apiurl}/get/${id}`);} 

}
