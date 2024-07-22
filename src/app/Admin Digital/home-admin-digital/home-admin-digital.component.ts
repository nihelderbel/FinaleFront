import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import * as echarts from 'echarts';
import * as $ from 'jquery';
import { PatientService } from 'src/app/Services/Patients/patient.service';
import { AdminMedicalService } from 'src/app/Services/Admin Medical/admin-medical.service';

@Component({
  selector: 'app-home-admin-digital',
  templateUrl: './home-admin-digital.component.html',
  styleUrls: ['./home-admin-digital.component.css']
})
export class HomeAdminDigitalComponent implements OnInit {
  DossiersTotal : any ; 
  imageParDefaut  :string="./assets/icons/user1.png"
  admin : any ; 
  adminConcecte : any ; 
  nomPrenomAdmin : string="";
  imagePath : string="";
  patientToDaycount:number = 0;
  medecinsInscrit:number = 0;
  rendezVousToDay:number = 0;
  operationToDay:number = 0;
  patients1 : any 
  patients2 : any 
  patients3 : any 
  patients4: any 
  patients5 : any 
  patients6 : any 
  patients7 : any 
  patients8 : any 
  patients9 : any 
  patients10 : any 
  patients11 : any 
  patients12 : any 
  moyenne1 : any
  moyenne2 : any
  moyenne3 : any
  moyenne4 : any
  moyenne5 : any
  moyenne6 : any
  moyenne7 : any
  moyenne8 : any
  moyenne9 : any
  moyenne10 : any
  moyenne11 : any
  moyenne12: any
  public constructor(private service : AdminDigitalService , private router : Router , private serviceAdminMedical : AdminMedicalService , 
    private route : ActivatedRoute  , private  patientService : PatientService) { }
  ngOnInit() {
    this.getallNumDossierExiste()
    this.imageParDefaut="./assets/icons/user1.png" ;
    this.RVAuj() ;
    /**** chart patients ****/
    this.patientService.getNbrPatientParMonth(1).subscribe(data=>{
      this.patients1=data ;
      this.patientService.getNbrPatientParMonth(2).subscribe(data=>{
      this.patients2=data ;
      this.patientService.getNbrPatientParMonth(3).subscribe(data=>{
      this.patients3=data ;
      this.patientService.getNbrPatientParMonth(4).subscribe(data=>{
      this.patients4=data ;
      this.patientService.getNbrPatientParMonth(5).subscribe(data=>{
      this.patients5=data ;
      this.patientService.getNbrPatientParMonth(6).subscribe(data=>{
      this.patients6=data ;
      this.patientService.getNbrPatientParMonth(7).subscribe(data=>{
      this.patients7=data ;
      this.patientService.getNbrPatientParMonth(8).subscribe(data=>{
      this.patients8=data ;
      this.patientService.getNbrPatientParMonth(9).subscribe(data=>{
      this.patients9=data ;
      this.patientService.getNbrPatientParMonth(10).subscribe(data=>{
      this.patients10=data ;
      this.patientService.getNbrPatientParMonth(11).subscribe(data=>{
      this.patients11=data ;
      this.patientService.getNbrPatientParMonth(12).subscribe(data=>{
      this.patients12=data ;
    
      this.patientService.getMoyenneAgesPatientParMonth(1).subscribe(params=>{
      this.moyenne1 =params ; 
      this.patientService.getMoyenneAgesPatientParMonth(2).subscribe(params=>{
      this.moyenne2 =params ; 
      this.patientService.getMoyenneAgesPatientParMonth(3).subscribe(params=>{
      this.moyenne3 =params ; 
      this.patientService.getMoyenneAgesPatientParMonth(4).subscribe(params=>{
      this.moyenne4 =params ; 
      this.patientService.getMoyenneAgesPatientParMonth(5).subscribe(params=>{
      this.moyenne5 =0 ; 
      this.patientService.getMoyenneAgesPatientParMonth(6).subscribe(params=>{
      this.moyenne6 =0 ; 
      this.patientService.getMoyenneAgesPatientParMonth(7).subscribe(params=>{
      this.moyenne7 =0 ; 
      this.patientService.getMoyenneAgesPatientParMonth(8).subscribe(params=>{
      this.moyenne8 =0 ; 
      this.patientService.getMoyenneAgesPatientParMonth(9).subscribe(params=>{
      this.moyenne9 =0 ; 
      this.patientService.getMoyenneAgesPatientParMonth(10).subscribe(params=>{
      this.moyenne10 =0 ; 
      this.patientService.getMoyenneAgesPatientParMonth(11).subscribe(params=>{
      this.moyenne11 =0 ; 
      this.patientService.getMoyenneAgesPatientParMonth(12).subscribe(params=>{
      this.moyenne12 =0 ; 

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom, 'light');
    var option;
    option = {
      backgroundColor:'rgb(255, 255, 255)',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['Patients', 'Age Patients']
      },
      toolbox: {
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Patients',
          type: 'line',
          color:'	#6495ED',
         // stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [this.patients1,this.patients2, this.patients3,this.patients4,0,0,0,0,0,0,0,0],
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
        },
        {
          name: 'Age Patients',
          type: 'line',
          color:'rgb(255, 150, 150)',
         // stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [this.moyenne1,this.moyenne2,this.moyenne3,this.moyenne4, this.moyenne5,this.moyenne6,this.moyenne5,this.moyenne6,this.moyenne7,this.moyenne8,this.moyenne9,this.moyenne10,this.moyenne11,this.moyenne12]
        }
      ]
    };
    
    option && myChart.setOption(option);
     /**** chart performance medecins  ****/
    var chartDom = document.getElementById('main2');
    var myChart = echarts.init(chartDom, 'light');
    var option;
    
    const colors = ['#F4A460', '#B0C4DE', '#48D1CC', '#EE6666'];
    option = {
      backgroundColor:'rgb(255, 255, 255)',
      color: colors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        right: '10%',
        height:'70%'
      },
      toolbox: {
        feature: {
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Médecins', 'Secrétaires', 'Homme', 'Femme']
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          // prettier-ignore
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: ' Femme',
          position: 'right',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[3]
            }
          },
          axisLabel: {
            formatter: '{value} '
          }
        },
        {
          type: 'value',
          name: 'non-Expert',
          //position: 'right',
          alignTicks: false,
          offset: 90,
          axisLine: {
            show: false,
            lineStyle: {
              color: colors[1]
            }
          },
          axisLabel: {
            formatter: '{value} '
          }
        },
        {
          type: 'value',
          name: 'Homme',
          position: 'left',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[2]
            }
          },
          axisLabel: {}
        },
    
        {
         // type: 'value',
        //  name: 'Femme',
         // position: 'left',
          alignTicks: true,
          offset: 500,
          axisLine: {
            //show: false,
            lineStyle: {
             // color: colors[3]
            }
          },
          //axisLabel: {}
        }
      ],
      series: [
        {
          name: 'Médecins',
          type: 'bar',
         
 data: [12,12,14,15,16,18,80,17,15,10,11,12]
        },
        {
          name: 'Secrétaires',
          type: 'bar',
          yAxisIndex: 1,
          data: [ 12,12,14,15,16,18,80,95,15,10,11,12]
        },
        {
          name: 'Homme',
          type: 'line',
          yAxisIndex: 2,
          data: [12,12,14,15,16,91,80,17,15,10,11,12]
        },
        {
          name: 'Femme',
          type: 'line',
          yAxisIndex: 3,
          data: [12,12,14,15,16,18,80,17,15,93,11,12]
        }
      ]
    };
    
    option && myChart.setOption(option);
  })  })  })  })  })  })  })  })  })  })  })  }) 
})  })  })  })  })  })  })  })  })  })  })  }) 
    /************************************************************************************/
    this.getNumPatientsToDay();
    this.getNumMedecinsToDay();
    this.getNumRendezVousToDay() ; 
    this.getNumOperationsToDay() ;
    /************************************************************************/
    this.service.getAdminDigital(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
    this.admin=data;
    console.log( "Admin Connecte  ", this.admin.nom+" "+this.admin.prenom);
    this.nomPrenomAdmin = this.admin.nom+" "+this.admin.prenom; 
    if(this.admin.image == null){
      this.imagePath="./assets/icons/user1.png"
      this.imageParDefaut="./assets/icons/user1.png"
    }
    else{
      this.imagePath="http://localhost:8281/adminDigital/getImageProfileAdminDigial/"+this.admin.id ; }

      this.service.getAllMedecins().subscribe(data => {
        this.service.MedecinData =  data;
        this.service.testTabMedecins = this.service.MedecinData.length;
        console.log("les mdecins sont :"+this.service.MedecinData) ; 
  });
  });
  }
  
  getNumPatientsToDay(){

    this.service.getAllPatientsByDateInscription().subscribe(data=>{
    this.patientToDaycount =data;
    $({ countNum: $('.patient').html() }).animate({ countNum: this.patientToDaycount }, {
      duration: 500,
      easing: 'linear',
      step: function () {
      $('.patient').html(Math.floor(+this.countNum) + "");
  },
  complete: function () {
      $('.patient').html(this.countNum + "");
      //alert('finished');
  }
  });
  })

  }
  getNumMedecinsToDay(){

    this.service.getAllMedecinsToDayInscris().subscribe(data=>{
    this.medecinsInscrit =data;
    $({ countNum: $('.patient').html() }).animate({ countNum: this.medecinsInscrit }, {
      duration: 500,
      easing: 'linear',
      step: function () {
      $('.patient').html(Math.floor(+this.countNum) + "");
  },
  complete: function () {
      $('.patient').html(this.countNum + "");
      //alert('finished');
  }
  });
  })
  }
  getNumRendezVousToDay(){

    this.service.getAllRendezVousToDay().subscribe(data=>{
    this.rendezVousToDay =data;
    $({ countNum: $('.patient').html() }).animate({ countNum: this.rendezVousToDay }, {
      duration: 500,
      easing: 'linear',
      step: function () {
      $('.patient').html(Math.floor(+this.countNum) + "");
  },
  complete: function () {
      $('.patient').html(this.countNum + "");
      //alert('finished');
  }
  });
  })
  }
  getNumOperationsToDay(){

    this.service.getAllOperationsToDay().subscribe(data=>{
    this.operationToDay =data;
    $({ countNum: $('.patient').html() }).animate({ countNum: this.operationToDay }, {
      duration: 500,
      easing: 'linear',
      step: function () {
      $('.patient').html(Math.floor(+this.countNum) + "");
  },
  complete: function () {
      $('.patient').html(this.countNum + "");
      //alert('finished');
  }
  });
  })
  }
RVAuj(){
  this.service.getAllRVAuj().subscribe(data=>{
    this.service.RVData = data ;
    this.service.testRV =  this.service.RVData.length
  })
}
formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 10); // Format 'yyyy-mm-dd'
} 
getallNumDossierExiste(){
  this.serviceAdminMedical.getallNumDossierExiste().subscribe(data=>{
  this.DossiersTotal = data ; 
  })
}
logout() {
  localStorage.clear();
  this.router.navigate(['']);
}
}  