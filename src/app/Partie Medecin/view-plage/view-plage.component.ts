import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PlageHorraire } from 'src/app/Modeles/PlageHorraire';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { PlageService } from 'src/app/Services/Medecin/Plage Horraire/plage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-plage',
  templateUrl: './view-plage.component.html',
  styleUrls: ['./view-plage.component.css']
})
export class ViewPlageComponent implements OnInit {
  user : any ={} ; 
  idPlage:any;
  plages: PlageHorraire[] = [];
  imageParDefaut : string='';
  medecin : any ; 
  nomPrenomMedecin : any ; 
  imagePath : any ; 
  p : number =1 ; 
  PlageASupprimer: any;
 constructor(private plageService:PlageService,private router:Router  , private service : AdminDigitalService){}

 ngOnInit() {
  this.service.getMedecin(parseInt(localStorage.getItem('idMedecin'))).subscribe(data=>{
    this.medecin=data;
    console.log( "Medecin Connecte  ", this.medecin.nom+" "+this.medecin.prenom);
    this.nomPrenomMedecin = this.medecin.nom+" "+this.medecin.prenom; 
    if(this.medecin.image ==null){
      this.imagePath="./assets/icons/user1.png";
      this.imageParDefaut="./assets/icons/user1.png";
    }
    else{
      this.imagePath="http://localhost:8281/medecin/getImageMedecin/"+this.medecin.id ; }

      this.refreshList() ; 
  });
}
  set texte(a:string){
    this.plages=this.filtrer(a);
  }
  filtrer(a: string) {
    return this.plages.filter(x=>x.nom.indexOf(a)!= -1);
  }
  supprimer(id:number){
    this.plageService.getPlageById(id).subscribe(data=>{
      this.PlageASupprimer = data
         
    Swal.fire({
      title: 'Êtes-vous sûr?',
      html: "de supprimer Ce Plage  : <br>" + this.PlageASupprimer.nom,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.plageService.deletePlage(id).subscribe(()=>{this.refreshList()
          console.log("ok")
        Swal.fire(
          'Supprimé !',
          'Médecin a été supprimé.',
          'success'
        ) }
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
  addTask(f: NgForm): void {
    const nom = f.value['nom'];
    const duree = f.value['duree'];
    const heureDebut = f.value['heureDebut'];
    const heureFin = f.value['heureFin'];
    const val = { nom, duree, heureDebut, heureFin };
  
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "de rajouter cette plage: " + nom,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, ajoutez-la!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.plageService.addPlage(val).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Ajoutée!',
              'La plage a été ajoutée avec succès.',
              'success'
            );
            this.refreshList();
          },
          error: (res: any) => {
            Swal.fire(
              'Erreur!',
              'Entrée invalide.',
              'error'
            );
          }
        });
      }
    });
  }
  refreshList():void{
    this.plageService.getPlage().subscribe(data =>{
      setTimeout(()=>{ }, 4000);
      this.plages=data;
    
    } );
     }
  modifier(task1Form:NgForm){
    const nom = task1Form.value.nom;
    const duree=task1Form.value.duree;
    const heureDebut=task1Form.value.heureDebut;
    const heureFin=task1Form.value.heureFin; 
    const value={nom ,duree,heureDebut,heureFin};
    this.plageService.updatePlage(this.user.idPlage, value ).subscribe(()=>{
    console.log("Modifier avec succes",value)
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    this.router.navigate(['view-plage']);});
      
    }, err=>{
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Erreur de Modifier !!!!",
        showConfirmButton: true,
        timer: 10000
      });
    });
  }
 
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
  } 
}
