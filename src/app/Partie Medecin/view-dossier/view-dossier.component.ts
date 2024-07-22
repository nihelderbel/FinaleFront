import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DossierMedical } from 'src/app/Modeles/DossierMedecial';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { AdminMedicalService } from 'src/app/Services/Admin Medical/admin-medical.service';
import { DossierService } from 'src/app/Services/Medecin/Dossier Medical/dossier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-dossier',
  templateUrl: './view-dossier.component.html',
  styleUrls: ['./view-dossier.component.css']
})
export class ViewDossierComponent implements OnInit {
  dossierFinal : any ={}
  imageParDefaut : string='';
  medecin : any ; 
  nomPrenomMedecin : any ; 
  imagePath : any ; 
  dossierSupprimer :any;
  p : number =1 ; 
  dossiers:DossierMedical[] =[];

 constructor(private dossierService:DossierService,private router:Router  , private serviceAM : AdminMedicalService, private service : AdminDigitalService){}

 ngOnInit() {
  this.service.getMedecin(parseInt(localStorage.getItem('idMedecin'))).subscribe(data=>{
    this.medecin=data;
    console.log( "Medecin Connecte  ", this.medecin.nom+" "+this.medecin.prenom);
    this.nomPrenomMedecin = this.medecin.nom+" "+this.medecin.prenom; 
    if(this.medecin.image ==null){
      this.imagePath="./assets/icons/user1.png";
      this.imageParDefaut="./assets/icons/user1.png";
    }
    else{
      this.imagePath="http://localhost:8281/medecin/getImageMedecin/"+this.medecin.id ; }

      this.service.getAllMedecins().subscribe(data => {
        this.service.MedecinData =  data;
        this.service.testTabMedecins = this.service.MedecinData.length;
        console.log("les mdecins sont :"+this.service.MedecinData) ;
  }); 
  });
  this.refreshList();
  this.getAllDossiersPatients() ; 
}
  

refreshList(){
  this.dossierService.getDossier().subscribe(data =>{
    this.dossiers=data;
  } );
   }
   logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

 
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
  } 
  getAllDossiersPatients(){
    this.serviceAM.getAllPatientsADossierMedicaux().subscribe(data => {
      this.serviceAM.DossierData =  data;
      this.serviceAM.testDossier = this.serviceAM.DossierData.length;
    }) ; 
  }


   /*********************** recherche par nom patient *****************************************/
   set texte(chaine: string) {
    this.serviceAM.DossierData = this.filtrer(chaine);}
 
  filtrer(sousChaine: string) {
    this.serviceAM.getAllPatientsADossierMedicaux().subscribe(data=>{
    this.dossierFinal=data;});     
    return this.dossierFinal.filter(e => e.gender.toLowerCase().includes(sousChaine.toLowerCase()) || 
                                          e.nom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                          e.prenom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                          e.telephone.toString().indexOf(sousChaine) != -1 ||
                                          e.date_inscription.toString().indexOf(sousChaine) != -1 ||
                                          e. dossierMedical.date_creation_dossier.toString().indexOf(sousChaine) != -1 ||
                                          e.cin === parseInt(sousChaine));}


}
