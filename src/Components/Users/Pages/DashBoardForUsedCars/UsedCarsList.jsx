import React, { useEffect, useState } from "react";
import { Col, Pagination } from "react-bootstrap";
import { MDBCardBody, MDBListGroupItem } from "mdb-react-ui-kit";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const UsedCarsList = () => {
  const [availableCars, setAvailableCars] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 4;

  useEffect(() => {
    AOS.init({ duration: 1500 });
    getAvailableCars();
  }, []);

  const getAvailableCars = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const response = await axios.get(
        `http://127.0.0.1:8000/customerapi/usedvehicles/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setAvailableCars(response.data);
    }
  };
  console.log(availableCars);
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  if (availableCars === null) return <></>;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = availableCars.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(availableCars.length / itemsPerPage);

  const handlePrevPage = () => {
    setActivePage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setActivePage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      <div className=" cards-main container-fluid">
        <div className="text-black   row card-div">
          <h1 className="userCard-heading text-center mt-5" data-aos="fade-right"> -Used-Cars </h1>
          {currentItems.map((item) => (
            <Col
              md={6}
              lg={3}
              className="mt-5 mb-2 p-4"
              
              key={item.id}
            >
              <div className="p-2 cards-cars" data-aos="zoom-in">
                {/* Your existing card content */}
                <img
                  position="top"
                  alt="..."
                  src={`http://127.0.0.1:8000${item.image}`}
                  width={"100%"}
                  height={"260px"}
                />
                <MDBCardBody className="mb-2">
                  <h4 className="my-4">
                    {item.make} : {item.model}
                  </h4>
                </MDBCardBody>
                <MDBListGroupItem>
                  <b>Year:</b> {item.year}
                </MDBListGroupItem>
                <hr />
                <MDBListGroupItem>
                  <b>Engine:</b> {item.type}
                </MDBListGroupItem>
                <hr />
                <MDBListGroupItem>
                  <b>Transmission:</b> {item.transmission}
                </MDBListGroupItem>
                <hr />
                <MDBListGroupItem>
                  <b>Price:</b> {item.amount} &#8377;
                </MDBListGroupItem>
                <hr />
                <MDBListGroupItem>
                  <b>Car Description :</b> {item.description}
                </MDBListGroupItem>
                <MDBCardBody>
                  <hr />
                  <Link to={`/UsedCars/Payment/${item.id}`}>
                    {" "}
                    <button className="btn btn-white mb-2">Buy Now</button>
                  </Link>
                </MDBCardBody>
              </div>
            </Col>
          ))}
          <Pagination className="justify-content-center ">
            <Pagination.Prev
              className=" "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.553)" }}
              onClick={handlePrevPage}
              disabled={activePage === 1}
            />
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                style={{ backgroundColor: "rgba(255, 255, 255, 0.553)" }}
                key={page + 1}
                active={page + 1 === activePage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              className=" text-white"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.553)" }}
              onClick={handleNextPage}
              disabled={activePage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default UsedCarsList;
