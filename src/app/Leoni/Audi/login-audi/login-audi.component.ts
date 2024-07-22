import { Component, OnInit } from '@angular/core';
import { AudiService } from '../../Services/Audi/audi.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-audi',
  templateUrl: './login-audi.component.html',
  styleUrls: ['./login-audi.component.css']
})
export class LoginAudiComponent implements OnInit {
  audi : any
  result : any ; 
  public constructor(private service : AudiService , private router : Router ) { }


  ngOnInit() {
  }
  
login(f:NgForm){ 
  this.service.login(f.value.username, f.value.password).subscribe(data=>{
    this.audi = data;
   this.service.getUserAudi(this.audi.id).subscribe(data=>{
    this.result = data;
    console.log(this.result);
    localStorage.setItem("Username:", this.result.username);//kn name
    localStorage.setItem("Role:", this.result.role);
    localStorage.setItem("Email", this.result.email);
    localStorage.setItem("idUserAudi", this.result.id);
    localStorage.setItem('User Audi  Conectee ', this.result.nom+" "+this.result.prenom);  
    let accessToken = "Bearer" + this.audi.accessToken;
    localStorage.setItem("token", accessToken);

    if(this.result.role === "User Audi"){ this.router.navigate(['/homeaudi']);}
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
