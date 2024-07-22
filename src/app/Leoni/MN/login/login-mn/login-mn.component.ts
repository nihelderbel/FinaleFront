import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MnService } from 'src/app/Leoni/Services/Mn/mn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-mn',
  templateUrl: './login-mn.component.html',
  styleUrls: ['./login-mn.component.css']
})
export class LoginMnComponent implements OnInit {
result:any;
mb:any;
  constructor(private service:MnService,private router:Router) { }

  ngOnInit() {
  }
  login(f:NgForm){ 
    this.service.login(f.value.username, f.value.password).subscribe(data=>{
      this.mb = data;
     this.service.getUsermn(this.mb.id).subscribe(data=>{
      this.result = data;
      console.log(this.result);
      localStorage.setItem("Username:", this.result.username);//kn name
      localStorage.setItem("Role:", this.result.role);
      localStorage.setItem("Email", this.result.email);
      localStorage.setItem("idUserMN", this.result.id);
      localStorage.setItem('User MN  Conectee ', this.result.nom+" "+this.result.prenom);  
      let accessToken = "Bearer" + this.mb.accessToken;
      localStorage.setItem("token", accessToken);
  
      if(this.result.role === "User MN"){ this.router.navigate(['/homemn']);}
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
