import React from 'react';
import './StoreSearch.scss';
import styled from 'styled-components';

const StoreCard = ({ item }) => {
  const { title, addr1, firstimage, tel } = item;
  return (
    <div className="store-card-container">
      <StoreImg firstimage={firstimage} />
      <div className="store-text">
        <h2>{title}</h2>
        <div>{`☎: ${tel}`}</div>
        <div className="store-summary-row">
          <h5>{`주소: ${addr1}`}</h5>
        </div>
      </div>
    </div>
  );
};

const StoreImg = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.firstimage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 111 !important;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, rgba(0, 0, 0, 1)),
    color-stop(0.35, rgba(0, 0, 0, 1)),
    color-stop(0.5, rgba(0, 0, 0, 1)),
    color-stop(0.65, rgba(0, 0, 0, 1)),
    color-stop(0.85, rgba(0, 0, 0, 0.6)),
    color-stop(1, rgba(0, 0, 0, 0))
  );
  position: relative;
`;

export default StoreCard;
