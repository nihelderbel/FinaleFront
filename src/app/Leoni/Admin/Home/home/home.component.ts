import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { AdminMedicalService } from 'src/app/Services/Admin Medical/admin-medical.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   imageParDefaut  :string="./assets/icons/user1.png"
  imagePath : string="";
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  defaut : string 
  constructor(private router : Router,private service : AdminMedicalService ,private serviceAdminDigital : AdminDigitalService) { }

  ngOnInit() {
    
    this.service.getAdminMedical(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
    this.admin=data;
    console.log( "Admin Connecte  ", this.admin.nom+" "+this.admin.prenom);
    this.nomPrenomAdmin = this.admin.nom+" "+this.admin.prenom; 
    if(this.admin.image ==null){
      this.imagePath="./assets/icons/user1.png"
      this.imageParDefaut="./assets/icons/user1.png"
      this.defaut="./assets/icons/user1.png"
    }
    else{
      this.imagePath="http://localhost:8281/adminMedical/getImageProfileAdminMedical/"+this.admin.id ; }
      this.serviceAdminDigital.getAllMedecins().subscribe(data => {
        this.serviceAdminDigital.MedecinData =  data;
        this.serviceAdminDigital.testTabMedecins = this.serviceAdminDigital.MedecinData.length;
        console.log("les mdecins sont :"+this.serviceAdminDigital.MedecinData) ; 
  });
  });
  
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
