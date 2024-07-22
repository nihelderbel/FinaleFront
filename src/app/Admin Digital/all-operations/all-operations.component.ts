import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medecin } from 'src/app/Modeles/medecin';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { AdminMedicalService } from 'src/app/Services/Admin Medical/admin-medical.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-all-operations',
  templateUrl: './all-operations.component.html',
  styleUrls: ['./all-operations.component.css']
})
export class AllOperationsComponent implements OnInit {

  p : number =1 ; 
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  imagePath : string="";
  medecinASupprimer : any ; 
  imageParDefaut ="./assets/icons/user1.png" ;
  dossierFinal : any={}
  rapport : any 
  public constructor(private serviceAM : AdminMedicalService , private service : AdminDigitalService , private router : Router ,
     private route : ActivatedRoute ) { }
  ngOnInit() {
    this.service.getAdminDigital(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
      this.admin=data;
      console.log( "Admin Connecte  ", this.admin.nom+" "+this.admin.prenom);
      this.nomPrenomAdmin = this.admin.nom+" "+this.admin.prenom; 
      if(this.admin.image ==null){
        this.imagePath="./assets/icons/user1.png"

      }
      else{
        this.imagePath="http://localhost:8281/adminDigital/getImageProfileAdminDigial/"+this.admin.id ; }});

      this.serviceAM.getAllPatientsADossierMedicaux().subscribe(data => {
        this.serviceAM.DossierData =  data;
        this.serviceAM.testDossier = this.serviceAM.DossierData.length;
      }) ; 
  }
  getAllDossiersPatients(){
    this.serviceAM.getAllPatientsADossierMedicaux().subscribe(data => {
      this.serviceAM.DossierData =  data;
      this.serviceAM.testDossier = this.serviceAM.DossierData.length;
    }) ; 
  }
    formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
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


                                          
  supprimer(id :number){   
    Swal.fire({
      title: 'Êtes-vous sûr?',
      html: "de supprimer dossier médical  :<br>" ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceAM.deleteDossier(id).subscribe(()=>{this.getAllDossiersPatients()
          console.log("ok")
        Swal.fire(
          'Supprimé !',
          'Dossier médical a été supprimé.',
          'success'
        ) 
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['operationsAM']);});
        }
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
  telechargerPDF(id: number): void {
    this.serviceAM.getDossier(id).subscribe((data: ArrayBuffer) => {
      this.telechargerFichier(data);
    });
  }

  private telechargerFichier(data: ArrayBuffer): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
 logout() {
  localStorage.clear();
  this.router.navigate(['']);
}  
}