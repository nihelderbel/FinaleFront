import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/Modeles/patient';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {

  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  imagePath : string="";
  patients: Patient[] = [];
  patientASupprimer : any ; 
  imageParDefaut ="./assets/icons/user1.png" ;
  rvFinal:any = [];

  public constructor(private service : AdminDigitalService , private router : Router ,
     private route : ActivatedRoute ) { }
  ngOnInit() {
    this.RVAuj()
    this.service.getAdminDigital(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
    this.admin=data;
    console.log( "Admin Connecte  ", this.admin.nom+" "+this.admin.prenom);
    this.nomPrenomAdmin = this.admin.nom+" "+this.admin.prenom; 
    if(this.admin.image ==null){
      this.imagePath="./assets/icons/user1.png";
      this.imageParDefaut="./assets/icons/user1.png" ;
    }
    else{
      this.imagePath="http://localhost:8281/adminDigital/getImageProfileAdminDigial/"+this.admin.id ; }});

      this.service.getAllPatients().subscribe(data => {
        this.service.PatientData =  data;
        this.service.testTabPatients = this.service.PatientData.length;
        console.log("les mdecins sont :"+this.service.PatientData) ; 
      }) ; 
  }
  getAllPatients(){
    this.service.getAllPatients().subscribe(data=>{
    setTimeout(()=>{ }, 4000);
    this.service.PatientData=data;})
    }
    supprimer(idRV:number){

           
      Swal.fire({
        title: 'Êtes-vous sûr?',
        html: "de supprimer Ce Rendez-Vous  : <br>" ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteRV(idRV).subscribe(()=>{ this.RVAuj()
            console.log("ok")
          Swal.fire(
            'Supprimé !',
            'Rendez-Vous a été supprimé.',
            'success'
          ) 
          this.ngOnInit()}
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
    }
    formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
    } 
  /*********************** recherche par dateRendevous *****************************************/
  set texteee(chaine: string) {
    this.service.RVData = this.filtrer(chaine);}
 
  filtrer(sousChaine: string) {
    this.service.getAllRVAuj().subscribe(data=>{
    this.rvFinal=data;});     
    return this.rvFinal.filter(e => e.nom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                   e.nom.toString().indexOf(sousChaine) != -1 )}
    
/***************************************************************************************************/
RVAuj(){
  this.service.getAllRVAuj().subscribe(data=>{
    this.service.RVData = data ;
    this.service.testRV =  this.service.RVData.length
  })
}

logout() {
  localStorage.clear();
  this.router.navigate(['']);
}
}