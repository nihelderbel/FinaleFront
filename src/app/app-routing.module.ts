import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { AboutUsComponent } from './Home/about-us/about-us.component';
import { AllDoctorsComponent } from './Home/all-doctors/all-doctors.component';
import { ContactUsComponent } from './Home/contact-us/contact-us.component';
import { ServiceComponent } from './Home/service/service.component';
import { RendevousComponent } from './Home/rendevous/rendevous.component';
import { LoginAdminDigitalComponent } from './Admin Digital/login-admin-digital/login-admin-digital.component';
import { HomeAdminDigitalComponent } from './Admin Digital/home-admin-digital/home-admin-digital.component';
import { AllDepartementComponent } from './Admin Digital/all-departement/all-departement.component';
import { ProfileComponent } from './Admin Digital/profile/profile.component';
import { AllMedecinComponent } from './Admin Digital/all-medecin/all-medecin.component';
import { AllPatientComponent } from './Admin Digital/all-patient/all-patient.component';
import { RendezVousComponent } from './Admin Digital/rendez-vous/rendez-vous.component';
import { AllOperationsComponent } from './Admin Digital/all-operations/all-operations.component';
import { AllSecretaireComponent } from './Admin Digital/all-secretaire/all-secretaire.component';
import { PageNotFoundComponent } from './Home/page-not-found/page-not-found.component';
import { LoginSecretaireComponent } from './Admin Medical/login-secretaire/login-secretaire.component';
import { HomeSecretaireComponent } from './Admin Medical/home-secretaire/home-secretaire.component';
import { RendezVousAMComponent } from './Admin Medical/rendez-vous-am/rendez-vous-am.component';
import { OperationsAMComponent } from './Admin Medical/operations-am/operations-am.component';
import { MedecinsAMComponent } from './Admin Medical/medecins-am/medecins-am.component';
import { DepartementsAMComponent } from './Admin Medical/departements-am/departements-am.component';
import { ProfileAMComponent } from './Admin Medical/profile-am/profile-am.component';
import { PatientsAMComponent } from './Admin Medical/patients-am/patients-am.component';
import { LoginMedecinComponent } from './Partie Medecin/login-medecin/login-medecin.component';
import { HomeMedecinComponent } from './Partie Medecin/home-medecin/home-medecin.component';
import { ViewDossierComponent } from './Partie Medecin/view-dossier/view-dossier.component';
import { ViewMedecinComponent } from './Partie Medecin/view-medecin/view-medecin.component';
import { ViewPatientsComponent } from './Partie Medecin/view-patients/view-patients.component';
import { ViewPlageComponent } from './Partie Medecin/view-plage/view-plage.component';
import { ViewRendezVousComponent } from './Partie Medecin/view-rendez-vous/view-rendez-vous.component';
import { ProfileMedecinComponent } from './Partie Medecin/profile-medecin/profile-medecin.component';
import { LoginPatientComponent } from './Partie Patient/login-patient/login-patient.component';
import { HomePatientComponent } from './Partie Patient/home-patient/home-patient.component';
import { SignupPatientComponent } from './Partie Patient/signup-patient/signup-patient.component';
import { ProfilePComponent } from './Partie Patient/profile-p/profile-p.component';
import { RendezVousPComponent } from './Partie Patient/rendez-vous-p/rendez-vous-p.component';
import { LoginAudiComponent } from './Leoni/Audi/login-audi/login-audi.component';
import { LoginComponent } from './Leoni/BMW/login/login/login.component';
import { LoginMebComponent } from './Leoni/MEB-Autark/login/login-meb/login-meb.component';
import { LoginMHComponent } from './Leoni/MH1/Login/login-mh/login-mh.component';
import { LoginMH2Component } from './Leoni/MH2/login/login-mh2/login-mh2.component';
import { LoginMnComponent } from './Leoni/MN/login/login-mn/login-mn.component';
import { LoginMsComponent } from './Leoni/MS/login/login-ms/login-ms.component';
import { LoginOEMComponent } from './Leoni/OEM-S/Login/login-oem/login-oem.component';
import { LoginVWComponent } from './Leoni/VW/Login/login-vw/login-vw.component';
import { LoginmbComponent } from './Leoni/MB/login/loginmb/loginmb.component';
import { HomeaudiComponent } from './leoni/Audi/home/homeaudi/homeaudi.component';
import { HomeComponent } from './Leoni/Admin/Home/home/home.component';
import { ViewPcdaComponent } from './Leoni/PCDA/view/view-pcda/view-pcda.component';
import { HomembComponent } from './Leoni/MB/home/homemb/homemb.component';
import { HomebmwComponent } from './Leoni/BMW/home/homebmw/homebmw.component';
import { HomevwComponent } from './Leoni/VW/home/homevw/homevw.component';
import { HomemhComponent } from './Leoni/MH1/Home/homemh/homemh.component';
import { Homemh2Component } from './Leoni/MH2/Home/homemh2/homemh2.component';
import { HomemnComponent } from './Leoni/MN/Home/homemn/homemn.component';
import { HomemsComponent } from './Leoni/MS/Home/homems/homems.component';
import { HomemebComponent } from './Leoni/MEB-Autark/home/homemeb/homemeb.component';
import { HomeomesComponent } from './Leoni/OEM-S/home/homeomes/homeomes.component';



const routes: Routes = [ 
  /******************************** Entrer site web ***********************************************/
{path:"" , component:HomePageComponent },
{path:"accueil" , component:HomePageComponent },
{path:"aboutUs" , component:AboutUsComponent },
{path:"medecin" , component:AllDoctorsComponent},
{path:"contact" , component:ContactUsComponent },
{path:"service" , component:ServiceComponent },
{path:"rendevous" , component:RendevousComponent },
 /*******************Leoni******************************* */
 {path:"audilogin",component:LoginAudiComponent},
 {path:"bmwlogin",component:LoginComponent},
 {path:"loginMeb",component:LoginMebComponent},
 {path:"loginMh1",component:LoginMHComponent},
 {path:"loginMH2",component:LoginMH2Component},
 {path:"loginMN",component:LoginMnComponent},
 {path:"loginMs",component:LoginMsComponent},
 {path:"loginoem",component:LoginOEMComponent},
 {path:"loginVw",component:LoginVWComponent},
 {path:"loginmb",component:LoginmbComponent},
 {path:"homeaudi",component:HomeaudiComponent},
 {path:"homeadmin",component:HomeComponent},
 {path:"viewpcda",component:ViewPcdaComponent},
 {path:"homemb",component:HomembComponent},
 {path:"homebmw",component:HomebmwComponent},
 {path:"homevw",component:HomevwComponent},
 {path:"homemh1",component:HomemhComponent},
 {path:"homemh2",component:Homemh2Component},
 {path:"homemn",component:HomemnComponent},
 {path:"homems",component:HomemsComponent},
 {path:"homemeb",component:HomemebComponent},
 {path:"homeomes",component:HomeomesComponent},






/******************************** Admin Digital Manager ******************************************/

  {path:"admin" , component:LoginAdminDigitalComponent },
  {path:"homeDigitalMedical",component:HomeAdminDigitalComponent },
  {path:"allDepartements",component:AllDepartementComponent },
  {path:"allDepartements/:page", component: AllDepartementComponent }, // Route avec le paramètre de page
  {path:"profileAD",component:ProfileComponent },
  {path:"medecins",component:AllMedecinComponent },
  {path:"patients",component:AllPatientComponent },
  {path:"rendezVous",component:RendezVousComponent },
  {path:"operations",component:AllOperationsComponent },
  {path:"secretaires",component:AllSecretaireComponent },

    /******************************** Admin Medical Manager  *****************************************/
    {path:"secretaire" , component:LoginSecretaireComponent },
    {path:"homeAdminMedical" , component:HomeSecretaireComponent},
    {path:"rendezVousAM",component:RendezVousAMComponent },
    {path:"operationsAM",component:OperationsAMComponent },
    {path:"medecinsAM",component:MedecinsAMComponent },
    {path:"allDepartementsAM",component:DepartementsAMComponent},
    {path:"profileAM",component:ProfileAMComponent   },
    {path:"patientsAM",component:PatientsAMComponent   },
  
      /******************************** Medecin  *****************************************/
      {path:"p_medecin" , component:LoginMedecinComponent},
      {path:"homeMedecin" , component:HomeMedecinComponent },
      {path:"viewDossier",component:ViewDossierComponent},
      {path:"viewMedecin",component:ViewMedecinComponent},
      {path:"view-patient",component:ViewPatientsComponent},
      {path:"view-plage",component:ViewPlageComponent},
      { path:"viewRendez",component:ViewRendezVousComponent},
      { path:"medecinProfile",component:ProfileMedecinComponent},
    
          /******************************** Patient  *****************************************/
      {path:"p_patient" , component:LoginPatientComponent },
      { path:"homePatient",component:HomePatientComponent},
      { path:"signup",component:SignupPatientComponent},
      { path:"profileP",component:ProfilePComponent},
      { path:"rendezVousP",component:RendezVousPComponent}, 
/*********************************************/
  {path:"" , redirectTo:"/accueil",pathMatch:'full'},
  {path:"**" , component:PageNotFoundComponent} ,

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
