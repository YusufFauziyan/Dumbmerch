import react from "react";
import Masonry from "react-masonry-css";
import { Container, Row, Col } from "react-bootstrap";

import Navbar from "../../components/Navbar";
import ProductCard from "../../components/card/ProductCard";

import imgEmpty from "../../assets/empty.svg";

import { useQuery } from "react-query";
import { API } from "../../config/api";

export default function Product() {
  let api = API();

  const title = "Shop";
  document.title = "DumbMerch | " + title;

  // Fetching product data from database
  let { data: products } = useQuery("productsCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/products", config);
    return response.data;
  });

  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    700: 3,
    500: 2,
  };

  return (
    <div>
      <Navbar title={title} />
      <Container className="mt-sm-5 my-3">
        <Row>
          <Col>
            <div className="text-header-product">Product</div>
          </Col>
        </Row>
        <Row className="my-sm-4 my-3 ">
          {products?.length != 0 ? (
            <div className="d-flex gap-sm-3 gap-2 card-products">
              {products?.map((item, index) => (
                <ProductCard item={item} index={index} />
              ))}
            </div>
          ) : (
            <Col>
              <div className="text-center pt-5">
                <img
                  src={imgEmpty}
                  className="img-fluid"
                  style={{ width: "40%" }}
                />
                <div className="mt-3">No data product</div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}