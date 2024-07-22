import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/Services/Patients/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-patient',
  templateUrl: './login-patient.component.html',
  styleUrls: ['./login-patient.component.css']
})
export class LoginPatientComponent implements OnInit {
  patient : any
  result : any ; 
  public constructor(private service : PatientService , private router : Router ) { }

  ngOnInit() {
   

}
login(f:NgForm){ 
  this.service.login(f.value.username, f.value.password).subscribe(data=>{
    this.patient = data;
   this.service.getPatient(this.patient.id).subscribe(data=>{
    this.result = data;
    console.log(this.result);
    localStorage.setItem("Username:", this.result.username);//kn name
    localStorage.setItem("Role:", this.result.role);
    localStorage.setItem("Email", this.result.email);
    localStorage.setItem("idPatient", this.result.id);
    localStorage.setItem('Patient Conectee ', this.result.nom+" "+this.result.prenom);  
    let accessToken = "Bearer" + this.patient.accessToken;
    localStorage.setItem("token", accessToken);

    if(this.result.role === "Patient"){ this.router.navigate(['/homePatient']);}
    else{
      console.log("error")
      Swal.fire({
        icon:"error",
        title: 'Vérifier votre identifiant et votre  mot de passe  !!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'}})}} 
    ,err=>{
  
      Swal.fire({
        icon:"error",
        title: 'Vérifier votre identifiant et votre  mot de passe  !!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })  
    //this.invalidLogin = true
    });
    }
    ,err=>{
  
      Swal.fire({
        icon:"error",
        title: 'Vérifier votre identifiant et votre  mot de passe  !!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })  
    //this.invalidLogin = true
    });
    }
  }
