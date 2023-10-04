import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
getId:any;
updateForm!: FormGroup;
  constructor(
    private fb : FormBuilder,
    private ngZone:NgZone,
    private router : Router,
    private activatedRouted : ActivatedRoute,
    private crud : CrudService,
    ) { 
      this.getId = this.activatedRouted.snapshot.paramMap.get('id');
      this.crud.getBook(this.getId).subscribe(res =>{
        this.updateForm.setValue({
          title:res['title'],
          author:res['author'],
          description:res['description'],
          publicationYear : res['publicationYear'],
          ISBN:res['ISBN']
        })
      })
      this.updateForm = this.fb.group({
        title:['',Validators.required],
          author:[''],
          description:[''],
          publicationYear : [''],
          ISBN:['']
      })
    }

  ngOnInit(): void {
  }

  onUpdate(){
    this.crud.updateBook(this.getId,this.updateForm.value).subscribe(res =>{
      console.log("Data Updated Succesfully",res);
      this.ngZone.run(() => { this.router.navigateByUrl('/listBooks')}),
      (err:any)=>{
        console.log(err);
        
      }
    })
  }

}
