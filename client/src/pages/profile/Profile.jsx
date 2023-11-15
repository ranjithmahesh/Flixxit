import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import "./Profile.scss";

function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const plans = [
    {
      name: "Basic",
      description:
        "Access to the full Netflix library on one device in standard definition.",
      price: "$9.99/month",
      button: "Subscribe Basic",
    },
    {
      name: "Standard",
      description:
        "Watch on two devices at the same time in high definition when available.",
      price: "$13.99/month",
      button: "Subscribe Standard",
    },
    {
      name: "Premium",
      description:
        "Watch on four devices at the same time in high definition when available. Includes Ultra HD where available.",
      price: "$16.99/month",
      button: "Subscribe Premium",
    },
  ];

  const handleStripePayment = async (name, price) => {
    //  const stripe = await loadStripe(
    //    "pk_test_51NuoosSFOUlnbJJFkXLr7QQBqlhYJblswLqlX7d7sTyHy5dWzojwiSnSsGblh56enyGcRaFYN3FEelEnRPtsoiYd00DKQpqbfY"
    //  );
  };

  return (
    <div className="profile_container">
      <NavBar />
      <div className="profile1">
        <div className="container">
          <h1 className="title">Profile</h1>
          <div className="profile_reper">
            <div className="profile_left">
              <img
                src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
              />
            </div>
            <div className="profile_right">
              <h1>{user.email}</h1>
              <h2>Plans</h2>
              {plans.map((item, i) => (
                <div className="plansTable" key={i}>
                  <div className="planeTitle table_content">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="planedes table_content">
                    <p>{item.description}</p>
                  </div>
                  <div className="planePrice table_content">
                    <h3>{item.price}</h3>
                  </div>
                  <div className="planeButton">
                    <button
                      onClick={() => handleStripePayment(item.name, item.price)}
                    >
                      {item.button}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
