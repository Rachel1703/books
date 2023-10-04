import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
bookForm:FormGroup;
submitted:boolean = false;
  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private ngZone : NgZone,
    private crudAPI : CrudService
    ) { 
      this.bookForm = this.formBuilder.group({
        title:['',Validators.required],
        author:['',Validators.required],
        description:['', [Validators.required,Validators.minLength(30)]],
        publicationYear:['',[Validators.required,Validators.minLength(4), Validators.pattern("^[0-9]*$")]],
        ISBN:['',[Validators.required,Validators.minLength(8)]]
      })
    }

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.submitted = true;
    if(this.bookForm.invalid){
      return;
    }

    this.crudAPI.addBook(this.bookForm.value).subscribe((res)=>{
      console.log("Data Added successfully");
      this.ngZone.run(()=>this.router.navigateByUrl('/listBooks'))
      
    },(err)=>{
    console.log(err);
    })
  }

}
