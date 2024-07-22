import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PcdaService {

  Apiurl ="http://localhost:8281/PCDA"
  constructor(private Http:HttpClient) { }
  
getPcda():Observable<any[]>{
  return this.Http.get<any[]>(this.Apiurl+'/all');
}

addPcda(val:any):any{
   return this.Http.post(this.Apiurl+'/addPcda',val);
}

updatePcda(id: number, value: any ): Observable<any> {
  return this.Http.put(`${this.Apiurl}/update/${id}`, value);}


deletePcda(id:number):Observable<any>{
  return this.Http.delete(`${this.Apiurl}/${id}`);
}

getPcdaById(id : number): Observable<number> {
  return this.Http.get<number>(`${this.Apiurl}/get/${id}`);} 

}
