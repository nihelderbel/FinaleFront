import { HttpClient } from '@angular/common/http';
import { Component, ElementRef , ViewChild  , OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialite } from 'src/app/Modeles/specialite';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { DepartementService } from 'src/app/Services/Departement/departement.service';
import { ModalService } from 'src/app/Services/Modal/modal.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AdminMedicalService } from 'src/app/Services/Admin Medical/admin-medical.service';
@Component({
  selector: 'app-all-departement',
  templateUrl: './all-departement.component.html',
  styleUrls: ['./all-departement.component.css']
})
export class AllDepartementComponent implements OnInit {
  departement : any={} ; 
  medecinsParDepartement = [];
  nbr : any ; 
  nomDepartement : string ;
  p : number =1 ; 
  currentPage: number;
  totalPages: number;
  pages: number[] = [];  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  imagePath : string="";
  specialites: Specialite[] = [];
  pageSize = 10;
  departementASupprimer : any
  allDepartements :any = [];
  DepartementsFinal:any = [];
  resultt : any

  public constructor(private serviceAM :AdminMedicalService , private service :AdminDigitalService ,private serviceDepartement:DepartementService, 
    private router:Router ,private route :ActivatedRoute,private modalService: ModalService ,private http: HttpClient) { }
  ngOnInit() {
    this.getNombreMedecinsParDepartement()
    this.service.getAdminDigital(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
    this.admin=data;
    console.log( "Admin Connecte  ", this.admin.nom+" "+this.admin.prenom);
    this.nomPrenomAdmin = this.admin.nom+" "+this.admin.prenom; 
    if(this.admin.image ==null){
      this.imagePath="./assets/icons/user1.png"
    }
    else{
      this.imagePath="http://localhost:8281/adminDigital/getImageProfileAdminDigial/"+this.admin.id ; }});

    this.serviceDepartement.getAllDepartements().subscribe(data => {
    this.service.DepartementData = data;
    this.service.testTabDepartement = data.length;
});
//this.getAllDepartement();
this.route.paramMap.subscribe(params => {
  // Extraire le numéro de page de l'URL
  this.currentPage = parseInt(params.get('page'),10) || 1;
  
  // Charger les données pour la page actuelle
  //this.loadData();
  this.getAllDepartement();
});
  }
  getAllDepartement(){
    this.service.getAllDepartement().subscribe(data=>{
    setTimeout(()=>{ }, 4000);
    this.service.DepartementData=data;})
    }
  supprimer(id :number){
    this.service.getDepartement(id).subscribe(data=>{
      this.departementASupprimer = data
         
    Swal.fire({
      title: 'Êtes-vous sûr?',
      html: "de supprimer Ce Département  : <br>" +this.departementASupprimer.nom,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteDepartement(id).subscribe(()=>{this.getAllDepartement()
          console.log("ok")
        Swal.fire(
          'Supprimé !',
          'Département a été supprimé.',
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

  /*********************** recherche par nom departements *****************************************/
  set texte(chaine: string) {
    this.service.DepartementData = this.filtrer(chaine);}
 
  filtrer(sousChaine: string) {
    this.service.getAllDepartement().subscribe(data=>{
    this.DepartementsFinal=data;});     
    return this.DepartementsFinal.filter(e => e.nom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                                e.date_creation.toString().indexOf(sousChaine) != -1 )}

/***************************************************************************************************/
sauvegarder(f:NgForm){
  let nom = f.value.name ; 
  let value={nom};
  this.service.addDepartement(value).subscribe(()=>{
  console.log("hiiiiiiiiiiiiiiiiiiii",f.value.nom)
  this.closeModal() ;
  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  this.router.navigate(['allDepartements']);});
    
  }, err=>{
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Ce Département déjà existe   !!!!",
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
modifierrr(formEdit:NgForm){
  let nom = formEdit.value.nom ;
  let value={nom};
  this.service.updateDepartement(this.departement.id, value ).subscribe(()=>{
  console.log("hiiiiiiiiiiiiiiiiiiii",formEdit.value)
  this.closeModal2() ;
  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  this.router.navigate(['allDepartements']);});
    
 }, err=>{
    Swal.fire({
    position: "center",
    icon: "warning",
     title: "Ce Département déjà existe",
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
  this.service.getDepartement(id).subscribe(data => {
    if (data) {
      this.departement =data;
      this.nomDepartement = this.departement.nom ; 
      console.log("id Departement : "+this.departement.id)
      console.log("nom Departement : "+this.departement.nom)
 
                   
}}) ;
}
openModelAddVide(){
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
downloadPDF(): void {
  // Récupérer le logo de la clinique depuis votre service ou le stockage local
  const logoCliniqueplus = '/assets/img/logologo.png';
  const logoCliniqueMot = '/assets/img/test.png';
  // Appel à la méthode pour récupérer les départements depuis le service
  this.service.getAllDepartement().subscribe(departements => {
    // Vérifier si departements est bien un tableau
    if (Array.isArray(departements)) {
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
        doc.text('\nListe des départements de clinique NAR \n', 25, 25); 
        // Définir les colonnes du tableau
        const headers = [['ID', 'Nom département', 'Date de création']];
        let id = 1; // Variable de compteur pour les numéros de département
        // Convertir chaque département en tableau de lignes de données
        const data = departements.map((departement: any) => [id++ ,departement.nom,this.formatDate(departement.date_creation)]);

        // Dessiner le tableau dans le PDF
        (doc as any).autoTable({
          startY: 40,
          head: headers,
          body: data,
        });

        // Télécharger le PDF avec un nom de fichier spécifié
        doc.save('Liste des départements de la clinique NAR.pdf');
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
getNombreMedecinsParDepartement(){
  this.service.getAllDepartement().subscribe(data=>{
    setTimeout(()=>{ }, 4000);
    this.service.DepartementData=data;
 // Vérifier si data est un objet itérable
 if (data && typeof data === 'object') {
  // Boucler sur chaque propriété de l'objet data
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      // Accéder à chaque département
      const departement = data[key];
      console.log('Nom du département :', departement.nom);
      console.log('Date de création :', departement.date_creation);
      this.serviceAM.getNbrMedecinParDepartement(departement.nom).subscribe(data=>{
        this.nbr =data ;
        this.serviceAM.getNbrMedecinParDepartement(departement.nom).subscribe(nbr => {
          // Ajouter le résultat au tableau
          this.medecinsParDepartement.push({ nomDepartement: departement.nom, nombreMedecins: nbr });
        });        console.log("nbrrrrr1 "+ this.medecinsParDepartement)})
    }
  }
}
});
}
}  