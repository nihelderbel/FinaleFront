import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/Modeles/patient';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { PatientService } from 'src/app/Services/Medecin/patient/patient.service';

@Component({
  selector: 'app-view-patients',
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.css']
})
export class ViewPatientsComponent implements OnInit {
  medecin : any ; 
  nomPrenomMedecin : any ; 
  imagePath : any ; 
  p : number =1 ; 
  patients:Patient[]=[];
  imageParDefaut  ="./assets/icons/user1.png";
  constructor(private PatientService:PatientService,private router:Router, private service : AdminDigitalService){}

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

      this.refreshList() ; 
  });
 }
 set texte(a:string){
   this.patients=this.filtrer(a);
 }
 filtrer(a: string) {
   return this.patients.filter(x=>x.nom.indexOf(a)!= -1);
 }
 refreshList(){
   this.PatientService.getPatient().subscribe(data =>{
     this.patients=data;
   } );
    }
 
 formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
} 
logout() {
  localStorage.clear();
  this.router.navigate(['']);
}
}