import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/Services/Patients/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent implements OnInit {
patient : any 
nomPrenomPatient : any
imagePath : any  
  public constructor(private service : PatientService , private router : Router, private route : ActivatedRoute) { }
ngOnInit(): void {
  this.service.getPatient(parseInt(localStorage.getItem('idPatient'))).subscribe(data=>{
    this.patient=data;
    this.nomPrenomPatient = this.patient.nom+" "+this.patient.prenom; 
    if(this.patient.image ==null){
      this.imagePath="./assets/icons/user1.png"
    }
    else{
      this.imagePath="http://localhost:8281/patient/getImageProfilePatient/"+this.patient.id ; }
    });
this.getALLMyRV()
  }
  getALLMyRV(){
    this.service.getMyRv(parseInt(localStorage.getItem('idPatient'))).subscribe(data=>{
      this.service.RVData=data
      this.service.testRV=  this.service.RVData.length;
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
  }

