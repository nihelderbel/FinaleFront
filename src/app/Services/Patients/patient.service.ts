import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  islogin = false;
  admin = false;
  DepartementData :any=[];
  testTabDepartement : number ; 
  MedecinData :any=[];
  testTabMedecins : number ; 
  PatientData :any=[];
  testTabPatients : number ;
  SecretairesData :any=[];
  testTabSecretaires : number ; 

  RVData :any=[];
  testRV : any ; 
  constructor(private http: HttpClient) { }
 

  private urlRegistrePatient = 'http://localhost:8281/patient/signupPatient';
  registre( value: any): Observable<any> {
  return this.http.post(`${this.urlRegistrePatient}` , value);} 

  
  private urlAddPatientParAdminMedicalAvecDossier = 'http://localhost:8281/patient/addPatientParAdminSansImageAvecDossier/';
  addPatientParAdminSansImageAvecDossier(idAdmin:number , idDossier : number , value: any): Observable<any> {
  return this.http.post(`${this.urlAddPatientParAdminMedicalAvecDossier}`+idAdmin+'/'+idDossier, value);} 

  private urlAddPatientParAdminMedical = 'http://localhost:8281/patient/';
  addPatientParAdminSansImage(idAdmin:number  , value: any): Observable<any> {
  return this.http.post(`${this.urlAddPatientParAdminMedical}`+idAdmin, value);} 

  private urlLogin = 'http://localhost:8281/patient/login';
  login(username : string, password: string) {
  return this.http.post(`${this.urlLogin}`,{username, password});}
  
  private urlgetpatient = 'http://localhost:8281/patient/getPatient';
  getPatient(id: number): Observable<Object> {
  return this.http.get(`${this.urlgetpatient}/${id}`);}

  private urlUpdate= 'http://localhost:8281/patient/updatePatient';
  updatPatient(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}

  private urlImage= 'http://localhost:8281/patient/updateImageProfilePatient';  
  updateImagePatient(id: number, file : File): Observable<any> {
  return this.http.put(`${this.urlImage}/${id}`,file);}
      
 
  private urlGetMedecinsParSpecialite = 'http://localhost:8281/medecin/getAllMedecinParSpecialite';
  getAllMedecinsParSpecialite(nom : string): Observable<Object> {
  return this.http.get(`${this.urlGetMedecinsParSpecialite}/${nom}`);}

  private urlAddRV = 'http://localhost:8281/rendezVous/addRV';
  addRVParPatient(idP:number , idM: number ,value : any): Observable<any> {
  return this.http.post(`${this.urlAddRV}/${idP}/${idM}`,value);} 

  private urlGetMyRV = 'http://localhost:8281/rendezVous/myRv';
  getMyRv(id : number ): Observable<Object> {
  return this.http.get(`${this.urlGetMyRV}/${id}`);}  
  
  private urlGetMyRVMedecin = 'http://localhost:8281/rendezVous/myRvMedecin';
  getMyRvMedecin(id : number ): Observable<Object> {
  return this.http.get(`${this.urlGetMyRVMedecin}/${id}`);}  

  private urlDeleteRV = 'http://localhost:8281/rendezVous/deletRendezVous';
  deleteRV(id : number): Observable<any> {
  return this.http.delete(`${this.urlDeleteRV}/${id}`);}

  private urlGetNbrPatientParMonth="http://localhost:8281/patient/patientParMonth?month=" ; 
  getNbrPatientParMonth(month : number): Observable<number> {
    return this.http.get<number>(`${this.urlGetNbrPatientParMonth+ month}`); }
  
  private urlGetMyennesAgesPatients="http://localhost:8281/patient/getMoyenneAgeParMonth?month=" ; 
  getMoyenneAgesPatientParMonth(month : number): Observable<number> {
    return this.http.get<number>(`${this.urlGetMyennesAgesPatients+ month}`); }
  

    private urlPrensence = 'http://localhost:8281/rendezVous/presence/';
    presence( idRV: number): Observable<any> {
    return this.http.post(`${this.urlPrensence}`, idRV);} 
}
