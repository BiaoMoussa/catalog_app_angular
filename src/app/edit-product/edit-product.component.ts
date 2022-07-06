import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId! :string;
  product! : Product;
  productFormGroup! : FormGroup;
  constructor( private route : ActivatedRoute, public prodService : ProductService , private fb :FormBuilder) {
    this.productId =this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.prodService.getProduct(this.productId)
    .subscribe(
      {
        next: product =>{
            this.product = product;
            this.productFormGroup = this.fb.group(
              {
                name : this.fb.control(this.product.name, [Validators.required, Validators.minLength(4)]),
                price : this.fb.control(this.product.price, [Validators.required , Validators.min(200)]),
                promotion : this.fb.control(this.product.promotion, [Validators.required, ])
              }
            )
        },
        error : err => {
            console.log(err);
        }
      }
    )
  }
  
  handleUpdateProduct(){
    let p = this.productFormGroup.value;
    p.id = this.product.id;
    this.prodService.updateProduct(p)
    .subscribe(
      {
        next : prod => {
            alert("Product added successfully");
        },
        error : err => {
          console.log(err); 
        }
      }
    )
  }

}
