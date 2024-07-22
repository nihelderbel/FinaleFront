import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medecin } from 'src/app/Modeles/medecin';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { MedecinService } from 'src/app/Services/Medecin/medecin.service';

@Component({
  selector: 'app-view-medecin',
  templateUrl: './view-medecin.component.html',
  styleUrls: ['./view-medecin.component.css']
})
export class ViewMedecinComponent implements OnInit {

  medecins:Medecin[]=[];
  medecin : any ; 
  nomPrenomMedecin : any ; 
  imagePath : any ; 
  p : number =1 ; 
  s : any ;
  imageParDefaut  : string="./assets/icons/user1.png";

 constructor(private MedecinService:MedecinService,private router:Router  , private service : AdminDigitalService){}

 ngOnInit() {
  this.service.getMedecin(parseInt(localStorage.getItem('idMedecin'))).subscribe(data=>{
    this.medecin=data;
    this.s =this.medecin.specialite.nom ;
    console.log( "Medecin Connecte  ", this.medecin.nom+" "+this.medecin.prenom);
    this.nomPrenomMedecin = this.medecin.nom+" "+this.medecin.prenom; 
    if(this.medecin.image ==null){
      this.imagePath="./assets/icons/user1.png";
    }
    else{
      this.imagePath="http://localhost:8281/medecin/getImageMedecin/"+this.medecin.id ; }

      this.service.getAllMedecins().subscribe(data => {
        this.service.MedecinData =  data;
        this.service.testTabMedecins = this.service.MedecinData.length;
        console.log("les mdecins sont :"+this.service.MedecinData) ;
  }); 
  });
}
set texte(a:string){
  this.medecins=this.filtrer(a);
}
filtrer(a: string) {
  return this.medecins.filter(x=>x.nom.indexOf(a)!= -1);
}
refreshList(){
  this.MedecinService.getMedecin().subscribe(data =>{
    this.medecins=data;
  } );
   }
   logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}