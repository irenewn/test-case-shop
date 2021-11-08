import React, {Component } from "react";
import Product from "../../components/Product";
import { ProductApi } from "../../api";
import { Modal, Button, InputNumber, } from "antd";
import 'antd/dist/antd.css';
import styled from "styled-components";

const loading = (
  <div className="suspense-page">
    {" "}
    Loading...{" "}
  </div>
);

export default class Catalogue extends Component {
  state = {
    menuOpened: false,
    products: [],
    selectedProduct: {},
    onLoading: false,
    showModal: false,
    showModalCart: false,
    cart: [],
    qty: 1,
  };

  handleMenuOpen(e) {
    this.setState({
      menuOpened: !this.state.menuOpened,
    });
  }

  getDataProducts() {
    return ProductApi.get().then(res => res.json())
    .then(res => {
      this.setState({
        products : res,
      })
    });
  }

  componentDidMount() {
    document.title = "Katalog Produk";
    this.getDataProducts();
  }

  showModal(product){
    this.setState({showModal: true, selectedProduct: product})
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, showModal: false, selectedProduct: {} , qty: 1});
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ showModal: false, selectedProduct: {}, qty: 1 });
  };

  handleOkCart = () => {
    this.setState({ showModalCart: false });
  };

  handleCancelCart = () => {
    this.setState({ showModalCart: false });
  };

  addtoCartHandler = () => {
    var carts = this.state.cart
    var qty = this.state.qty
    var position = carts
    .map(function (e) {
      return e.id;
    })
    .indexOf(this.state.selectedProduct.id);
    if (position<0){
      //new insert
      var objInserted = {
        ...this.state.selectedProduct,
        qty,
      };
      carts.push(objInserted)
    }else{
      var obj = carts[position];
      var objInserted = {...obj, qty: obj.qty+this.state.qty};
      carts[position] = objInserted;
    }
    this.setState({
      showModal: false,
      qty: 1,
      selectedProduct: {},
    },()=>{
      this.recalculateGrandTotal();
      console.log(`cart`, this.state.cart)
    })
  }

  handlerEmptyCart(){
    this.setState({
      cart: [],
    })
  }

  renderModalCart(){
    return(
      <Modal
      centered
      title="Cart"
      visible={this.state.showModalCart}
      onOk={this.handleOkCart}
      onCancel={this.handleCancelCart}
      >
      {(this.state.cart.length == 0)?
        <p>Your cart is Empty</p>:
        <div>
          {this.state.cart.map((product,index)=>{
            return(
              <div style={{ display: "flex", flexDirection: "row", margin: "30px" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img src={product.image}
                      style={{ height: "150px" }}></img>
                  <div style={{ margin: "20px", padding: "10px" }}>
                    <h2>{product.title}</h2>
                    <div style={{ fontSize: "12px" }}>
                      <strong>{product.qty} x ${product.price}</strong><br/>
                    </div>
                  </div>
                </div>
                <div
                  style={{ display:"flex", alignItems:"center", justifyContent:"flex-end"}}
                >
                  ${product.qty*product.price}
                </div>
              </div>
            )
          })
        }
        <Button onClick={()=>{this.handlerEmptyCart()}}>EmptyCart</Button>
        </div>
        }
    </Modal>
    )
  } 

  recalculateGrandTotal = () => {
    var grandTotal = 0.0, itemTotal = 0;
    
    this.state.cart.map((v) => {
      grandTotal += v.qty*v.price;
      itemTotal += v.qty;
    })

    this.setState({
      grandTotal,
      itemTotal,
    })
  }

  onChangeQty(value){
    this.setState({
      qty: value
    })
  }

  renderModalProduct(){
    return(
      <Modal
        centered
        title="Selected Product"
        visible={this.state.showModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.addtoCartHandler}>
            Add to Cart
          </Button>,
          <Button
            key="link"
            type="primary"
            onClick={this.handleCancel}
          >
            Cancel
          </Button>,
        ]}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img src={this.state.selectedProduct.image}
              style={{ height: "250px" }}></img>
          <div style={{ margin: "20px", padding: "10px" }}>
            <h2>{this.state.selectedProduct.title}</h2>
            <p style={{ fontSize: "12px", display: "block" }}>
              {this.state.selectedProduct.description}
              <strong>${this.state.selectedProduct.price}</strong>
            </p>
            <InputNumber min={1} defaultValue={1} onChange={(value) => {console.log("Number Value :",value); this.onChangeQty(value)}}/>
          </div>
        </div>
        
      </Modal>
    )
  }

  renderNavBar() {    
    const NavBar = styled.nav`
      width: 100vw;
      height: 70px;
      display: flex;
      position: fixed;
      top: 0;
      padding: 0;
      z-index: 3;
      justify-content: center;
      background: #1c4d86;
      align-items: center;
    `; 

    const Container = styled.div`
      color: white;
      width: 85%;
      margin-left: 0;
      display: flex;
      justify-content: space-between;
    `;

    const Left = styled.div`
      display: flex;
      margin: 0;
      flex: 2;
      justify-content: flex-start;
    `;

    const Right = styled.div`
      display: flex;
      flex: 2;
      justify-content: flex-end;
    `;

    return (
      <NavBar>
        <Container>
          <Left>
                Home
          </Left>
          <Right onClick={()=>this.setState({showModalCart: true})}>
            Carts - {this.state.cart.length == 0 ? `0 items` : `${this.state.itemTotal} items`} ($ {this.state.cart.length==0 ? '0' : this.state.grandTotal})
          </Right>
        </Container>
      </NavBar>
    );
  }

  render() {
    const Wrapper = styled.div`
      height: 100%;
      width: 100%;
    `;

    const Main = styled.main`
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - 70px);
    margin-top: 70px;
    padding-top: 20px;
    width: 100%;
    background: white;
    `;

    const Title = styled.h1`
      text-transform: uppercase;
      font-size: 50pt;
      font-weight: 700;
      text-align: center;
    `;

    const Products = styled.ul`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      flex-wrap: wrap;
      width: 75%;
    `

    return (
      <Wrapper>
        {this.renderNavBar()}
        <aside>
          {this.renderModalProduct()}
          {this.renderModalCart()}
        </aside>
        <Main>
        <Title>Product Catalogue</Title>
        <Products>
            {this.state.products.map((product, index) => {
              return (
                    <Product
                    key={product.id}
                    navigate={this.props.navigate}
                    id={product.id}
                    price={product.price}
                    name={product.title}
                    deskripsi={product.description}
                    image={product.image}
                    show={true}
                    onClick={()=>{this.showModal(product)}}
                    ></Product>
                    );
                  })
                }
        </Products>
      </Main>
      </Wrapper>
    );
  }

}
