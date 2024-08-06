import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Pcda } from 'src/app/Leoni/Modeles/pcda';
import { PcdaService } from 'src/app/Leoni/Services/PCDA/pcda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-pcda',
  templateUrl: './view-pcda.component.html',
  styleUrls: ['./view-pcda.component.css']
})
export class ViewPcdaComponent implements OnInit {
  imageParDefaut  :string="./assets/icons/user1.png"
  imagePath : string="";
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  pcda:Pcda[]=[];
  pcdaSupprimer: any;
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
    sauvegarderrr(fAdd: NgForm): void {
      let designation = fAdd.value.designation;
      let titre = fAdd.value.titre;
      let sujet_de_publication = fAdd.value.sujet_de_publication;
      let processus = fAdd.value.processus;
      let priorite = fAdd.value.priorite;
      let action = fAdd.value.action;
      let O_N = fAdd.value.O_N; // Ensure this matches the form name
      let delaideaction = fAdd.value.delaideaction;
      let responsable = fAdd.value.responsable;
      let delai= fAdd.value.delai;
      let statut = fAdd.value.statut;
      let commentaire = fAdd.value.commentaire;
    
      let value = { designation, titre, sujet_de_publication, processus, priorite, action, O_N, delaideaction, responsable, delai, statut, commentaire };
    
      console.log(value); // Log the value for debugging
    
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "de rajouter cette pcda: " + titre,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, ajoutez-la!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.pcdaService.addPcda(value).subscribe({
            next: (res: any) => {
              Swal.fire(
                'Ajoutée!',
                'La PDCA a été ajoutée avec succès.',
                'success'
              );
              this.refreshList();
            },
            error: (err: any) => {
              console.error(err); // Log the error for debugging
              Swal.fire(
                'Erreur!',
                'Une erreur est survenue: ' + (err.message || 'Entrée invalide.'),
                'error'
              );
            }
          });
        }
      });
    }
    
    supprimer(id: number) {
      this.pcdaService.getPcdaById(id).subscribe(data => {
        this.pcdaSupprimer = data;
        
        Swal.fire({
          title: 'Êtes-vous sûr?',
          html: "de supprimer Ce PDCA : <br>" + this.pcdaSupprimer.titre,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Annuler',
          confirmButtonText: 'Oui, supprimez-le!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.pcdaService.deletePcda(id).subscribe(
              () => {
                this.refreshList(); // Vérifiez si cette fonction met correctement à jour la liste
                Swal.fire(
                  'Supprimé!',
                  'PDCA a été supprimé.',
                  'success'
                );
              },
              
              err => {
                console.error('Erreur lors de la suppression:', err); // Log détaillé
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-right',
                  iconColor: 'white',
                  background: '#f27474',
                  customClass: {
                    popup: 'colored-toast'
                  },
                  showConfirmButton: false,
                  timer: 1500,
                  timerProgressBar: true
                });
    
                Toast.fire({
                  icon: 'error',
                  title: 'Erreur'
                });
              }
            );
          }
        });
      }, error => {
        console.error('Erreur lors de la récupération du PDCA:', error); // Log pour getPcdaById
      });
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

       // Ajouter le logo de la clinique
       const logoWidth = 20;
       const logoHeight = 20;
       doc.addImage(logoplus, 'PNG', 5 + 10 + 5, 5, undefined, undefined);
       doc.setFontSize(24); 
       doc.setTextColor(0, 0, 0); 
       doc.setFont('helvetica', 'bold'); 
       doc.text('\nListe des PDCA \n', 25, 25); 
       // Définir les colonnes du tableau
       const headers = [['N°', 'Désignation', 'Titre' , 'Sujet_de_la_publication' , 'Processus' , 'Priorité' ,'Actions_à_faire','O/N','Délai(s) de ld\'action','Responsable','Délai','Statut','Commentaire' ]];
       let idl = 1; // Variable de compteur pour les numéros de département
       // Convertir chaque département en tableau de lignes de données
       const data = pcda.map((task: any) => [idl++,task.id,task.designation ,task.designation,task.Titre,
        task.Sujet_de_la_publication,task.Processus,task.Priorite,task.Action,task.O_N,task.Delaideaction,task.Responsable
        ,task.Delai,task.Statut,task.commentaire
       ]);

       // Dessiner le tableau dans le PDF
       (doc as any).autoTable({
         startY: 40,
         head: headers,
         body: data,
       });

       // Télécharger le PDF avec un nom de fichier spécifié
       doc.save('Liste des PDCA.pdf');
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
