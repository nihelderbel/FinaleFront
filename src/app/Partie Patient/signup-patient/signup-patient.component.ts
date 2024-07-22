import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/Services/Patients/patient.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup-patient',
  templateUrl: './signup-patient.component.html',
  styleUrls: ['./signup-patient.component.css']
})
export class SignupPatientComponent implements OnInit {
  patient : any
  result : any ; 
  antecedantss : any=["diabete", "hypertension", "asthme"]
  public constructor(private service : PatientService , private router : Router) { }

  ngOnInit() {
  }
registre(f : NgForm){
   const genderDetails = document.querySelector('.gender-details') as HTMLElement;
  const dot1 = genderDetails.querySelector('#dot-1') as HTMLInputElement;
  const dot2 = genderDetails.querySelector('#dot-2') as HTMLInputElement;
  genderDetails.addEventListener('change', function(event) {
    if (dot1.checked) {
        const genreSelectionne = 'Homme';
        console.log(genreSelectionne);
    } else if (dot2.checked) {
        const genreSelectionne = 'Femme';
        console.log(genreSelectionne);
    }
});
const dateNaissanceInput = document.getElementById('date_naissance') as HTMLInputElement;
dateNaissanceInput.addEventListener('change', function(event) {
    const dateNaissanceSelectionnee = dateNaissanceInput.value;
    console.log(dateNaissanceSelectionnee);
});
let nom = f.value.nom 
let prenom = f.value.prenom 
let cin = f.value.cin 
let email = f.value.email 
let telephone = f.value.telephone 
let notes = f.value.notes 
let gender = f.value.gender; 
let date_naissance = f.value.date_naissance; 
//let dateFormatee = new Date(date_naissance).toISOString().split('T')[0];
let antecedants = this.antecedantss ; 
let avis = notes ; 
 let value ={ cin , nom , prenom  ,gender ,email , telephone, date_naissance ,avis ,notes}

 console.log("hhhhhh "+f.value.date_naissance)
  this.service.registre(value).subscribe(data=>{
    this.patient = data;
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['p_patient']);});
  }
   ,err=>{
      Swal.fire({
        icon:"error",
        title: 'Patient existe déjà !!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'}})});
  
        }
 todayDate(): string {
return new Date().toISOString().split('T')[0]; }
            
}

