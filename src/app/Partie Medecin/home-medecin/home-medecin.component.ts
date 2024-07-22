import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { PatientService } from 'src/app/Services/Patients/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-medecin',
  templateUrl: './home-medecin.component.html',
  styleUrls: ['./home-medecin.component.css']
})
export class HomeMedecinComponent implements OnInit {
  medecin :any ; 
  nomPrenomAdmin : any ;
  imagePath : any ; 
   
  public constructor(private servicePatient : PatientService, private service : AdminDigitalService , private router : Router , private route : ActivatedRoute) { }

  ngOnInit() {
    this.service.getMedecin(parseInt(localStorage.getItem('idMedecin'))).subscribe(data=>{
      this.medecin=data;
      console.log( "Medecin Connecte  ", this.medecin.nom+" "+this.medecin.prenom);
      this.nomPrenomAdmin = this.medecin.nom+" "+this.medecin.prenom; 
      if(this.medecin.image ==null){
        this.imagePath="./assets/icons/user1.png"
      }
      else{
        this.imagePath="http://localhost:8281/medecin/getImageMedecin/"+this.medecin.id ; }
  
        this.service.getAllMedecins().subscribe(data => {
          this.service.MedecinData =  data;
          this.service.testTabMedecins = this.service.MedecinData.length;
          console.log("les mdecins sont :"+this.service.MedecinData) ;
    }); 
    });
    this.getALLMyRV()
  }
  getALLMyRV(){
    this.servicePatient.getMyRvMedecin(parseInt(localStorage.getItem('idMedecin'))).subscribe(data=>{
      this.servicePatient.RVData=data
      this.servicePatient.testRV=  this.servicePatient.RVData.length;
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
  supprimer(idRdv : number ){
 
    Swal.fire({
      title: 'Êtes-vous sûr?',
      html: "de supprimer Ce Rendez-Vous  ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteRV(idRdv).subscribe(data=>{
          this.service.RVData = data       

        Swal.fire(
          'Supprimé !',
          'Secrétaire médicala été supprimé.',
          'success'
        )
        this.ngOnInit() }); }}
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
     
      compareDates(dateRdv: Date): boolean {
        const today = new Date();
        const rendezVousDate = new Date(dateRdv);
        return rendezVousDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
      }
      presence(id : number){
       this.servicePatient.presence (id).subscribe(()=>{
        this.getALLMyRV()

       }) ; 
      }
  }


