import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./AddCarForm.css";
import { TextField } from "@mui/material";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import Swal from "sweetalert2";

const AddCarForm = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [isAddingUsedCar, setIsAddingUsedCar] = useState(false);
  const token = localStorage.getItem("token");
  const [carDetails, setCarDetails] = useState({
    make: "",
    model: "",
    year: "",
    colour: "",
    reg_number: "",
    image: "",
    amountperhr: Number,
  });
  const [usedCarDetails, setUsedCarDetails] = useState({
    make: "",
    model: "",
    type: "",
    transmission: "",
    year: "",
    colour: "",
    reg_number: "",
    description: "",
    amount: "",
    image: null
  });

  const HandelImgChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      image: file,
    }));
    setUsedCarDetails((prevDetails) => ({
      ...prevDetails,
      image: file,
    }));
  };

  console.log(usedCarDetails);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("make", carDetails.make);
    formData.append("model", carDetails.model);
    formData.append("year", carDetails.year);
    formData.append("colour", carDetails.colour);
    formData.append("reg_number", carDetails.reg_number);
    formData.append("amountperhr", carDetails.amountperhr);
    formData.append("image", carDetails.image);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/adminapi/rentalvehicles/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );

      message.success("Car Added Successfully");
      setCarDetails({
        make: "",
        model: "",
        year: "",
        colour: "",
        reg_number: "",
        image: null,
        amountperhr: 0,
      });
      navigate("/adminDashboard");
    } catch (error) {
      message.error("Car was Not Added");
      console.log(error);
    }
  };

  const handleAddUsedCars = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("make", usedCarDetails.make);
    formData.append("model", usedCarDetails.model);
    formData.append("type", usedCarDetails.type);
    formData.append("transmission", usedCarDetails.transmission);
    formData.append("year", usedCarDetails.year);
    formData.append("colour",usedCarDetails.colour);
    formData.append("reg_number", usedCarDetails.reg_number);
    formData.append("description", usedCarDetails.description);

    formData.append("amount", usedCarDetails.amount);
    formData.append("image", usedCarDetails.image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/adminapi/usedvehicles/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "A New Used Car Added",
        showConfirmButton: false,
        timer: 1500,
      });
      setUsedCarDetails({
      make: "",
      model: "",
      type: "",
      transmission: "",
      year: "",
      colour: "",
      reg_number: "",
      description: "",
      image: "",
      amount: "",
    });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Oops....",
        text: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleToggle = () => {
    setIsAddingUsedCar(!isAddingUsedCar);
    setCarDetails({
      make: "",
      model: "",
      year: "",
      colour: "",
      reg_number: "",
      image: null,
      amountperhr: 0,
    });
    setUsedCarDetails({
      make: "",
      model: "",
      type: "",
      transmission: "",
      year: "",
      colour: "",
      reg_number: "",
      description: "",
      image: "",
      amount: "",
    });
  };

  return (
    <>
      <div className="addCar-main">
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6} md={12} className=" pt-3 px-5 mb-5 addcar-card">
              <Card className="addcar-card2">
                <div className="add-car text-center mt-3">
                  <h2 className="add-car-head">
                    {isAddingUsedCar ? "Add Used Car" : "Add Rental Car"}
                  </h2>
                  <div className="px-3 mb-2">
                    <MDBBtn onClick={handleToggle} className="btn btn-parimary">
                      {isAddingUsedCar
                        ? "Switch to Add Rental Car"
                        : "Switch to Add Used Car"}
                    </MDBBtn>
                  </div>
                </div>
                {isAddingUsedCar ? (
                  <form
                    className="p-4 form-addcar"
                    onSubmit={handleAddUsedCars}
                  >
                    <TextField
                      id=""
                      label="Enter car make"
                      variant="filled"
                      fullWidth
                      className="mt-1 text-filed"
                      value={usedCarDetails.make}
                      onChange={(e) =>
                        setUsedCarDetails({
                          ...usedCarDetails,
                          make: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter car model"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      value={usedCarDetails.model}
                      onChange={(e) =>
                        setUsedCarDetails({
                          ...usedCarDetails,
                          model: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter year"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      type="number"
                      value={usedCarDetails.year}
                      onChange={(e) =>
                        setUsedCarDetails({
                          ...usedCarDetails,
                          year: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter colour"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      value={usedCarDetails.colour}
                      onChange={(e) =>
                        setUsedCarDetails({
                          ...usedCarDetails,
                          colour: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter Type"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      value={usedCarDetails.type}
                      onChange={(e) =>
                        setUsedCarDetails({
                          ...usedCarDetails,
                          type: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter transmission"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      value={usedCarDetails.transmission}
                      onChange={(e) =>
                        setUsedCarDetails({
                          ...usedCarDetails,
                          transmission: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter registration number"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      value={usedCarDetails.reg_number}
                      onChange={(e) =>
                        setUsedCarDetails({
                          ...usedCarDetails,
                          reg_number: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter description"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      multiline
                      value={usedCarDetails.description}
                      onChange={(e) =>
                        setUsedCarDetails({
                          ...usedCarDetails,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter amount"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      type="number"
                      value={usedCarDetails.amount}
                      onChange={(e) =>
                        setUsedCarDetails({
                          ...usedCarDetails,
                          amount: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      id=""
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      type="file"
                      onChange={HandelImgChange}
                      required
                    />

                    <div className="p-3">
                      <MDBBtn type="submit" className="btn btn-primary" block>
                        Add Used Car
                      </MDBBtn>
                    </div>
                  </form>
                ) : (
                  //Form for the rental car adding
                  <form className="p-4 form-addcar" onSubmit={handleSubmit}>
                    <TextField
                      id=""
                      label="Enter car make"
                      variant="filled"
                      fullWidth
                      className="mt-1 text-filed"
                      value={carDetails.make}
                      onChange={(e) =>
                        setCarDetails({ ...carDetails, make: e.target.value })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter car model"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      value={carDetails.model}
                      onChange={(e) =>
                        setCarDetails({ ...carDetails, model: e.target.value })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter year"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      type="number"
                      value={carDetails.year}
                      onChange={(e) =>
                        setCarDetails({ ...carDetails, year: e.target.value })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter colour"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      value={carDetails.colour}
                      onChange={(e) =>
                        setCarDetails({ ...carDetails, colour: e.target.value })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter registration number"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      value={carDetails.reg_number}
                      onChange={(e) =>
                        setCarDetails({
                          ...carDetails,
                          reg_number: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      id=""
                      label="Enter amount per hour"
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      type="number"
                      value={carDetails.amountperhr}
                      onChange={(e) =>
                        setCarDetails({
                          ...carDetails,
                          amountperhr: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      id=""
                      variant="filled"
                      fullWidth
                      className="mt-3 text-filed"
                      type="file"
                      onChange={HandelImgChange}
                      required
                    />

                    <div className="mt-4">
                      <MDBBtn type="submit" className="btn btn-primary" block>
                        Add Rental Car
                      </MDBBtn>
                    </div>
                  </form>
                )}
              </Card>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddCarForm;
