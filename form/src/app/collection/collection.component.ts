import { Component, OnChanges, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { User, Friends, Hobies } from '../models/Collection';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnChanges {
@Input() data: User
userForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionService
  ) {
    this.createForm()
   }

  
   createForm () {
     this.userForm = this.fb.group({
       name: '',
       friends: this.fb.group({
        firstName: '',
        lastName: '',
        narrative: '',
        
        hobies: this.fb.group({
          name: '',
          narrative: ''
        })
       }),
     
      
     })
    }
    rebuildForm(){
      this.userForm.setValue({
        name: this.data.name,
        friends: {
          firstName: this.data.friends[0].firstName,
          lastName: this.data.friends[0].lastName,
          narrative: this.data.friends[0].narrative,
          hobies:{
            name: this.data.friends[0].hobies[0].name,
            narrative: this.data.friends[0].hobies[0].narrative
          }

        }
      })
    }
    
  
   










 
   ngOnChanges() {
    
     this.rebuildForm()
     
  }

     
        
      
  
 onSubmit() {
  this.data = this.userForm.value
  this.collectionService.updateUser(this.data)
  this.userForm.reset()
}

get addFriend():FormArray{

  return  this.userForm.get('friends') as FormArray
 
}
add() {
  this.userForm.patchValue({
    friends: {
      firstName: this.data.friends[0].firstName,
      lastName: this.data.friends[0].lastName,
      narrative: this.data.friends[0].narrative,
      hobies:{
        name: this.data.friends[0].hobies[0].name,
        narrative: this.data.friends[0].hobies[0].narrative
      }

    }


  })

}
 
}
