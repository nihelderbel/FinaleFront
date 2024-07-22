import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMedicalService {
  RVData :any=[];
  testRV : number ; 
   DossierData :any=[];
  testDossier : number ; 
  constructor(private http: HttpClient) { }
 
  private urlLogin = 'http://localhost:8281/adminMedical/login';
  login(username : string, password: string) {
    return this.http.post(`${this.urlLogin}`,{username, password});}

  private urlGetAdminMedical = 'http://localhost:8281/adminMedical/getAdminMedical';
  getAdminMedical(id: number): Observable<Object> {
    return this.http.get(`${this.urlGetAdminMedical}/${id}`);}
  
    private urlUpdate= 'http://localhost:8281/adminMedical/update';
  updatedata(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}

  private urlImage= 'http://localhost:8281/adminMedical/updateImageProfileAdminMedical';  
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

  private urlGetSpecialite= 'http://localhost:8281/specialite/getSpecialitee';
  getSpecialite(nom : string): Observable<number> {
  return this.http.get<number>(`${this.urlGetSpecialite}/${nom}`);} 

  private urlGetNbrMedecin = 'http://localhost:8281/specialite/getNbrMedecinParS';
  getNbrMedecinParDepartement(nom : string): Observable<number> {
  return this.http.get<number>(`${this.urlGetNbrMedecin}/${nom}`);}

  private urlSendEmailSecretaire= 'http://localhost:8281/api/sendEmailAdminEtMedecin';
  sendEmailToSecretaire(email: string): Observable<any> {
  return this.http.post(`${this.urlSendEmailSecretaire}`, { email });}

  /************************************** Medecins  ******************************************************/
  private urlAddMedecinParAdmin= 'http://localhost:8281/medecin/addMedecinParAdminSansImage/';
  addMedecinParAdminMedical(value:any , idAdmin : number , idSpecialite): Observable<any>{
  return this.http.post(`${this.urlAddMedecinParAdmin+idAdmin+'/'+idSpecialite}`, value);}

   private urlSendEmailMedecin= 'http://localhost:8281/api/sendEmailAdminEtMedecin';
 sendEmailToMedecin(email: string): Observable<any> {
 return this.http.post(`${this.urlSendEmailMedecin}`, { email });}
  /**********************************    Operations    ****************************************************/
  private urlDeleteOperation = 'http://localhost:8281/operation/deletOperation/';
  deleteOperation(id : number): Observable<any> {
  return this.http.delete(`${this.urlDeleteOperation}/${id}`);}


  /**********************************    RV    ****************************************************/
  private urlDeleteRV = 'http://localhost:8281/rendezVous/deletRendezVous/';
  deleteRV(id : number): Observable<any> {
  return this.http.delete(`${this.urlDeleteRV}/${id}`);}

  private urlGetAllRVToDay = 'http://localhost:8281/rendezVous/allToDay';
  getAllRVtoDay(): Observable<Object> {
  return this.http.get(`${this.urlGetAllRVToDay}`);}


  /***********************   patient     ********************************************** */
  private urlSendEmailPatient= 'http://localhost:8281/api/sendEmailPatient';
  sendEmailToPatient(email: string): Observable<any> {
  return this.http.post(`${this.urlSendEmailPatient}`, { email });}

  private urlUploadRapportMedical= 'http://localhost:8281/DossierMedical/addDossierMedical';  
  uploadDossierMedical(idAdmin: number, file : File): Observable<any> {
  return this.http.post(`${this.urlUploadRapportMedical}/${idAdmin}`,file);}

  private urlModifierDossier= 'http://localhost:8281/DossierMedical/updateDossier';  
  modifierDossierMedical(idDossier: number, file : File): Observable<any> {
  return this.http.put(`${this.urlModifierDossier}/${idDossier}`,file);}

  /**** Dossier Medicale ********************* */

  private urlGetAllPatientsAdmetantDossierMEdicaux = 'http://localhost:8281/DossierMedical/getAllDossierDePatient';
  getAllPatientsADossierMedicaux(): Observable<Object> {
  return this.http.get(`${this.urlGetAllPatientsAdmetantDossierMEdicaux}`);}

  private urlDeleteDosssier = 'http://localhost:8281/DossierMedical/deleteDossierMedical';
  deleteDossier(id : number): Observable<any> {
  return this.http.delete(`${this.urlDeleteDosssier}/${id}`);}

  private urlGetDossier = 'http://localhost:8281/DossierMedical/getRapport';
  getDossier(id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.urlGetDossier}/${id}`, { responseType: 'arraybuffer' });
  }

  private urlGetNumOfDossierMedical = 'http://localhost:8281/DossierMedical/nbrall';
  getAllNumberDossierMedical(): Observable<any> {
  return this.http.get(`${this.urlGetNumOfDossierMedical}`);}

  private urlgetallNumDossierExiste = 'http://localhost:8281/DossierMedical/getNumAllDossierDashbord';
  getallNumDossierExiste(): Observable<any> {
  return this.http.get(`${this.urlgetallNumDossierExiste}`);}
}