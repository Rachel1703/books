import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
bookForm:FormGroup;
  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private ngZone : NgZone,
    private crudAPI : CrudService
    ) { 
      this.bookForm = this.formBuilder.group({
        'title':[''],
        'author':[''],
        'description':[''],
        'publicationYear':[''],
        'ISBN':['']
      })
    }

  ngOnInit(): void {
    
  }

  onSubmit():any {
    this.crudAPI.addBook(this.bookForm.value).subscribe((res:any)=>{
      console.log("Data Added successfully");
      this.ngZone.run(()=>this.router.navigateByUrl('/listBooks'))
      
    },(err)=>{
    console.log(err);
    })
  }
  

}
