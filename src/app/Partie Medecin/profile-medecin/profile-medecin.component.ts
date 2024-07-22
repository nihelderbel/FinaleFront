import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-profile-medecin',
  templateUrl: './profile-medecin.component.html',
  styleUrls: ['./profile-medecin.component.css']
})
export class ProfileMedecinComponent implements OnInit {
  medecin : any ; 
  nomPrenomMedecin : any ; 
  imagePath : any ; 
  p : number =1 ; 
  s : any ; 
  uploadImageData : any ;
  doneImage: any ; 
  testImage11: any ; 
  imagePath2: any;
  testImage : string = null ;
  selectedFile: File;
  gender : any ; 
 constructor(private router:Router  , private service : AdminDigitalService){}
 ngOnInit() {
   this.testImage = null ;
   this.service.getMedecin(parseInt(localStorage.getItem('idMedecin'))).subscribe(data=>{
   this.medecin=data;
   this.gender = this.medecin.gender;
   console.log( "Medecin Connecte  ", this.medecin.nom+" "+this.medecin.prenom);
   this.nomPrenomMedecin = this.medecin.nom+" "+this.medecin.prenom; 
   if(this.medecin.image ==null){
     this.imagePath="./assets/icons/user1.png"
     this.imagePath2="./assets/icons/user1.png"
     this.testImage11 ="./assets/icons/user1.png"
   }
   else{
     this.imagePath="http://localhost:8281/medecin/getImageMedecin/"+this.medecin.id ; 
     this.imagePath2="http://localhost:8281/medecin/getImageMedecin/"+this.medecin.id ; 
     this.testImage11="http://localhost:8281/medecin/getImageMedecin/"+this.medecin.id ; }

 });
 }
  modifierProfile(fl:NgForm){
    let cin = fl.value.cin ;
    let nom = fl.value.nom ;
    let prenom = fl.value.prenom ;
    let email = fl.value.email ;
    let gender = fl.value.gender; 
    let telephone = fl.value.telephone; 
    let specialite = this.medecin.specialite
    let value={specialite , cin , nom , prenom , gender , email  , telephone};
   this.service.updateMedecin(parseInt(localStorage.getItem("idMedecin")),value).subscribe(()=>{
      console.log(fl.value)
       this.uploadImageData = new FormData();
       if(this.selectedFile !== null){
        this.doneImage=this.selectedFile
       this.uploadImageData.append('file', this.doneImage);
       this.service.updateImageMedecin(parseInt(localStorage.getItem("idMedecin")),this.uploadImageData).subscribe();}
       this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['medecinProfile']);
    }); 
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Les modifications sont enregistrées",
      showConfirmButton: false,
      timer: 3000
    });
     
     }, err=>{
      alert("Opps il y 'a un Probléme , cin ou email déja existe")
    })
    setTimeout(()=>{ }, 10000);                
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.selectedFile = event.target.files[0];
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imagePath2 = reader.result;
        this.testImage = this.imagePath ;
  
      }
    }
  }
  changeImage(){
    this.imagePath2= this.testImage11; 
    this.testImage = null ;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}  