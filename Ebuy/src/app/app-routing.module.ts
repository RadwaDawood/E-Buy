import { NgModule } from '@angular/core';
import{ Routes,RouterModule} from'@angular/router';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { RegisterComponent } from './Components/register/register.component';
import { from } from 'rxjs';


 const routes:Routes=[
  /* {path:'',redirectTo:'/register',pathMatch:'full'},
  {path:'Register',component:RegisterComponent} */

]; 

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]



})
export class AppRoutingModule { }
