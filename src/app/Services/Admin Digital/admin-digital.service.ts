import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDigitalService {
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


  RVData:any=[];
  testRV: number ; 
  constructor(private http: HttpClient) { }
 

  private urlLogin = 'http://localhost:8281/adminDigital/login';
  login(username : string, password: string) {
  return this.http.post(`${this.urlLogin}`,{username, password});}
  
  private urlAdminDigital = 'http://localhost:8281/adminDigital/getAdminDigital';
  getAdminDigital(id: number): Observable<Object> {
  return this.http.get(`${this.urlAdminDigital}/${id}`);}

  private urlUpdate= 'http://localhost:8281/adminDigital/update';
  updatedata(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}

  private urlImage= 'http://localhost:8281/adminDigital/updateImageProfileAdminDigial';  
  updateImage(id: number, file : File): Observable<any> {
  return this.http.put(`${this.urlImage}/${id}`,file);}

  private urlGetPatientPArDateInscription = "http://localhost:8281/patient/allToDay" ;
  getAllPatientsByDateInscription(): Observable<any> {
    return this.http.get<any>(`${this.urlGetPatientPArDateInscription}`)
  }

  private urlGetAllMedecinsToDay = "http://localhost:8281/medecin/allToDay" ;
  getAllMedecinsToDayInscris(): Observable<any> {
    return this.http.get<any>(`${this.urlGetAllMedecinsToDay}`)
  }
  private urlGetAllRendezVousToDay = "http://localhost:8281/rendezVous/allToDay" ;
  getAllRendezVousToDay(): Observable<any> {
    return this.http.get<any>(`${this.urlGetAllRendezVousToDay}`)
  }
  private urlGetAllOperationsToDay = "http://localhost:8281/operation/allToDay" ;
  getAllOperationsToDay(): Observable<any> {
    return this.http.get<any>(`${this.urlGetAllOperationsToDay}`)
  }

  /************************************** Départements **************************************************/  
  private urlDeleteDepartement = 'http://localhost:8281/specialite/deletSpecialite';
  deleteDepartement(id : number): Observable<any> {
  return this.http.delete(`${this.urlDeleteDepartement}/${id}`);}
  
  private urlGetAllDepartement = 'http://localhost:8281/specialite/getAll';
  getAllDepartement(): Observable<Object> {
  return this.http.get(`${this.urlGetAllDepartement}`);}
  
  private urlGetDepartement = 'http://localhost:8281/specialite/getSpecialite';
  getDepartement(id : number): Observable<number> {
  return this.http.get<number>(`${this.urlGetDepartement}/${id}`);}

  private urlAddDepartement= 'http://localhost:8281/specialite/addSpecialite';
  addDepartement(value:any): Observable<any>{
  return this.http.post(`${this.urlAddDepartement}`, value);}
  
  private urlUpdateDepartement= 'http://localhost:8281/specialite/updateSpecialite';
  updateDepartement(id: number, value: any ): Observable<any> {
  return this.http.put(`${this.urlUpdateDepartement}/${id}`, value);}
  
/*************************************  Médecin   ************************************************ */
  private urlGetAllMedecins = 'http://localhost:8281/medecin/all';
  getAllMedecins(): Observable<Object> {
  return this.http.get(`${this.urlGetAllMedecins}`);}
    
  private urlGetMedecin = 'http://localhost:8281/medecin/getMedecin';
  getMedecin(id : number): Observable<number> {
  return this.http.get<number>(`${this.urlGetMedecin}/${id}`);}  

  private urlDeleteMedecin = 'http://localhost:8281/medecin/delecteMedecin';
  deleteMedecin(id : number): Observable<any> {
  return this.http.delete(`${this.urlDeleteMedecin}/${id}`);}

  private urlUpdateMedecin= 'http://localhost:8281/medecin/updateMedecin';
  updateMedecin(id: number, value: any ): Observable<any> {
  return this.http.put(`${this.urlUpdateMedecin}/${id}`, value);}

 private urlImageMedecin= 'http://localhost:8281/medecin/updateImageMedecin';  
  updateImageMedecin(id: number, file : File): Observable<any> {
  return this.http.put(`${this.urlImageMedecin}/${id}`,file);}
        
/****************************************** Patients ******************************************************/
  private urlGetAllPatients = 'http://localhost:8281/patient/all';
  getAllPatients(): Observable<Object> {
  return this.http.get(`${this.urlGetAllPatients}`);}

  private urlGetPatient= 'http://localhost:8281/patient/getPatient';
  getPatient(id : number): Observable<number> {
  return this.http.get<number>(`${this.urlGetPatient}/${id}`);}  

  private urlDeletePatient = 'http://localhost:8281/patient/deletPatient';
  deletePatient(id : number): Observable<any> {
  return this.http.delete(`${this.urlDeletePatient}/${id}`);}
  




  private urlGetNbrPatientCeMois="http://localhost:8281/patient/parMonth" ; 
  getNbrPatientCeMois(): Observable<number> {
    return this.http.get<number>(`${this.urlGetNbrPatientCeMois}`)
  }
  private urlGetNbrPatientCetteAnnee="http://localhost:8281/patient/parYear" ; 
  gtNbrPatientCetteAnnee(): Observable<number> {
    return this.http.get<number>(`${this.urlGetNbrPatientCetteAnnee}`)
  }
  private urlGetNbrPatientCetteSemaine="http://localhost:8281/patient/allParSemaine" ; 
  gtNbrPatientCetteSemaine(): Observable<number> {
    return this.http.get<number>(`${this.urlGetNbrPatientCetteSemaine}`)
  }
  private urlGetNbrPatientParMonth="http://localhost:8281/patient/patientParMonth?month=" ; 
  getNbrPatientParMonth(month : number): Observable<number> {
    return this.http.get<number>(`${this.urlGetNbrPatientParMonth+ month}`); }
  
  private urlGetMyennesAgesPatients="http://localhost:8281/patient/getMoyenneAgeParMonth?month=" ; 
  getMoyenneAgesPatientParMonth(month : number): Observable<number> {
    return this.http.get<number>(`${this.urlGetMyennesAgesPatients+ month}`); }
  
 /*************************************Secretaire *********************************************/
 private urlSendEmailAdminMedical= 'http://localhost:8281/api/sendEmailAdminEtMedecin';
 sendEmailToSecretaire(email: string): Observable<any> {
 return this.http.post(`${this.urlSendEmailAdminMedical}`, { email });}

 private urlAddMedecinParAdmin= 'http://localhost:8281/adminMedical/addAdminMedicalParAdminDigitalSansImage/';
 addAdminMedicalParAdminDigital(value:any , id : number): Observable<any>{
 return this.http.post(`${this.urlAddMedecinParAdmin+id}`, value);}
 
  private urlGetAllSecretaires = 'http://localhost:8281/adminMedical/all';
  getAllSecretaires(): Observable<Object> {
  return this.http.get(`${this.urlGetAllSecretaires}`);}

  private urlGetSecretaire= 'http://localhost:8281/adminMedical/getAdminMedical';
  getSecretaire(id : number): Observable<number> {
  return this.http.get<number>(`${this.urlGetSecretaire}/${id}`);}  

  private urlDeleteSecretaire = 'http://localhost:8281/adminMedical/deletAdminMedical';
  deleteSecretaire(id : number): Observable<any> {
  return this.http.delete(`${this.urlDeleteSecretaire}/${id}`);}
 
  private urlUpdateAdminMedical= 'http://localhost:8281/adminMedical/update';
  updateAdminMedical(id: number, value: any ): Observable<any> {
  return this.http.put(`${this.urlUpdateAdminMedical}/${id}`, value);}

  private urlUpdatePatient= 'http://localhost:8281/patient/updatePatient';
  updatepatient(id: number, value: any ): Observable<any> {
  return this.http.put(`${this.urlUpdatePatient}/${id}`, value);}


  /**********************************  RV     ****************************************/

  private urlGetAllRV = 'http://localhost:8281/rendezVous/allRVReserve';
  getAllRVAuj(): Observable<Object> {
  return this.http.get(`${this.urlGetAllRV}`);}

  private urlDeleteRV = 'http://localhost:8281/rendezVous/deletRendezVous';
  deleteRV(id : number): Observable<any> {
  return this.http.delete(`${this.urlDeleteRV}/${id}`);}

}
