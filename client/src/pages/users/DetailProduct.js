import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import convertRupiah from "rupiah-format";

import Navbar from "../../components/Navbar";

// Import useQuery and useMutation
import { useQuery, useMutation } from "react-query";

// API config
import { API } from "../../config/api";

export default function DetailProduct() {
  let history = useHistory();
  let { id } = useParams();
  let api = API();

  // Fetching product data from database
  let { data: product, refetch } = useQuery("Cache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/product/" + id, config);
    return response.data;
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-JqddhaogEh1SIGf4";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async () => {
    try {
      // Get data from product
      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        price: product.price,
      };

      // Data body
      const body = JSON.stringify(data);

      // Configuration
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
        body,
      };

      // Insert transaction data
      const response = await api.post("/transaction", config);
      console.log(response);
      const token = response.payment.token;

      window.snap.pay(token, {
        onSuccess: function (result) {

          console.log(result);
          history.push("/profile");
        },
        onPending: function (result) {

          console.log(result);
          history.push("/");
        },
        onError: function (result) {

          console.log(result);
        },
        onClose: function () {

          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Navbar />
      <Container className="py-sm-5 pt-3">
        <Row>
          <Col md="2"></Col>
          <Col md="3" className="detail-product-img">
            <img src={product?.image} className="img-fluid detail-img" />
          </Col>
          <Col md="5">
            <div className={`text-header-product-detail ${(product?.name.length > 19) ? "detail-title": product?.name}`}>{product?.name}</div>
            <div className="text-content-product-detail">
              Stock : {product?.qty}
            </div>
            <p className="text-content-product-detail detail-product-desc mt-4">{product?.desc}</p>
            <div className="text-price-product-detail text-end mt-sm-4">
              {convertRupiah.convert(product?.price)}
            </div>
            <div className="d-grid gap-2 mt-sm-5 my-4">
              <button
                onClick={() => handleBuy.mutate()}
                className="btn btn-buy"
              >
                Buy
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
