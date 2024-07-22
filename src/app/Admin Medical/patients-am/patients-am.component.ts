import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/Modeles/patient';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { AdminMedicalService } from 'src/app/Services/Admin Medical/admin-medical.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery'; // Importez jQuery
import { PatientService } from 'src/app/Services/Patients/patient.service';

@Component({
  selector: 'app-patients-am',
  templateUrl: './patients-am.component.html',
  styleUrls: ['./patients-am.component.css']
})
export class PatientsAMComponent implements OnInit {
  rapportUploaded : number ; 
  p : number =1 ; 
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  imagePath : string="";
  patients: Patient[] = [];
  patientASupprimer : any ; 
  imageParDefaut ="./assets/icons/user1.png" ;
  PatientsFinal : any=[] ; 
  pp : any={} ;
  gender : any ;
  date_naissance : string ;
  antecedants : any 
  antecedantss : any 
  patient : any ; 
  selectedAntecedents : any[]
  result : any ; 
  image : any ; 
  testImage : any ; 
  idUser : number ; 
  testSelectedFile : boolean=false ;
  fileSelected : any ; 
  validate : string = null ; 
  selectedFile: File = null;
  selectedFileName: string = null;
  modifiable: string = null;
  uploadPDFData: any 
  uploadPDFData2: any 
  public constructor(private service : AdminMedicalService ,private serviceAD : AdminDigitalService, private router : Router ,
     private route : ActivatedRoute  , private servicePatient : PatientService) { }
  ngOnInit() {
  
    this.service.getAdminMedical(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
    this.admin=data;
    console.log( "Admin Connecte  ", this.admin.nom+" "+this.admin.prenom);
    this.nomPrenomAdmin = this.admin.nom+" "+this.admin.prenom; 
    if(this.admin.image ==null){
      this.imagePath="./assets/icons/user1.png";
      this.imageParDefaut="./assets/icons/user1.png" ;
    }
    else{
      this.imagePath="http://localhost:8281/adminMedical/getImageProfileAdminMedical/"+this.admin.id ; }});

      this.serviceAD.getAllPatients().subscribe(data => {
        this.serviceAD.PatientData =  data;
        this.serviceAD.testTabPatients = this.serviceAD.PatientData.length;
      }) ; 
  }
  getAllPatients(){
    this.serviceAD.getAllPatients().subscribe(data=>{
    setTimeout(()=>{ }, 4000);
    this.serviceAD.PatientData=data;})
    }
    supprimer(id :number){
      this.serviceAD.getPatient(id).subscribe(data=>{
        this.patientASupprimer = data
           
      Swal.fire({
        title: 'Êtes-vous sûr?',
        html: "de supprimer ce patient :<br>" +this.patientASupprimer.prenom+" "+ this.patientASupprimer.nom,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.serviceAD.deletePatient(id).subscribe(()=>{this.getAllPatients()
            console.log("ok")
          Swal.fire(
            'Supprimé !',
            'Patient a été supprimé.',
            'success'
          ) 
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['patientsAM']);});
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
      return date.toISOString().slice(0, 10); 
      // Format 'yyyy-mm-dd'
    } 
 /*********************** recherche dans tab patients *****************************************/
   set texte(chaine: string) {
    this.serviceAD.PatientData = this.filtrer(chaine);}
 
  filtrer(sousChaine: string) {
    this.serviceAD.getAllPatients().subscribe(data=>{
    this.PatientsFinal=data;});     
    return this.PatientsFinal.filter(e => e.gender.toLowerCase().includes(sousChaine.toLowerCase()) || 
                                          e.nom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                          e.prenom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                          e.telephone.toString().indexOf(sousChaine) != -1 ||
                                          e.date_inscription.toString().indexOf(sousChaine) != -1 ||
                                          e.cin === parseInt(sousChaine));}
    
/***************************************************************************************************/
registre(fAdd: NgForm){
  const dateNaissanceInput = document.getElementById('date_naissance') as HTMLInputElement;
  dateNaissanceInput.addEventListener('change', function(event) {
      const dateNaissanceSelectionnee = dateNaissanceInput.value;
      console.log(dateNaissanceSelectionnee); });
let nom = fAdd.value.name 
let prenom = fAdd.value.namee 
let cin = fAdd.value.cin 
let email = fAdd.value.email 
let telephone = fAdd.value.telephone 
let notes = fAdd.value.notes 
let gender = fAdd.value.gender; 
let date_naissance =fAdd.value.date_naissance; 
//let date_naissance = "2023-09-13" //new Date(date_naissanc).toISOString().split('T')[0];
let antecedantss = this.antecedants ; 
let avis = this.antecedants ; 
let antecedants = this.result
let value ={ cin , nom , prenom  ,gender ,email , telephone, date_naissance , notes , avis}
if(this.selectedFile !== null){
  this.uploadPDFData = new FormData();
  this.uploadPDFData.append('file', this.selectedFile);
  this.service.uploadDossierMedical(parseInt(localStorage.getItem("idAdmin")),this.uploadPDFData).subscribe(data =>{
  this.rapportUploaded = data ; 
  console.log("Id Dosssssier "+ this.rapportUploaded) });
  this.servicePatient.addPatientParAdminSansImageAvecDossier(parseInt(localStorage.getItem('idAdmin')),this.rapportUploaded , value).subscribe(data2=>{
    this.patient = data2;
    this.service.sendEmailToPatient(email).subscribe(
      (response: any) => {
        console.log('Email envoyé avec succès !');
      },
      (error: any) => {
        console.error("Erreur lors de l'envoi de l'email :", error);
      }
    );
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['patientsAM']);});
      this.getAllPatients();
      this.selectedFile = null ; 
      this.closeModalAdd()
      
    } ,err=>{
      Swal.fire({
        icon:"error",
        title: 'Patient existe déjà !!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'}})
         }
    );
    }
    if(this.selectedFile === null){
this.servicePatient.addPatientParAdminSansImage(parseInt(localStorage.getItem('idAdmin')), value).subscribe(data=>{
this.patient = data;
this.service.sendEmailToPatient(email).subscribe(
  (response: any) => {
    console.log('Email envoyé avec succès !');
  },
  (error: any) => {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
);
this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
this.router.navigate(['patientsAM']);});
this.getAllPatients();
this.selectedFile =null ; 
this.closeModalAdd();
}
  ,err=>{
     Swal.fire({
       icon:"error",
       title: 'Patient existe déjà !!',
       showClass: {
         popup: 'animate__animated animate__fadeInDown'
       },
       hideClass: {
         popup: 'animate__animated animate__fadeOutUp'}})});
        }
}
        
closeModal2() {
  this.selectedFile =null ; 
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


modifierrr(fEdit:NgForm){
  let cin = fEdit.value.cin ;
  let nom = fEdit.value.nom ;
  let prenom = fEdit.value.prenom ;
  let email = fEdit.value.email ;
  let gender = fEdit.value.gender; 
  let telephone = fEdit.value.telephone; 
  let date_naissance =fEdit.value.date_naissance; 
  console.log("dateeeeeeee" , date_naissance )
  let value={ cin ,nom , prenom , gender , email ,telephone , date_naissance};
  this.serviceAD.updatepatient(this.pp.id, value ).subscribe(()=>{
    if(this.selectedFile !== null){
      this.uploadPDFData2 = new FormData();
      this.uploadPDFData2.append('file', this.selectedFile);
      this.service.modifierDossierMedical(this.pp.dossierMedical.idDossierMedical ,this.uploadPDFData2 ).subscribe(()=>{
        this.selectedFile =null ; 

      }) ; 
    }
  this.closeModal2() ;
  this.selectedFile =null ; 
  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  this.router.navigate(['patientsAM']);});
    
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
  this.serviceAD.getPatient(id).subscribe(data => {
    if (data) {
      this.pp = data;
      this.gender = this.pp.gender;
      this.date_naissance =this.formatDate(this.pp.date_naissance);
}}) ;
}
openModelADD(){
  /********  Open modal  *********/
  const modalDiv = document.getElementById('exampleModalCenter');
if (modalDiv) {
  modalDiv.classList.add('show');
  modalDiv.style.display = 'block'; // Assurez-vous que le modal est affiché
  const backdropElement = document.createElement('div');
  backdropElement.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(backdropElement);
} 
}

closeModalAdd() {
  this.selectedFile =null ; 
  const modalDiv= document.getElementById('exampleModalCenter') ; 
  if (modalDiv) {
    modalDiv.classList.remove('show');
    modalDiv.style.display = 'none';
    const backdropElement = document.getElementsByClassName('modal-backdrop')[0];
    if (backdropElement) {
      backdropElement.parentNode.removeChild(backdropElement);
    }
  }
  this.selectedFile =null ; 
}
logout() {
  localStorage.clear();
  this.router.navigate(['']);
}
formatDate22(date: Date): string {
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;

}
downloadPDF(): void {
  // Récupérer le logo de la clinique depuis votre service ou le stockage local
  const logoCliniqueplus = '/assets/img/logologo.png';
  const logoCliniqueMot = '/assets/img/test.png';
  // Appel à la méthode pour récupérer les départements depuis le service
  this.serviceAD.getAllPatients().subscribe(patients => {
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
todayDate(): string {
  return new Date().toISOString().split('T')[0];
}
onSelectFile(event ) {
  this.selectedFile = event.target.files[0];
  this.selectedFileName = this.selectedFile ? this.selectedFile.name : null;}

onUpload() {
  if (this.selectedFile) {
    // Créez un objet FormData
    const formData = new FormData();
    // Ajoutez le fichier sélectionné à l'objet FormData
    formData.append('pdfFile', this.selectedFile, this.selectedFile.name);
    // Vous pouvez maintenant envoyer formData à votre serveur via une requête HTTP
    // Par exemple :
    // this.http.post('url_du_serveur', formData).subscribe(response => {
    //   console.log('Fichier téléchargé avec succès', response);
    // });
  } else {
    console.log('Veuillez sélectionner un fichier PDF.');
  }
}
}
