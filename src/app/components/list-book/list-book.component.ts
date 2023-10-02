import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
tabData:any=[];
  constructor(private crudapi:CrudService) { }

  ngOnInit(): void {
    this.tabData=this.crudapi.getBooks().subscribe((data)=>{
      this.tabData = data;
    });
    console.log(this.tabData);
  }

  deleteBook(id:any,book:any,i:any){
    console.log("ID ",id,book,i);
    
    if(window.confirm('Are you sure you want to delete')){
      this.crudapi.deleteBook(id,book).subscribe(res => {
        this.tabData.splice(i,1);
        
      })
    }

  }

}
