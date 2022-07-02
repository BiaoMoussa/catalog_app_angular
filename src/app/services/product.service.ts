import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../Model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! : Array<Product>;
  constructor() { 
    this.products = [
      { id : UUID.UUID() , name : "Computer" , price :6500, promotion : true},
      { id : UUID.UUID()  , name : "Printer" , price :1200, promotion : false},
      { id : UUID.UUID()  , name : "Smart Phone" , price :6500, promotion : true},
      { id : UUID.UUID()  , name : "Computer" , price :1400, promotion : true}
    ];

    for (let index = 0; index < 10; index++) {
     this.products.push({ id : UUID.UUID() , name : "Computer" , price :6500, promotion : true});
     this.products.push({ id : UUID.UUID() , name : "Computer" , price :6500, promotion : false});
     this.products.push({ id : UUID.UUID() , name : "Printer" , price :6500, promotion : false});
      
    }
  }


  public getAllProducts() : Observable<Array<Product>>{

    let rnd = Math.random();
    if(rnd<0.01) return throwError(()=> new Error("Internet connection error"));
    else return of([...this.products]); // on envoie dans ce cas une copie de la liste, les références vont changer 
  } 

  public getPageProducts(page : number, size : number) : Observable<PageProduct>{
    let totalPages = ~~(this.products.length/size);
    let index = page*size;
    let pageProducts = this.products.slice(index,index+size);
    if(this.products.length%size !=0)
        totalPages++;    
    pageProducts  = this.products.slice(index,index+size);
    return of({  page : page, size : size , totalPages : totalPages, products : pageProducts });
  }

  public deleteProduct(id : string) : Observable<boolean>{

    this.products = this.products.filter(p => p.id!=id);

    return of(true);
  }

  public setPromotion(id : string) : Observable<boolean>{

    let product =  this.products.find(p=>p.id=id);

    if(product != undefined){
      product.promotion != product.promotion;
      
      return of(true);
    }else return throwError( () => new Error("Product not found"));

  }

  public searchProducts(keyword : string, page : number, size : number) : Observable<PageProduct>{
    let result = this.products.filter(p=> p.name.includes(keyword));
    let totalPages = ~~(result.length/size);
    let index = page*size;
    let pageProducts = this.products.slice(index,index+size);
    if(this.products.length%size !=0)
        totalPages++;    
    pageProducts  = result.slice(index,index+size);
    return of({  page : page, size : size , totalPages : totalPages, products : pageProducts });
    
  }
}
