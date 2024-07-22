import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/Modeles/patient';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-all-patient',
  templateUrl: './all-patient.component.html',
  styleUrls: ['./all-patient.component.css']
})
export class AllPatientComponent implements OnInit {
  p : number =1 ; 
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  imagePath : string="";
  patients: Patient[] = [];
  patientASupprimer : any ; 
  imageParDefaut ="./assets/icons/user1.png" ;
  PatientsFinal : any=[] ; 
   pp : any={}
  gender : any
  date_naissance : any
  public constructor(private service : AdminDigitalService , private router : Router ,
     private route : ActivatedRoute ) { }
  ngOnInit() {
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
          this.ngOnInit()
          this.service.deletePatient(id).subscribe(()=>{this.getAllPatients()
            console.log("ok")
          Swal.fire(
            'Supprimé !',
            'Patient a été supprimé.',
            'success'
          ) 
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
      });
    }
  
    formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
    } 
 /*********************** recherche dans tab medecins *****************************************/
   set texte(chaine: string) {
    this.service.PatientData = this.filtrer(chaine);}
 
  filtrer(sousChaine: string) {
    this.service.getAllPatients().subscribe(data=>{
    this.PatientsFinal=data;});     
    return this.PatientsFinal.filter(e => e.gender.toLowerCase().includes(sousChaine.toLowerCase()) || 
                                          e.nom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                          e.prenom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                          e.telephone.toString().indexOf(sousChaine) != -1 ||
                                          e.date_inscription.toString().indexOf(sousChaine) != -1 ||
                                          e.cin === parseInt(sousChaine));}
    
/***************************************************************************************************/
openModelEdit(id : number){
  /********  Open modal  *********/
  const modalDiv = document.getElementById('exampleModalCenter2');
if (modalDiv) {
  modalDiv.classList.add('show');
  modalDiv.style.display = 'block'; // Assurez-vous que le modal est affiché
  const backdropElement = document.createElement('div');
  backdropElement.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(backdropElement);
}
  /************************* Recupere medecin a modifie ***************************/
  this.service.getPatient(id).subscribe(data => {
    if (data) {
      this.pp = data;
      this.gender = this.pp.gender;
      this.date_naissance =this.formatDate(this.pp.date_naissance);
}}) ;
}
modifierrr(fEdit:NgForm){
  let cin = fEdit.value.cin ;
  let nom = fEdit.value.nom ;
  let prenom = fEdit.value.prenom ;
  let email = fEdit.value.email ;
  let gender = fEdit.value.gender; 
  let telephone = fEdit.value.telephone; 
  let value={ cin ,nom , prenom , gender , email ,telephone};
  this.service.updatepatient(this.pp.id, value ).subscribe(()=>{
  this.closeModal2() ;
  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  this.router.navigate(['patients']);});
    
  }, err=>{
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Numéro de CIN ou adresse email existe déjà   !!!!",
      showConfirmButton: true,
      timer: 10000
    });
  });
}

closeModal2() {
  const modalDiv= document.getElementById('exampleModalCenter2') ; 
  if (modalDiv) {
    modalDiv.classList.remove('show');
    modalDiv.style.display = 'none';
    const backdropElement = document.getElementsByClassName('modal-backdrop')[0];
    if (backdropElement) {
      backdropElement.parentNode.removeChild(backdropElement);
    }
  }
}
downloadPDF(): void {
  // Récupérer le logo de la clinique depuis votre service ou le stockage local
  const logoCliniqueplus = '/assets/img/logologo.png';
  const logoCliniqueMot = '/assets/img/test.png';
  // Appel à la méthode pour récupérer les départements depuis le service
  this.service.getAllPatients().subscribe(patients => {
    // Vérifier si departements est bien un tableau
    if (Array.isArray(patients)) {
      // Créer un nouveau document PDF
      import('jspdf').then((jsPDF) => {
        const doc = new jsPDF.default(); // Utilisez .default pour accéder à l'objet jsPDF

        // Ajouter le logo de la clinique
        const logoWidth = 20;
        const logoHeight = 20;
        doc.addImage(logoCliniqueplus, 'PNG', 5 + 10 + 5, 5, undefined, undefined);
        doc.addImage(logoCliniqueMot, 'PNG', 5 + logoWidth + 5, 5, undefined, undefined);
        doc.setFontSize(24); 
        doc.setTextColor(0, 0, 0); 
        doc.setFont('helvetica', 'bold'); 
        doc.text('\nListe des patients de clinique NAR \n', 25, 25); 
        // Définir les colonnes du tableau
        const headers = [['ID', 'Nom', 'Prénom' , 'Genre' , 'Télephone'  ,'Date d\'inscrit' ]];
        let id = 1; // Variable de compteur pour les numéros de département
        // Convertir chaque département en tableau de lignes de données
        const data = patients.map((patient: any) => [id++ ,patient.nom,patient.prenom,patient.gender,patient.telephone,this.formatDate(patient.date_inscription)]);

        // Dessiner le tableau dans le PDF
        (doc as any).autoTable({
          startY: 40,
          head: headers,
          body: data,
        });

        // Télécharger le PDF avec un nom de fichier spécifié
        doc.save('Liste des patients de clinique NAR.pdf');
      }).catch((error) => {
        console.error('Erreur lors du chargement de jspdf :', error);
      });
    } else {
      console.error('Les données récupérées ne sont pas un tableau.');
    }
  });
}
logout() {
  localStorage.clear();
  this.router.navigate(['']);
}
}