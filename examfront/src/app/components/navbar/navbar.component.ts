import { Component, OnInit} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  active=false;
  user:any;
  
  constructor(public login:LoginService){}

  ngOnInit():void{
    this.active = this.login.isloggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.subscribe((data)=>{
      this.active = this.login.isloggedIn();
      this.user = this.login.getUser();
    });
  }

  public logout(){
    this.login.logout();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }
}
