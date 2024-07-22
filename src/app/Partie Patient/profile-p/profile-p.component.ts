import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/Services/Patients/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-p',
  templateUrl: './profile-p.component.html',
  styleUrls: ['./profile-p.component.css']
})
export class ProfilePComponent implements OnInit {

  uploadImageData : any ;
  doneImage: any ; 
  testImage11: any ; 
  imagePath2 : any;
  testImage : string = null ;
  selectedFile: File;
  patient : any ; 
  adminConcecte : any ; 
  nomPrenomPatient : string="";
  imagePath : any;
  dateInscription: any ; 
  gender : any ; 
  public constructor(private service : PatientService , private router : Router , private route : ActivatedRoute) { }
  ngOnInit() {
    this.testImage = null ;
    this.service.getPatient(parseInt(localStorage.getItem('idPatient'))).subscribe(data=>{
    this.patient=data;
    this.gender = this.patient.gender;
    console.log( "Admin Connecte  ", this.patient.nom+" "+this.patient.prenom);
    this.nomPrenomPatient = this.patient.nom+" "+this.patient.prenom; 
    this.dateInscription=this.patient.date_inscription ; 
    if(this.patient.image ==null){
      this.imagePath="./assets/icons/user1.png"
      this.imagePath2="./assets/icons/user1.png"
      this.testImage11 ="./assets/icons/user1.png"
    }
    else{
      this.imagePath="http://localhost:8281/patient/getImageProfilePatient/"+this.patient.id ; 
      this.imagePath2="http://localhost:8281/patient/getImageProfilePatient/"+this.patient.id ; 
      this.testImage11="http://localhost:8281/patient/getImageProfilePatient/"+this.patient.id ; }

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
    this.service.updatPatient(parseInt(localStorage.getItem("idPatient")), value).subscribe(()=>{
      console.log(fl.value)
       this.uploadImageData = new FormData();
       if(this.selectedFile !== null){
        this.doneImage=this.selectedFile
       this.uploadImageData.append('file', this.doneImage);
       this.service.updateImagePatient(parseInt(localStorage.getItem("idPatient")),this.uploadImageData).subscribe();}
       this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['profileP']);
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

todayDate(): string {
  return new Date().toISOString().split('T')[0]; }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
  } 
              
}  