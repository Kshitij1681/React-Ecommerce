import React, { useState } from "react";
import styled from "styled-components";

const MyImage = ({ img = [{ url: "", filename: "not_exist" }] }) => {
  // console.log("🚀 ~ file: MyImage.jsx:5 ~ MyImage ~ img:", img);

  const [mainImage, setMainImage] = useState(img[0]);

  return (
    <Wrapper>
      <div className="grid grid-four-column">
        {img.map((curr, index) => {
          return (
            <figure key={index}>
              <img
                src={curr.url}
                alt={curr.filename}
                className="box-image--style"
                onClick={() => {
                  setMainImage(curr);
                }}
              />
            </figure>
          );
        })}
      </div>

      {/* 2nd Column */}
      <div className="main-screen">
        <img src={mainImage.url} alt={mainImage.filename} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 4rem;

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    /* order: 2; */

    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      border-radius: 1rem;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: auto;
      border-radius: 1rem;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default MyImage;
