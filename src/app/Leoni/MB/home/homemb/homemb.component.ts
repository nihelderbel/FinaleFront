import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Pcda } from 'src/app/Leoni/Modeles/pcda';
import { PcdaService } from 'src/app/Leoni/Services/PCDA/pcda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homemb',
  templateUrl: './homemb.component.html',
  styleUrls: ['./homemb.component.css']
})
export class HomembComponent implements OnInit {
  imageParDefaut  :string="./assets/icons/user1.png"
  imagePath : string="";
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  user : any ={} ;
  pcda:Pcda[]=[];
  pcdaSupprimer:any;
  constructor(private router:Router,private pcdaService:PcdaService) { }

  ngOnInit() {
    this.refreshList() ; 
   
  }
  set texte(a:string){
    this.pcda=this.filtrer(a);
  }
  filtrer(a: string) {
    return this.pcda.filter(x=>x.titre.indexOf(a)!= -1);
  }
  refreshList():void{
    this.pcdaService.getPcda().subscribe(data =>{
      setTimeout(()=>{ }, 4000);
      this.pcda=data;
    
    } );
     }
     formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
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
      
      this.pcdaService.getPcdaById(id).subscribe(data => {
        if (data) {
          this.user = data;
          
          
                       
    }}) ;

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
  
    sauvegarderrr(fAdd: NgForm): void {
      let designation= fAdd.value.designation;
      let titre = fAdd.value.titre;
      let sujet_de_publication = fAdd.value.sujet_de_publication;
      let processus = fAdd.value.processus;
      let priorite = fAdd.value.priorite;
      let action = fAdd.value.action;
      let o_N = fAdd.value.o_N; // Ensure this matches the form name
      let delaideaction = fAdd.value.delaideaction;
      let responsable = fAdd.value.responsable;
      let delai = fAdd.value.delai;
      let statut = fAdd.value.statut;
      let commentaire = fAdd.value.commentaire;
    
      let value = { designation, titre, sujet_de_publication, processus, priorite, action, o_N, delaideaction, responsable, delai, statut, commentaire };
     
      this.pcdaService.updatePcda(this.user.id, value ).subscribe(()=>{
        console.log("hiiiiiiiiiiiiiiiiiiii",fAdd.value)
        this.closeModalAdd() ;
       this.refreshList();
          
        }, err=>{
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "designation existe déjà   !!!!",
            showConfirmButton: true,
            timer: 10000
          });
        });
   
    
      
    }
    
    downloadPDF():void{
      // Récupérer le logo de la clinique depuis votre service ou le stockage local
const logoplus = '/assets/img/leoni.png';
// Appel à la méthode pour récupérer les départements depuis le service
this.pcdaService.getPcda().subscribe(pcda => {
  // Vérifier si departements est bien un tableau
  if (Array.isArray(pcda)) {
    // Créer un nouveau document PDF
    import('jspdf').then((jsPDF) => {
      const doc = new jsPDF.default(); // Utilisez .default pour accéder à l'objet jsPDF

      // Ajouter le logo de la clinique dans le titre
      const logoWidth = 20;
      const logoHeight = 20;
      doc.addImage(logoplus, 'PNG', 10, 10, logoWidth, logoHeight); // Positionner le logo à côté du texte

      doc.setFontSize(18); // Taille réduite pour le titre
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text('Liste des PDCA', 35, 20); // Déplacer le texte à droite du logo

      // Définir les colonnes du tableau avec des largeurs adaptées
      const headers = [['N°', 'Désignation', 'Titre', 'Sujet', 'Processus', 'Priorité', 'Actions', 'O/N', 'Délai Action', 'Responsable', 'Délai', 'Statut', 'Commentaire']];

      let idl = 1; // Variable de compteur pour les numéros
      // Convertir chaque département en tableau de lignes de données
      const data = pcda.map((task: any) => [
        idl++, 
        task.designation,
        task.Titre,
        task.Sujet_de_la_publication,
        task.Processus,
        task.Priorite,
        task.Action,
        task.O_N,
        task.Delaideaction,
        task.Responsable,
        task.Delai,
        task.Statut,
        task.commentaire
      ]);

      // Dessiner le tableau dans le PDF avec autoTable et des colonnes de largeur ajustée
      (doc as any).autoTable({
        startY: 30,
        head: headers,
        body: data,
        styles: {
          fontSize: 10, // Taille de police réduite pour plus de contenu
          cellPadding: 3, // Espacement réduit pour compacter les colonnes
        },
        columnStyles: {
          0: {cellWidth: 10}, // N°
          1: {cellWidth: 30}, // Désignation
          2: {cellWidth: 30}, // Titre
          3: {cellWidth: 40}, // Sujet
          4: {cellWidth: 20}, // Processus
          5: {cellWidth: 20}, // Priorité
          6: {cellWidth: 40}, // Actions
          7: {cellWidth: 10}, // O/N
          8: {cellWidth: 30}, // Délai Action
          9: {cellWidth: 30}, // Responsable
          10: {cellWidth: 20}, // Délai
          11: {cellWidth: 20}, // Statut
          12: {cellWidth: 40}, // Commentaire
        },
        theme: 'grid', // Ajout d'un thème "grid" pour les lignes de séparation
        didDrawPage: function (data: any) {
          doc.setFontSize(12);
        }
      });

      // Télécharger le PDF avec un nom de fichier spécifié
      doc.save('Liste_des_PDCA.pdf');
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
         this.router.navigateByUrl('');
       }
      }
