import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { AboutUsComponent } from './Home/about-us/about-us.component';
import { AllDoctorsComponent } from './Home/all-doctors/all-doctors.component';
import { ContactUsComponent } from './Home/contact-us/contact-us.component';
import { PageNotFoundComponent } from './Home/page-not-found/page-not-found.component';
import { ServiceComponent } from './Home/service/service.component';
import { RendevousComponent } from './Home/rendevous/rendevous.component';
import { LoginAdminDigitalComponent } from './Admin Digital/login-admin-digital/login-admin-digital.component';
import { HomeAdminDigitalComponent } from './Admin Digital/home-admin-digital/home-admin-digital.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AllDepartementComponent } from './Admin Digital/all-departement/all-departement.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllMedecinComponent } from './Admin Digital/all-medecin/all-medecin.component';
import { AllOperationsComponent } from './Admin Digital/all-operations/all-operations.component';
import { AllPatientComponent } from './Admin Digital/all-patient/all-patient.component';
import { ProfileComponent } from './Admin Digital/profile/profile.component';
import { RendezVousComponent } from './Admin Digital/rendez-vous/rendez-vous.component';
import { AllSecretaireComponent } from './Admin Digital/all-secretaire/all-secretaire.component';
import { DepartementsAMComponent } from './Admin Medical/departements-am/departements-am.component';
import { HomeSecretaireComponent } from './Admin Medical/home-secretaire/home-secretaire.component';
import { LoginSecretaireComponent } from './Admin Medical/login-secretaire/login-secretaire.component';
import { MedecinsAMComponent } from './Admin Medical/medecins-am/medecins-am.component';
import { OperationsAMComponent } from './Admin Medical/operations-am/operations-am.component';
import { PatientsAMComponent } from './Admin Medical/patients-am/patients-am.component';
import { ProfileAMComponent } from './Admin Medical/profile-am/profile-am.component';
import { RendezVousAMComponent } from './Admin Medical/rendez-vous-am/rendez-vous-am.component';
import { HomeMedecinComponent } from './Partie Medecin/home-medecin/home-medecin.component';
import { LoginMedecinComponent } from './Partie Medecin/login-medecin/login-medecin.component';
import { ViewPlageComponent } from './Partie Medecin/view-plage/view-plage.component';
import { ProfileMedecinComponent } from './Partie Medecin/profile-medecin/profile-medecin.component';
import { ViewMedecinComponent } from './Partie Medecin/view-medecin/view-medecin.component';
import { ViewPatientsComponent } from './Partie Medecin/view-patients/view-patients.component';
import { ViewRendezVousComponent } from './Partie Medecin/view-rendez-vous/view-rendez-vous.component';
import { ViewDossierComponent } from './Partie Medecin/view-dossier/view-dossier.component';
import { HomePatientComponent } from './Partie Patient/home-patient/home-patient.component';
import { LoginPatientComponent } from './Partie Patient/login-patient/login-patient.component';
import { ProfilePComponent } from './Partie Patient/profile-p/profile-p.component';
import { RendezVousPComponent } from './Partie Patient/rendez-vous-p/rendez-vous-p.component';
import { SignupPatientComponent } from './Partie Patient/signup-patient/signup-patient.component';
import { MonDossierComponent } from './Partie Patient/mon-dossier/mon-dossier.component';
import { LoginComponent } from './Leoni/BMW/login/login/login.component';
import { ViewAuditComponent } from './Leoni/BMW/view/view-audit/view-audit.component';
import { LoginVWComponent } from './Leoni/VW/Login/login-vw/login-vw.component';
import { LoginAudiComponent } from './Leoni/Audi/login-audi/login-audi.component';
import { LoginMebComponent } from './Leoni/MEB-Autark/login/login-meb/login-meb.component';
import { LoginOEMComponent } from './Leoni/OEM-S/Login/login-oem/login-oem.component';
import { LoginMHComponent } from './Leoni/MH1/Login/login-mh/login-mh.component';
import { LoginMH2Component } from './Leoni/MH2/login/login-mh2/login-mh2.component';
import { LoginMnComponent } from './Leoni/MN/login/login-mn/login-mn.component';
import { LoginMsComponent } from './Leoni/MS/login/login-ms/login-ms.component';
import { LoginmbComponent } from './Leoni/MB/login/loginmb/loginmb.component';
import { LoginAdminComponent } from './Leoni/Admin/Login/login-admin/login-admin.component';
import { HomeaudiComponent } from './leoni/Audi/home/homeaudi/homeaudi.component';
import { HomeComponent } from './Leoni/Admin/Home/home/home.component';
import { AddPcdaComponent } from './Leoni/PCDA/add/add-pcda/add-pcda.component';
import { ViewPcdaComponent } from './Leoni/PCDA/view/view-pcda/view-pcda.component';
import { EditPcdaComponent } from './Leoni/PCDA/edit/edit-pcda/edit-pcda.component';
import { HomembComponent } from './Leoni/MB/home/homemb/homemb.component';
import { HomebmwComponent } from './Leoni/BMW/home/homebmw/homebmw.component';
import { HomevwComponent } from './Leoni/VW/home/homevw/homevw.component';
import { HomemhComponent } from './Leoni/MH1/Home/homemh/homemh.component';
import { Homemh2Component } from './Leoni/MH2/Home/homemh2/homemh2.component';
import { HomemnComponent } from './Leoni/MN/Home/homemn/homemn.component';
import { HomemsComponent } from './Leoni/MS/Home/homems/homems.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutUsComponent,
    AllDoctorsComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    ServiceComponent,
    RendevousComponent,
    LoginAdminDigitalComponent,
    HomeAdminDigitalComponent,
    AllDepartementComponent,
    AllMedecinComponent,
    AllOperationsComponent,
    AllPatientComponent,
    ProfileComponent,
    RendezVousComponent,
    AllSecretaireComponent,
    DepartementsAMComponent,
    HomeSecretaireComponent,
    LoginSecretaireComponent,
    MedecinsAMComponent,
    OperationsAMComponent,
    PatientsAMComponent,
    ProfileAMComponent,
    RendezVousAMComponent,
    HomeMedecinComponent,
    LoginMedecinComponent,
    ViewPlageComponent,
    ProfileMedecinComponent,
    ViewMedecinComponent,
    ViewPatientsComponent,
    ViewRendezVousComponent,
    ViewDossierComponent,
    HomePatientComponent,
    LoginPatientComponent,
    ProfilePComponent,
    RendezVousPComponent,
    SignupPatientComponent,
    MonDossierComponent,
    LoginComponent,
    ViewAuditComponent,
    LoginVWComponent,
    LoginAudiComponent,
    LoginMebComponent,
    LoginOEMComponent,
    LoginMHComponent,
    LoginMH2Component,
    LoginMnComponent,
    LoginMsComponent,
    LoginmbComponent,
    LoginAdminComponent,
    HomeaudiComponent,
    HomeComponent,
    AddPcdaComponent,
    ViewPcdaComponent,
    EditPcdaComponent,
    HomembComponent,
    HomebmwComponent,
    HomevwComponent,
    HomemhComponent,
    Homemh2Component,
    HomemnComponent,
    HomemsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
