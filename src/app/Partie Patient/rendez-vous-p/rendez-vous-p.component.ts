import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medecin } from 'src/app/Modeles/medecin';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { MedecinService } from 'src/app/Services/Medecin/medecin.service';
import { PatientService } from 'src/app/Services/Patients/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rendez-vous-p',
  templateUrl: './rendez-vous-p.component.html',
  styleUrls: ['./rendez-vous-p.component.css']
})
export class RendezVousPComponent implements OnInit {

  patient : any 
  nomPrenomPatient : any
  imagePath : any  ;
  departements:any={};
  medecins:any={};
  all:any={};
  departementSelectionne: string = '';
  medecinSelectionne: string = '';
  selectedDate: string;
  nomMedecin : any 
  textValue: string;
  idMedecinSelectionner : number ; 
  selectionnerDepartement(departement: Departement) {
    this.departementSelectionne = departement.nom;
    this.getMedecins(this.departementSelectionne) ;
    console.log("departemmmmmment : "+  this.departementSelectionne)

  }
  selectionnerMedecin(medecin: Medecin) {
    this.medecinSelectionne = medecin.nom+" "+medecin.prenom;
    this.idMedecinSelectionner = medecin.id ;
  }
    public constructor(private service : PatientService, private serviceAD : AdminDigitalService, 
      private serviceM : MedecinService, private router : Router, private route : ActivatedRoute) { }
  ngOnInit(): void {
    this.service.getPatient(parseInt(localStorage.getItem('idPatient'))).subscribe(data=>{
      this.patient=data;
      this.nomPrenomPatient = this.patient.nom+" "+this.patient.prenom; 
      if(this.patient.image ==null){
        this.imagePath="./assets/icons/user1.png"
      }
      else{
        this.imagePath="http://localhost:8281/patient/getImageProfilePatient/"+this.patient.id ; }
  
       
      });
     this.serviceAD.getAllDepartement().subscribe(data=>{
     this.departements=data
     this.service.getAllMedecinsParSpecialite(this.departementSelectionne).subscribe(data=>{
     this.medecins = data 
      console.log("medecinssssssssssssssssssss:"+this.medecins)
  
  })
   
})}
 getMedecins(departement : string ){
  this.service.getAllMedecinsParSpecialite(this.departementSelectionne).subscribe(data=>{
  this.medecins = data });
}
addRV(fadd:NgForm){
console.log("dateeeeeeeeeeeee" , fadd.value.date_rv )
console.log("id Medecinnnnnnnnnnnn" , this.idMedecinSelectionner)
let dateRdv = fadd.value.dateRdv 
let description = fadd.value.textarea
let value={dateRdv ,description}
  this.service.addRVParPatient(parseInt(localStorage.getItem('idPatient')) ,this.idMedecinSelectionner , value).subscribe(()=>{
    Swal.fire({
      icon:"success",
      title: 'Vous avez réservé un rendez-vous!!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'}}
    ) 
    this.router.navigateByUrl('homePatient');
  },err=>{
    Swal.fire({
      icon:"error",
      title: 'Erreur , Répeter svp !!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'}});
      
      });
    }
    logout() {
      localStorage.clear();
      this.router.navigateByUrl('');
    }
    todayDate(): string {
      return new Date().toISOString().split('T')[0];
    }
 
  }
  