import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DossierMedical } from 'src/app/Modeles/DossierMedecial';

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  Apiurl ="http://localhost:8281/DossierMedical"

  constructor(private Http:HttpClient) { }
  
getDossier():Observable<any[]>{
  return this.Http.get<DossierMedical[]>(this.Apiurl+'/all');
}



updateDossier(val:any):any{
  return this.Http.put(this.Apiurl+'/update/',val);
}

deleteDossier(id:number):Observable<any>{
  return this.Http.delete(`${this.Apiurl}/${id}`);
}

getMedecin(id : number): Observable<number> {
  return this.Http.get<number>(`${this.Apiurl}/get/${id}`);} 

}