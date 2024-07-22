import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RendezVous } from 'src/app/Modeles/Rendez-Vous';
import { Patient } from 'src/app/Modeles/patient';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { RendezVousService } from 'src/app/Services/Medecin/Rendez-vous/rendez-vous.service';
import { MedecinService } from 'src/app/Services/Medecin/medecin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-rendez-vous',
  templateUrl: './view-rendez-vous.component.html',
  styleUrls: ['./view-rendez-vous.component.css']
})
export class ViewRendezVousComponent implements OnInit {
  p : number =1 ;
  medecin : any ; 
  nomPrenomMedecin : any ; 
  imagePath : any ; 
  imageParDefaut : any ; 
  patients: Patient[] = [];
  patientASupprimer : any ;  
  rendez:RendezVous[]=[];
  constructor(private RendezService:RendezVousService,private router:Router , private service : AdminDigitalService){}
 
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
   });
   this.RendezService.getRendez().subscribe(data =>{
    this.rendez=data ;
   })
 }

 getAllPatients(){
  this.service.getAllPatients().subscribe(data=>{
  setTimeout(()=>{ }, 4000);
  this.service.PatientData=data;})
  }
  supprimer(id :number){
    this.service.getPatient(id).subscribe(data=>{
      this.patientASupprimer = data
         
    Swal.fire({
      title: 'Êtes-vous sûr?',
      html: "de supprimer Ce Patient  : <br>" +this.patientASupprimer.prenom+" "+ this.patientASupprimer.nom,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletePatient(id).subscribe(()=>{this.getAllPatients()
          console.log("ok")
        Swal.fire(
          'Supprimé !',
          'Patient a été supprimé.',
          'success'
        ) }
        , err=>{
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            background :'#f27474',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          })
          
           Toast.fire({
            icon: 'error',
            title: 'Error'
          })
        })
      }
      });
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
  } 
 
 set texte(a:string){
   this.rendez=this.filtrer(a);
 }
 filtrer(a: string) {
   return this.rendez.filter(x=>x.Nom.indexOf(a)!= -1);
 }
 refreshList(){
   this.RendezService.getRendez().subscribe(data =>{
     this.rendez=data;
   } );
    }
 onDelete(id:number){
   this.RendezService.deleteRendez(id).subscribe({
 
     next:(res: any)=>{
     alert("Rendez-Vous Deleted successfully");
     this.refreshList();
     },
     error:(res: any)=>{
     alert("error");
     },
     })
 }
 logout() {
  localStorage.clear();
  this.router.navigate(['']);
}
 }
 