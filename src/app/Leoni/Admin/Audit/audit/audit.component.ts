import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Audit } from 'src/app/Leoni/Modeles/audit';
import { AuditService } from 'src/app/Leoni/Services/Audit/audit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  imageParDefaut  :string="./assets/icons/user1.png"
  imagePath : string="";
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  user : any ={} ;

  audit:Audit[]=[];
  auditSupprimer:any;
  constructor(private router:Router,private auditService:AuditService) { }

  ngOnInit() {
    this.refreshList() ; 
   
  }
  set texte(a:string){
    this.audit=this.filtrer(a);
  }
  filtrer(a: string) {
    return this.audit.filter(x=>x.titredocument.indexOf(a)!= -1);
  }
  refreshList():void{
    this.auditService.getAudit().subscribe(data =>{
      setTimeout(()=>{ }, 4000);
      this.audit=data;
    
    } );
     }
     formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
    }  
    openModelEdit(id : number){
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
  
    sauvegarderrr(fAdd: NgForm): void {
      let typedocument= fAdd.value.typedocument;
      let numeroinstruction  = fAdd.value.numeroinstruction ;
      let titredocument = fAdd.value.titredocument;
      let raison= fAdd.value.raison;
      let contenu = fAdd.value.contenu ;
      let etatdeinstruction = fAdd.value.etatdeinstruction;
      let effectif = fAdd.value.effectif; // Ensure this matches the form name
      let application  = fAdd.value.application ;
      let miseajour = fAdd.value.miseajour;
      let deviation = fAdd.value.deviation;
      let action = fAdd.value.action;
      let responsable = fAdd.value.responsable;
      let delai = fAdd.value.delai;
      let controlesuccess = fAdd.value.controlesuccess;
      let value = { typedocument,numeroinstruction,titredocument,raison,contenu,etatdeinstruction,effectif,application,miseajour,
        deviation,action,responsable,delai,controlesuccess
       };
     
      this.auditService.addAudit(value ).subscribe(()=>{
        console.log("hiiiiiiiiiiiiiiiiiiii",fAdd.value)
        this.closeModalAdd() ;
       this.refreshList();
          
        }, err=>{
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Titre de document existe déjà   !!!!",
            showConfirmButton: true,
            timer: 10000
          });
        });
   
    
      
    }
    
    downloadPDF():void{
      // Récupérer le logo de la clinique depuis votre service ou le stockage local
      const logoplus = '/assets/img/leoni.png';
      // Appel à la méthode pour récupérer les départements depuis le service
      this.auditService.getAudit().subscribe(pcda => {
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
       supprimer(id:number){
        this.auditService.getAuditById(id).subscribe(data => {
          this.auditSupprimer = data;
          
          Swal.fire({
            title: 'Êtes-vous sûr?',
            html: "de supprimer Ce Audit: <br>" + this.auditSupprimer.titre,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui, supprimez-le!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.auditService.deleteAudit(id).subscribe(
                () => {
                  this.refreshList(); // Vérifiez si cette fonction met correctement à jour la liste
                  Swal.fire(
                    'Supprimé!',
                    'Audit a été supprimé.',
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
}
