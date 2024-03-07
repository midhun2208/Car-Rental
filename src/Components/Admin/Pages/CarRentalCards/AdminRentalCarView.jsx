import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MDBTable, MDBTableBody } from "mdb-react-ui-kit";
import Swal from "sweetalert2";


const AdminRentalCarView = () => {
  const { id } = useParams();
  const [rentalCarData, setRentalCarData] = useState(null);
  const token = localStorage.getItem("token");

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/adminapi/rentalvehicles/${id}/make_active/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Status Changed",
        showConfirmButton: false,
        timer: 1500,
      });
      rentalCarDataAdmin();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    rentalCarDataAdmin();
  }, []);

  const rentalCarDataAdmin = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/adminapi/rentalvehicles/${id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setRentalCarData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  if (rentalCarData == null) return <div><h2 className="text-center mt-5">You Have Not Rental Purchase Till Now......</h2></div>;
  return (
    <>
      <Container className="border border-black p-4 mt-5 shadow-lg">
        <Row>
          <Col lg={12} md={12} p-5>
            <h2 className="text-black text-center">Rental Car Detail</h2>
            <Row>
              <div className="text-end me-4">
                <Link to={'/adminDashboard'}><button className="btn btn-primary ">Back to home <i class="fa-solid fa-arrow-left ms-1"></i></button></Link>
              </div>
              <Col className="mb-5 p-5 my-4" lg={3} md={12}>
                <img
                  src={`http://127.0.0.1:8000${rentalCarData?.image}`}
                  alt=""
                  className="rounded-lg"
                />
              </Col>
              <Col className="   p-5" lg={7} md={12}>
                <MDBTable hover className="mt-3 border border-e-gray-800">
                  <MDBTableBody>
                    <tr>
                      <td>
                        <h4>{rentalCarData?.make}</h4>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>{rentalCarData?.model}</h4>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>{rentalCarData?.reg_number}</h4>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>
                          <Form>
                            <Form.Check
                              type="switch"
                              id=""
                              label={
                                rentalCarData?.rental_status === "Available"
                                  ? "Available 🟢"
                                  : "Not Available 🔴"
                              }
                              disabled={
                                rentalCarData?.rental_status === "Available"
                              }
                              onChange={handleSwitchChange}
                              checked={
                                rentalCarData?.rental_status === "Available"
                              }
                            />
                          </Form>
                        </h4>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>{rentalCarData?.amountperhr} Rs/hr</h4>
                      </td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminRentalCarView;

//
