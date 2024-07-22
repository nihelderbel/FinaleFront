import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VwService } from 'src/app/Leoni/Services/vw/vw.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-vw',
  templateUrl: './login-vw.component.html',
  styleUrls: ['./login-vw.component.css']
})
export class LoginVWComponent implements OnInit {
mb:any;
result:any;

  constructor(private service:VwService,private router:Router) { }

  ngOnInit() {
  }
  login(f:NgForm){ 
    this.service.login(f.value.username, f.value.password).subscribe(data=>{
      this.mb = data;
     this.service.getUservw(this.mb.id).subscribe(data=>{
      this.result = data;
      console.log(this.result);
      localStorage.setItem("Username:", this.result.username);//kn name
      localStorage.setItem("Role:", this.result.role);
      localStorage.setItem("Email", this.result.email);
      localStorage.setItem("idUserVW", this.result.id);
      localStorage.setItem('User VW  Conectee ', this.result.nom+" "+this.result.prenom);  
      let accessToken = "Bearer" + this.mb.accessToken;
      localStorage.setItem("token", accessToken);
  
      if(this.result.role === "User VW"){ this.router.navigate(['/homevw']);}
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
