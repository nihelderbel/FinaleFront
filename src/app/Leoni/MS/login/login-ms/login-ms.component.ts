import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MsService } from 'src/app/Leoni/Services/Ms/ms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-ms',
  templateUrl: './login-ms.component.html',
  styleUrls: ['./login-ms.component.css']
})
export class LoginMsComponent implements OnInit {
mb:any;
result:any;

  constructor(private service:MsService,private router:Router) { }

  ngOnInit() {
  }
  login(f:NgForm){ 
    this.service.login(f.value.username, f.value.password).subscribe(data=>{
      this.mb = data;
     this.service.getUserms(this.mb.id).subscribe(data=>{
      this.result = data;
      console.log(this.result);
      localStorage.setItem("Username:", this.result.username);//kn name
      localStorage.setItem("Role:", this.result.role);
      localStorage.setItem("Email", this.result.email);
      localStorage.setItem("idUserMS", this.result.id);
      localStorage.setItem('User MS  Conectee ', this.result.nom+" "+this.result.prenom);  
      let accessToken = "Bearer" + this.mb.accessToken;
      localStorage.setItem("token", accessToken);
  
      if(this.result.role === "User MS"){ this.router.navigate(['/homems']);}
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
