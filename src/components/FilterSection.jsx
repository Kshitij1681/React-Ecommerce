import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filterContext";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "./../Helpers/FormatPrice";
import { Button } from "../styles/Button";

const FilterSection = () => {
  const {
    filters: { text, category, color, price, maxPrice, minPrice },
    all_products,
    updateFilterValue,
    clearFilters,
  } = useFilterContext();

  // Extract unique properties of each field
  const getUniqueData = (data, property) => {
    let newVal = data.map((curr) => {
      return curr[property];
    });

    if (property === "colors") {
      // return ["all", ...new Set([].concat(...newVal))];
      newVal = newVal.flat();
    }

    newVal = ["all", ...new Set(newVal)];
    // // console.log("🚀 ~ file: FilterSection.jsx:19 ~ getUniqueData ~ newVal:", newVal);

    return newVal;
  };

  // Get unique data
  const categoryOnlyData = getUniqueData(all_products, "category");

  const companyData = getUniqueData(all_products, "company");

  const colorData = getUniqueData(all_products, "colors");
  // console.log("🚀 ~ file: FilterSection.jsx:34 ~ FilterSection ~ colorData:", colorData);

  return (
    <Wrapper>
      <div className="filter-search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input type="text" name="text" value={text} onChange={updateFilterValue} placeholder="SEARCH" autoComplete="off" />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryOnlyData.map((curr, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curr}
                onClick={updateFilterValue}
                className={curr === category ? "active" : ""}
              >
                {curr}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>
        <form action="#">
          <select name="company" id="company" className="filter-company--select" onChange={updateFilterValue}>
            {companyData.map((curr, index) => {
              return (
                <option key={index} value={curr} name="company">
                  {curr}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-color-style">
          {colorData.map((curr, index) => {
            if (curr === "all") {
              return (
                <button key={index} type="button" name="color" value={curr} onClick={updateFilterValue} className="color-all--style">
                  All
                </button>
              );
            }

            return (
              <button
                key={index}
                type="button"
                name="color"
                value={curr}
                onClick={updateFilterValue}
                style={{ backgroundColor: curr }}
                className={color === curr ? "btnStyle active" : "btnStyle"}
              >
                {color === curr ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input type="range" name="price" min={minPrice} max={maxPrice} value={price} onChange={updateFilterValue} />
      </div>

      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    ${"" /* font-size: 1rem; */}
    width: inherit;
    height: inherit;
    border-radius: inherit;
    transform: scale(0.5);
    color: #fff;
  }

  .filter-price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
    font-size: 1.3rem;
    letter-spacing: 0.1rem;
    font-weight: light;
  }
`;

export default FilterSection;
