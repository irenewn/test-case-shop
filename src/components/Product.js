import React from "react";
import rokok from "../assets/image/rokok.png";
import styled from "styled-components";

const Image = styled.img`
  width: 200px;
  height: 250px;
  min-height: 250px;
`;

const Wrapper = styled.li`
  width: 200px;
  height: 300px;
  margin: 30px;
  display: flex;
  flex-direction: column-reverse;

  margin: 30px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  text-align: center;
  min-height: 150px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: large;
`;

export default function Product({ name, image, onClick }) {
  return (
    <Wrapper>
      <Title>
        <b>{name}</b>
      </Title>
      <Image
        src={image == null ? rokok : image}
        onClick={onClick}
        alt="product"
      />
    </Wrapper>
  );
}
