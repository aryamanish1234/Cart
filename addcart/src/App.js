import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class  App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")?  JSON.parse(localStorage.getItem("cartItems")):[],
      size:"",
      sort:"",
    };
  };
  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };
  removeFromCart = (product) =>{
    const cartItems =this.state.cartItems.slice();
    this.setState({cartItems:cartItems.filter((x)=>x._id !== product._id),})
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter((x)=>x._id !== product._id))
    );
  }
  addToCart = (product) => {
    let alreadyInCart = false;
    const cartItems = this.state.cartItems.slice();
    cartItems.forEach(item =>{
      if (item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart){
      cartItems.push({ ...product, count: 1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems) );
  };
  sortProducts = (event) => {
    // implement
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) =>({
      sort : sort,
      products : this.state.products.slice().sort((a,b) => 
        sort  === "lowest"
        ? a.price < b.price
         ? 1
         : -1
        : sort === "height"
        ? a.price > b.price
         ? 1 
         : -1
        : a._id < b._id
        ? 1 
        : -1
      ),
    }));

  };
  filterProducts = (event)=> {
    // yha bhi 
    console.log(event.target.value);
    if(event.target.value === ""){
      this.setState({size: event.target.value, product: data.products});
    } else {
      this.setState({
        size: event.target.value,
    products: data.products.filter(product => product.availabelSizes.indexOf(event.target.value)>=0),
      });
    }

  };
  render(){
  return (
    <div className="grid-container">
      <header>
        <a href="/" className="shop">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter count={this.state.products.length}
            size={this.state.size}
            sort={this.state.sort}
            filterProducts={this.filterProducts}
            sortProducts={this.sortProducts} ></Filter>
            <Products products={this.state.products} addToCart={this.addToCart}></Products>
            </div>
          <div className="sidebar">
            <Cart cartItems={this.state.cartItems}
            removeFromCart={this.removeFromCart}
            createOrder={this.createOrder}
            ></Cart>
            </div>
        </div>
      </main>
      <footer> All right is resered.</footer>
    </div>
  );
  }
}
export default App;
