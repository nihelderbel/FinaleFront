import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medecin } from 'src/app/Modeles/medecin';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-all-secretaire',
  templateUrl: './all-secretaire.component.html',
  styleUrls: ['./all-secretaire.component.css']
})
export class AllSecretaireComponent implements OnInit {
  p: number=1 ; 
  nom :any ; prenom : any;email : any ; cin : any ; telephone : any ; 
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  imagePath : string="";
  medecins: Medecin[] = [];
  secretaireASupprimer : any ; 
  imageParDefaut ="./assets/icons/user1.png" ;
  SecretairesFinal :any = [];
  testImage : any ; 
  user: any = {};
  gender : any ;
  emailValuePairs: { [email: string]: string } = {};
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

      this.service.getAllSecretaires().subscribe(data => {
        this.service.SecretairesData =  data;
        this.service.testTabSecretaires = this.service.SecretairesData.length;
        console.log("les mdecins sont :"+this.service.SecretairesData) ; 
      }) ; 
     
  }
  getAllSecretaires(){
    this.service.getAllSecretaires().subscribe(data=>{
    setTimeout(()=>{ }, 4000);
    this.service.SecretairesData=data;})
    }
    supprimer(id :number){
      this.service.getSecretaire(id).subscribe(data=>{
        this.secretaireASupprimer = data
           
      Swal.fire({
        title: 'Êtes-vous sûr?',
        html: "de supprimer Ce Médecin  : <br>" +this.secretaireASupprimer.prenom+" "+ this.secretaireASupprimer.nom,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteSecretaire(id).subscribe(()=>{this.getAllSecretaires()
            console.log("ok")
          Swal.fire(
            'Supprimé !',
            'Secrétaire médicala été supprimé.',
            'success'
          )
          this.ngOnInit() }
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
 openModal(){
  const modalDiv= document.getElementById('exampleModalCenter') ; 
  if(modalDiv !== null){
    modalDiv.style.display="block" ;
  }
 }   
  /*********************** recherche dans tab secretaires *****************************************/
  /*********************** recherche dans tab medecins *****************************************/
  set texte(chaine: string) {
    this.service.SecretairesData = this.filtrer(chaine);}
 
  filtrer(sousChaine: string) {
    this.service.getAllSecretaires().subscribe(data=>{
    this.SecretairesFinal=data;});     
    return this.SecretairesFinal.filter(e => e.gender.toLowerCase().includes(sousChaine.toLowerCase()) || 
                                          e.nom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                          e.prenom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                         // e.telephone.toString().indexOf(sousChaine) != -1 ||
                                          e.date_inscription.toString().indexOf(sousChaine) != -1 ||
                                          e.cin === parseInt(sousChaine));}
    
/***************************************************************************************************/
sauvegarderrr(fAdd:NgForm){
  let cin = fAdd.value.cin ;
  let nom = fAdd.value.name ;
  let prenom = fAdd.value.namee ;
  let email = fAdd.value.email ;
  let gender = fAdd.value.gender; 
  let telephone = fAdd.value.telephone; 
  let value={nom , prenom , gender , email  , cin , telephone};
  this.service.addAdminMedicalParAdminDigital(value ,parseInt(localStorage.getItem('idAdmin'))).subscribe(()=>{
    this.service.sendEmailToSecretaire(email).subscribe(
      (response: any) => {
        console.log('Email envoyé avec succès !');
      },
      (error: any) => {
        console.error("Erreur lors de l'envoi de l'email :", error);
      }
    );
  this.ngOnInit();
  this.closeModal() ; 
  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  this.router.navigate(['secretaires']);
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
closeModal() {
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

modifierrr(f:NgForm){
  let id= f.value.id ; 
  let cin = f.value.cin ;
  let nom = f.value.nom ;
  let prenom = f.value.prenom ;
  let email = f.value.email ;
  let gender = f.value.gender; 
  let telephone = f.value.telephone; 
  let value={nom , prenom , gender , email  , cin , telephone};
  this.service.updateAdminMedical(this.user.id, value ).subscribe(()=>{
  console.log("hiiiiiiiiiiiiiiiiiiii",f.value)
  localStorage.removeItem('idAdminMedicalAModifier') ; 
  this.closeModal2() ;
  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  this.router.navigate(['secretaires']);});
    
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
  /************************* Recupere secretaire a modifie ***************************/
  this.service.getSecretaire(id).subscribe(data => {
    if (data) {
      this.user = data;
      localStorage.setItem("idAdminMedicalAModifier:", this.user.id);
      this.gender = this.user.gender;
                   
}}) ;
}
downloadPDF(): void {
  // Récupérer le logo de la clinique depuis votre service ou le stockage local
  const logoCliniqueplus = '/assets/img/logologo.png';
  const logoCliniqueMot = '/assets/img/test.png';
  // Appel à la méthode pour récupérer les départements depuis le service
  this.service.getAllSecretaires().subscribe(secretaire => {
    // Vérifier si departements est bien un tableau
    if (Array.isArray(secretaire)) {
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
        doc.text('\nListe des secrétaires médicales de clinique NAR \n', 10, 25); 
        // Définir les colonnes du tableau
        const headers = [['ID','CIN', 'Nom', 'Prénom','Genre','Télephone','Email','Date d\'inscrit']];
        let id = 1; // Variable de compteur pour les numéros de département
        // Convertir chaque département en tableau de lignes de données
        const data = secretaire.map((secretaire: any) => [id++ ,secretaire.cin,secretaire.nom,secretaire.prenom ,secretaire.gender ,secretaire.telephone, secretaire.email , this.formatDate(secretaire.date_inscription)]);

        // Dessiner le tableau dans le PDF
        (doc as any).autoTable({
          startY: 40,
          head: headers,
          body: data,
        });

        // Télécharger le PDF avec un nom de fichier spécifié
        doc.save('Liste des secrétaires médicales de clinique NAR.pdf');
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
