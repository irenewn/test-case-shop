import React from "react";
import styled from "styled-components";

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

const LeftColumn = styled.div`
      display: flex;
      margin: 0;
      flex: 2;
      justify-content: flex-start;
      `;

const RightColumn = styled.div`
      display: flex;
      flex: 2;
      justify-content: flex-end;
      `;

export default function NavigationBar({onClick}){
    return (
        <NavBar>
            <Container>
                <LeftColumn>
                    Home
                </LeftColumn>
                <RightColumn onClick={onClick}>
                    Cart{/*{this.state.cart.length == 0 ? `0 items` : `${this.state.itemTotal} items`} ($ {this.state.cart.length==0 ? '0' : this.state.grandTotal}) */}
                </RightColumn>
            </Container>
      </NavBar>
    );
}   