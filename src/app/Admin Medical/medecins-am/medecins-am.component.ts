import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medecin } from 'src/app/Modeles/medecin';
import { Specialite } from 'src/app/Modeles/specialite';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { AdminMedicalService } from 'src/app/Services/Admin Medical/admin-medical.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medecins-am',
  templateUrl: './medecins-am.component.html',
  styleUrls: ['./medecins-am.component.css']
})
export class MedecinsAMComponent implements OnInit {
  specialiteSelectionner : any ; 
  specialites: any={} ;  // Tableau pour stocker les spécialités disponibles
  selectedSpecialite: string; // Variable pour stocker la spécialité sélectionnée
  gender : any ; 
  user : any ={} ; 
  p : number =1 ; 
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  imagePath : string="";
  medecins: Medecin[] = [];
  medecinASupprimer : any ; 
  imageParDefaut ="./assets/icons/user1.png" ;
  MedecinsFinal : any =[] ; 
  patientToDaycount:number = 0;

  public constructor(private service : AdminMedicalService , private serviceAD:AdminDigitalService ,private router : Router ,
     private route : ActivatedRoute ) { }
  ngOnInit() {
    this.imageParDefaut ="./assets/icons/user1.png" ;
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

      this.serviceAD.getAllMedecins().subscribe(data => {
        this.serviceAD.MedecinData = data;
        this.serviceAD.testTabMedecins = this.serviceAD.MedecinData.length;
      }) ; 
      this.serviceAD.getAllDepartement().subscribe(data => {
        this.specialites = data;
      });
  }
   getAllMedecins(){
    this.serviceAD.getAllMedecins().subscribe(data=>{
    setTimeout(()=>{ }, 4000);
    this.serviceAD.MedecinData=data;})
    }
    supprimer(id :number){
      this.serviceAD.getMedecin(id).subscribe(data=>{
        this.medecinASupprimer = data
           
      Swal.fire({
        title: 'Êtes-vous sûr?',
        html: "de supprimer Ce Médecin  : <br>" +this.medecinASupprimer.prenom+" "+ this.medecinASupprimer.nom,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.serviceAD.deleteMedecin(id).subscribe(()=>{this.getAllMedecins()
            console.log("ok")
          Swal.fire(
            'Supprimé !',
            'Médecin a été supprimé.',
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
      });
    }
  
    formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
    }  
   /*********************** recherche dans tab medecins *****************************************/
   set texte(chaine: string) {
    this.serviceAD.MedecinData = this.filtrer(chaine);}
 
  filtrer(sousChaine: string) {
    this.serviceAD.getAllMedecins().subscribe(data=>{
    this.MedecinsFinal=data;});     
    return this.MedecinsFinal.filter(e => e.gender.toLowerCase().includes(sousChaine.toLowerCase()) || 
                                          e.nom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                          e.specialite.nom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                          e.prenom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                          e.telephone.toString().indexOf(sousChaine) != -1 ||
                                          e.date_inscription.toString().indexOf(sousChaine) != -1 ||
                                          e.cin === parseInt(sousChaine));}
    
/***************************************************************************************************/
sauvegarderrr(fAdd:NgForm){
  this.service.getSpecialite(this.selectedSpecialite).subscribe(data=>{
  this.specialiteSelectionner = data ; 
 
  let cin = fAdd.value.cin ;
  let nom = fAdd.value.name ;
  let prenom = fAdd.value.namee ;
  let email = fAdd.value.email ;
  let gender = fAdd.value.gender; 
  let telephone = fAdd.value.telephone; 
  let specialite =  this.specialiteSelectionner
  console.log("Specialiteee"+this.specialiteSelectionner.id)
  let value={specialite ,cin ,nom , prenom , gender , email ,telephone};
 this.service.addMedecinParAdminMedical(value ,parseInt(localStorage.getItem('idAdmin')),this.specialiteSelectionner.id).subscribe(()=>{
    this.service.sendEmailToMedecin(email).subscribe(
      (response: any) => {
        console.log('Email envoyé avec succès !');
      },
      (error: any) => {
        console.error("Erreur lors de l'envoi de l'email :", error);
      }
    );
  this.ngOnInit();
  this.closeModalAdd() ; 
  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  this.router.navigate(['medecinsAM']);
});
});
    
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

modifierrr(fEdit:NgForm){
  this.service.getSpecialite(this.selectedSpecialite).subscribe(data=>{
  this.specialiteSelectionner = data ; 

  let cin = fEdit.value.cin ;
  let nom = fEdit.value.nom ;
  let prenom = fEdit.value.prenom ;
  let email = fEdit.value.email ;
  let gender = fEdit.value.gender; 
  let telephone = fEdit.value.telephone; 
  let specialite =  this.specialiteSelectionner
  console.log("Specialiteee"+this.specialiteSelectionner.id)
  let value={specialite ,cin ,nom , prenom , gender , email ,telephone};

  this.serviceAD.updateMedecin(this.user.id, value ).subscribe(()=>{
  console.log("hiiiiiiiiiiiiiiiiiiii",fEdit.value)
  this.closeModal2() ;
  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  this.router.navigate(['medecinsAM']);});
    
  }, err=>{
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Numéro de CIN ou adresse email existe déjà   !!!!",
      showConfirmButton: true,
      timer: 10000
    });
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
  this.serviceAD.getMedecin(id).subscribe(data => {
    if (data) {
      this.user = data;
      this.gender = this.user.gender;
      this.selectedSpecialite = this.user.specialite.nom; // Sélectionnez la spécialité du médecin
      
                   
}}) ;
}
// Méthode appelée lors de la sélection d'une spécialité dans le menu déroulant
onSelectSpecialite(specialite: Specialite): void {
  this.selectedSpecialite = specialite.nom;
  // Mettez à jour la spécialité du médecin dans la base de données ou effectuez d'autres actions nécessaires
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
  const modalDiv= document.getElementById('exampleModalCenter') ; 
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
  this.serviceAD.getAllMedecins().subscribe(medecins => {
    // Vérifier si departements est bien un tableau
    if (Array.isArray(medecins)) {
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
        doc.text('\nListe des medecins de clinique NAR \n', 25, 25); 
        // Définir les colonnes du tableau
        const headers = [['ID', 'Nom', 'Prénom' , 'Genre' , 'Télephone' , 'Specialité' ,'Date d\'inscrit' ]];
        let id = 1; // Variable de compteur pour les numéros de département
        // Convertir chaque département en tableau de lignes de données
        const data = medecins.map((medecin: any) => [id++ ,medecin.nom,medecin.prenom,medecin.gender,medecin.telephone,medecin.specialite.nom,this.formatDate(medecin.date_inscription)]);

        // Dessiner le tableau dans le PDF
        (doc as any).autoTable({
          startY: 40,
          head: headers,
          body: data,
        });

        // Télécharger le PDF avec un nom de fichier spécifié
        doc.save('Liste des medecins de clinique NAR.pdf');
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