import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBookComponent } from './components/list-book/list-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';

const routes: Routes = [
  {
    path:"listBooks",component:ListBookComponent
  },
  {
    path : "editBook/:id", component: EditBookComponent 
  },
  {
    path : "addBook" , component : AddBookComponent
  },
  {
    path:"", redirectTo:"addBook",pathMatch:'full'    
  }
];          

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
