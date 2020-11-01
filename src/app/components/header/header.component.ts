import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  

  constructor(private router:Router,public appService:AppService) { 
   
  }

  ngOnInit() {
    
  }

  search(){
    if(this.appService.searchText){
      this.router.navigate(['search/'+this.appService.searchText])
    }else{
      this.router.navigate(['/'])
    }
  }
}
