import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminMedicalService } from 'src/app/Services/Admin Medical/admin-medical.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  mb:any;
  result:any;
    constructor(private service:AdminMedicalService,private router:Router) { }
  
    ngOnInit() {
    }
    login(f:NgForm){ 
      this.service.login(f.value.username, f.value.password).subscribe(data=>{
        this.mb = data;
       this.service.getAdminMedical(this.mb.id).subscribe(data=>{
        this.result = data;
        console.log(this.result);
        localStorage.setItem("Username:", this.result.username);//kn name
        localStorage.setItem("Role:", this.result.role);
        localStorage.setItem("Email", this.result.email);
        localStorage.setItem("idAdminMedicalManager", this.result.id);
        localStorage.setItem('Admin Medical Manager  Conectee ', this.result.nom+" "+this.result.prenom);  
        let accessToken = "Bearer" + this.mb.accessToken;
        localStorage.setItem("token", accessToken);
    
        if(this.result.role === "Admin Medical Manager"){ this.router.navigate(['/homeadmin']);}
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
