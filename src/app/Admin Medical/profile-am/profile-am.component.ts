import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminMedicalService } from 'src/app/Services/Admin Medical/admin-medical.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-am',
  templateUrl: './profile-am.component.html',
  styleUrls: ['./profile-am.component.css']
})
export class ProfileAMComponent implements OnInit {
  uploadImageData : any ;
  doneImage: any ; 
  testImage11: any ; 
  imagePath2 : any;
  testImage : string = null ;
  selectedFile: File;
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  imagePath : any;
  dateInscription: any ; 
  gender : any ; 
  public constructor(private service : AdminMedicalService , private router : Router , private route : ActivatedRoute) { }
  ngOnInit() {
    this.testImage = null ;
    this.service.getAdminMedical(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
    this.admin=data;
    this.gender = this.admin.gender;
    console.log( "Admin Connecte  ", this.admin.nom+" "+this.admin.prenom);
    this.nomPrenomAdmin = this.admin.nom+" "+this.admin.prenom; 
    this.dateInscription=this.admin.date_inscription ; 
    if(this.admin.image ==null){
      this.imagePath="./assets/icons/user1.png"
      this.imagePath2="./assets/icons/user1.png"
      this.testImage11 ="./assets/icons/user1.png"
    }
    else{
      this.imagePath="http://localhost:8281/adminMedical/getImageProfileAdminMedical/"+this.admin.id ; 
      this.imagePath2="http://localhost:8281/adminMedical/getImageProfileAdminMedical/"+this.admin.id ; 
      this.testImage11="http://localhost:8281/adminMedical/getImageProfileAdminMedical/"+this.admin.id ; }
  });
  }
  modifierProfile(fl:NgForm){
    let cin = fl.value.cin ;
    let nom = fl.value.nom ;
    let prenom = fl.value.prenom ;
    let email = fl.value.email ;
    let gender = fl.value.gender; 
    let telephone = fl.value.telephone; 
    let value={ cin , nom , prenom , gender , email  , telephone};
    this.service.updatedata(parseInt(localStorage.getItem("idAdmin")), value).subscribe(()=>{
      console.log(fl.value)
       this.uploadImageData = new FormData();
       if(this.selectedFile !== null){
        this.doneImage=this.selectedFile
       this.uploadImageData.append('file', this.doneImage);
       this.service.updateImage(parseInt(localStorage.getItem("idAdmin")),this.uploadImageData).subscribe();}
       this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['profileAM']);
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

logout() {
  localStorage.clear();
  this.router.navigate(['']);
}
}  