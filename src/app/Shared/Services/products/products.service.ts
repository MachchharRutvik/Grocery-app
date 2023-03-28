import { Injectable } from '@angular/core';
import { Grocery } from './../../Interfaces/groceryInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
  categoriesName=[
    "All","Vegetables","Fruits","Coffee & teas","Meat"
  ]
  
  groceryList:Grocery[] = [
    {
      id: 1,
      grocery_name: "Bananas",
      store: "ABC Supermarket",
      price: 0.49,
      discountPrice: 0.24,
      rating: 4.2,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"../assets/peach.png"
    },
    {
      id: 2,
      grocery_name: "Chicken Breast",
      store: "XYZ Grocery",
      price: 5.99,
      discountPrice: 4.99,
      rating: 4.5,
      quantity: "1 lb",
      category: "Meat",
      imageUrl:"../assets/peach.png"
    },
    {
      id: 3,
      grocery_name: "Carrots",
      store: "123 Market",
      price: 0.99,
      discountPrice: 1,
      rating: 3.9,
      quantity: "1 lb",
      category: "Vegetables",
      imageUrl:"../assets/peach.png"
    },
    {
      id: 4,
      grocery_name: "Apples",
      store: "ABC Supermarket",
      price: 1.29,
      discountPrice: 1,
      rating: 4.1,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"../assets/peach.png"
    },
    {
      id: 5,
      grocery_name: "Salmon Fillet",
      store: "XYZ Grocery",
      price: 9.99,
      discountPrice: 1,
      rating: 4.3,
      quantity: "1 lb",
      category: "Meat",
      imageUrl:"../assets/peach.png"
    },
    {
      id: 6,
      grocery_name: "Cucumbers",
      store: "123 Market",
      price: 1.49,
      discountPrice: 1,
      rating: 3.8,
      quantity: "1 lb",
      category: "Vegetables",
      imageUrl:"../assets/peach.png"
    },
    {
      id: 7,
      grocery_name: "Oranges",
      store: "ABC Supermarket",
      price: 0.99,
      discountPrice: 0.79,
      rating: 4.0,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"../assets/peach.png"
    },
    {
      id: 8,
      grocery_name: "Ground Beef",
      store: "XYZ Grocery",
      price: 6.99,
      discountPrice: 1,
      rating: 4.2,
      quantity: "1 lb",
      category: "Meat",
      imageUrl:"../assets/peach.png"
    },
    {
      id: 9,
      grocery_name: "Broccoli",
      store: "123 Market",
      price: 1.99,
      discountPrice: 1,
      rating: 3.9,
      quantity: "1 lb",
      category: "Vegetables",
      imageUrl:"../assets/peach.png"
    },
    {
      id: 10,
      grocery_name: "Grapes",
      store: "ABC Supermarket",
      price: 2.99,
      discountPrice: 1,
      rating: 4.3,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"../assets/peach.png"
    },
      {
        id: 11,
        grocery_name: "Sweet Potatoes",
        store: "Fresh Foods",
        price: 1.99,
        discountPrice: 1,
        rating: 4.5,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"../assets/peach.png"
      },
      {
        id: 12,
        grocery_name: "Blueberries",
        store: "SuperMart",
        price: 2.99,
        discountPrice: 1,
        rating: 4.1,
        quantity: "1 lb",
        category: "Fruits",
        imageUrl:"../assets/peach.png"
      },
     
      {
        id: 14,
        grocery_name: "Asparagus",
        store: "Fresh Foods",
        price: 2.49,
        discountPrice: 1,
        rating: 4.3,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"../assets/peach.png"
      },
      {
        id: 15,
        grocery_name: "Strawberries",
        store: "SuperMart",
        price: 3.49,
        discountPrice: 1,
        rating: 4.2,
        quantity: "1 lb",
        category: "Fruits",
        imageUrl:"../assets/peach.png"
      },
      {
        id: 16,
        grocery_name: "Pork Loin Roast",
        store: "Meat King",
        price: 8.99,
        discountPrice: 1,
        rating: 4.0,
        quantity: "1 lb",
        category: "Meat",
        imageUrl:"../assets/peach.png"
      },
      {
        id: 17,
        grocery_name: "Spinach",
        store: "Fresh Foods",
        price: 1.99,
        discountPrice: 1,
        rating: 4.1,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"../assets/peach.png"
      },
      {
        id: 18,
        grocery_name: "Pineapple",
        store: "SuperMart",
        price: 2.99,
        discountPrice: 1,
        rating: 4.4,
        quantity: "1 lb",
        category: "Fruits",
        imageUrl:"../assets/peach.png"
      },
      {
        id: 19,
        grocery_name: "Salmon Fillet",
        store: "Fish Market",
        price: 10.99,
        discountPrice: 1,
        rating: 4.5,
        quantity: "1 lb",
        category: "Meat",
        imageUrl:"../assets/peach.png"
      },
      {
        id: 20,
        grocery_name: "Bell Peppers",
        store: "Fresh Foods",
        price: 1.49,
        discountPrice: 1,
        rating: 4.0,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"../assets/peach.png"
      }
    ];
    // uniqueCategories =this.groceryList.filter((value,index,self)=>{
    //   return index === self.findIndex((p) => {
    //     return p.category === value.category;
    //   });
    // });
    categories:Set<string> = new Set<string>(['All']);
    stores:Set<string> = new Set<string>();

    getGrocery(){
      return this.groceryList;
    }

    getCategories():string[] {
      this.groceryList.forEach((grocery:Grocery)=>{
        this.categories.add(grocery.category);
      })
      return Array.from(this.categories);
    }

    getProductByCategories(category:string){
      if(category && category != 'All'){
      return this.groceryList.filter(product => product.category === category)
    }
      return this.groceryList;
    }
    getProductsByStores(category:string){
      if(category == 'All'){
        this.groceryList.forEach((grocery)=>{
          this.stores.add(grocery.store);
        })
      }
      else{
        this.groceryList.forEach((grocery:Grocery)=>{
          if(grocery.category === category){
            this.stores.add(grocery.store);
          }
        })
      }
      return Array.from(this.stores);
    
    }
    getStores(){
      this.groceryList.forEach((store)=>{
        this.stores.add(store.store);
      })
      return Array.from(this.stores);
    }
    getProductsBySearch(search: string){
      let searchItems = this.groceryList.filter((product) => {
         return product.grocery_name.toLowerCase().indexOf(search.toLowerCase())!=-1;
      });
      console.log(searchItems);
      return searchItems;
    }
    getProductsBySearchAndCategory(category: string,word: string){
      let productsByCategory = this.getProductByCategories(category);
      let searchWordProducts = productsByCategory.filter((product)=>{
        return product.grocery_name.toLowerCase().indexOf(word.toLowerCase())!=-1;
      })
      return searchWordProducts;
    }
    getProductById(id: number){
      // console.log(id);
     const product =  this.groceryList.find((p) =>{ 
      // console.log('p',p);
      // console.log(typeof(id));
       return p.id === id;
    })
    return product;
    }
}
