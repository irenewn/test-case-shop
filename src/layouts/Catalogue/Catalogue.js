import React, {Component } from "react";
import Product from "../../components/Product";
import { ProductApi } from "../../api";
import { Modal, Button, InputNumber, Input } from "antd";
import 'antd/dist/antd.css';

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
    cart: []
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
      this.setState({ loading: false, showModal: false, selectedProduct: {} });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ showModal: false, selectedProduct: {} });
  };

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
            <div><b>{this.state.selectedProduct.title}</b></div>
            <div style={{ fontSize: "12px" }}>
              {this.state.selectedProduct.description}<br/>
              <b>${this.state.selectedProduct.price}</b><br/>
            </div>
            <div>
              <InputNumber min={1} defaultValue={1} />
            </div>
          </div>
        </div>
        
      </Modal>
    )
  }

  renderNavBar() {
    const { navigate } = this.props;
    return (
      <section className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <ul className={this.state.menuOpened ? "active" : "none"}>
              <li
                onClick={() => {
                  navigate("/");
                  this.handleMenuOpen();
                }}
              >
                Home
              </li>
            </ul>
          </div>
          <div className="navbar-right">
            Cart
          </div>
        </div>
      </section>
    );
  }

  render() {
    return (
      <main className="main-layout full-size">
        {this.renderNavBar()}
        <section className="section-katalog">
        <div className="section-title">Katalog Produk</div>
        <div className="section-content">
        {this.renderModalProduct()}
          <div className="products">
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
          </div>
        </div>
      </section>
      </main>
    );
  }

}
