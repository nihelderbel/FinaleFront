import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminMedicalService } from 'src/app/Services/Admin Medical/admin-medical.service';
import * as $ from 'jquery';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
@Component({
  selector: 'app-home-secretaire',
  templateUrl: './home-secretaire.component.html',
  styleUrls: ['./home-secretaire.component.css']
})
export class HomeSecretaireComponent implements OnInit {
 imageParDefaut  :string="./assets/icons/user1.png"
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  imagePath : string="";
  patientToDaycount:number = 0;
  medecinsInscrit:number = 0;
  rendezVousToDay:number = 0;
  DossiersTotal:any;
  RVtoDay : any ={} ; 
  defaut : string 
  public constructor(private service : AdminMedicalService ,private serviceAdminDigital : AdminDigitalService, private router : Router , private route : ActivatedRoute) { }
  ngOnInit() {

    this.RVAuj() ;
    this.service.getAllRVtoDay().subscribe(data=>{
    this.RVtoDay =data ; 
    })
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
  this.getNumPatientsToDay();
  this.getNumMedecinsToDay() ; 
  this. getNumRendezVousToDay();
  this.getallNumDossierExiste(); 
  console.log("nbr fi jomlaaaa " + this.DossiersTotal)
  }

  getallNumDossierExiste(){
    this.service.getallNumDossierExiste().subscribe(data=>{
    this.DossiersTotal = data ; 
    })
  }
  getAdminMedicalConnecte(){
    let idAdminString: string | null = localStorage.getItem("idAdmin:");
    let idAdminDigital: number = idAdminString ? parseInt(idAdminString) : 0;
    this.service.getAdminMedical(idAdminDigital).subscribe(data=>{
    this.admin=data;
    console.log( "Admin Connecte  ", this.admin.nom+" "+this.admin.prenom);
    this.nomPrenomAdmin = localStorage.getItem('AdminConnecte') || ""; 

  });
  }
  getNumPatientsToDay(){

    this.serviceAdminDigital.getAllPatientsByDateInscription().subscribe(data=>{
    this.patientToDaycount =data;
  })
  }
  getNumMedecinsToDay(){

    this.serviceAdminDigital.getAllMedecinsToDayInscris().subscribe(data=>{
    this.medecinsInscrit =data;
  })
  }
  getNumRendezVousToDay(){

    this.serviceAdminDigital.getAllRendezVousToDay().subscribe(data=>{
    this.rendezVousToDay =data;
  })
  }

  RVAuj(){
    this.serviceAdminDigital.getAllRVAuj().subscribe(data=>{
      this.serviceAdminDigital.RVData = data ;
      this.serviceAdminDigital.testRV =  this.service.RVData.length
    })
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
  } 
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}