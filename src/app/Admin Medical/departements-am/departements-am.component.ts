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
import { HttpClient } from '@angular/common/http';
import { AdminMedicalService } from 'src/app/Services/Admin Medical/admin-medical.service';
@Component({
  selector: 'app-departements-am',
  templateUrl: './departements-am.component.html',
  styleUrls: ['./departements-am.component.css']
})
export class DepartementsAMComponent implements OnInit {
   medecinsParDepartement = [];
  nbr : any ; 
  departement : any={} ; 
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

  public constructor(private service :AdminMedicalService ,private serviceAD :AdminDigitalService ,private serviceDepartement:DepartementService, 
    private router:Router ,private route :ActivatedRoute,private modalService: ModalService ,private http: HttpClient) { }
  ngOnInit() {
    this.getNombreMedecinsParDepartement()
    this.service.getAdminMedical(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
    this.admin=data;
    console.log( "Admin Connecte  ", this.admin.nom+" "+this.admin.prenom);
    this.nomPrenomAdmin = this.admin.nom+" "+this.admin.prenom; 
    if(this.admin.image ==null){
      this.imagePath="./assets/icons/user1.png"
    }
    else{
      this.imagePath="http://localhost:8281/adminMedical/getImageProfileAdminMedical/"+this.admin.id ; }});

    this.serviceDepartement.getAllDepartements().subscribe(data => {
    this.serviceAD.DepartementData = data;
    this.serviceAD.testTabDepartement = data.length;
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
    this.serviceAD.getAllDepartement().subscribe(data=>{
    setTimeout(()=>{ }, 4000);
    this.serviceAD.DepartementData=data;})
    }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
  } 

  /*********************** recherche par nom departements *****************************************/
  set texte(chaine: string) {
    this.serviceAD.DepartementData = this.filtrer(chaine);}
 
  filtrer(sousChaine: string) {
    this.serviceAD.getAllDepartement().subscribe(data=>{
    this.DepartementsFinal=data;});     
    return this.DepartementsFinal.filter(e => e.nom.toLowerCase().includes(sousChaine.toLowerCase()) ||
                                                e.date_creation.toString().indexOf(sousChaine) != -1 )}

/***************************************************************************************************/
downloadPDF(): void {
  // Récupérer le logo de la clinique depuis votre service ou le stockage local
  const logoCliniqueplus = '/assets/img/logologo.png';
  const logoCliniqueMot = '/assets/img/test.png';
  // Appel à la méthode pour récupérer les départements depuis le service
  this.serviceAD.getAllDepartement().subscribe(departements => {
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
  getNombreMedecinsParDepartement(){
    this.serviceAD.getAllDepartement().subscribe(data=>{
      setTimeout(()=>{ }, 4000);
      this.serviceAD.DepartementData=data;
   // Vérifier si data est un objet itérable
   if (data && typeof data === 'object') {
    // Boucler sur chaque propriété de l'objet data
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        // Accéder à chaque département
        const departement = data[key];
        console.log('Nom du département :', departement.nom);
        console.log('Date de création :', departement.date_creation);
        this.service.getNbrMedecinParDepartement(departement.nom).subscribe(data=>{
          this.nbr =data ;
          this.service.getNbrMedecinParDepartement(departement.nom).subscribe(nbr => {
            // Ajouter le résultat au tableau
            this.medecinsParDepartement.push({ nomDepartement: departement.nom, nombreMedecins: nbr });
          });        console.log("nbrrrrr1 "+ this.medecinsParDepartement)})
      }
    }
  }
  });
}
logout() {
  localStorage.clear();
  this.router.navigate(['']);

}
}  