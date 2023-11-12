// AboutPage.jsx
import React from "react";
import "./AboutPage.scss";
import NavBar from "../../components/navbar/NavBar";

const AboutPage = () => {
 const data = [
   {
     title: "User Authentication",
     description: [
       "Enable users to sign up and create accounts.",
       "Allow users to log in using their email and password.",
       "Utilize CryptoJS for additional encryption of user passwords.",
     ],
   },
   {
     title: "Browse Functionality",
     description: [
       "Facilitate exploration of movies or TV shows based on specific criteria.",
       "Implement categorization features for organizing content based on user preferences.",
     ],
   },
   {
     title: "Detailed Viewing",
     description: [
       "Provide detailed information about movies or TV shows for user reference.",
       "Allow users to add items to a personal list for future viewing.",
     ],
   },
   {
     title: "List Management",
     description: [
       "Enable users to create and manage a personal watchlist.",
       "Allow users to mark movies or TV shows as watched for tracking purposes.",
     ],
   },
   {
     title: "Search Functionality",
     description: [
       "Implement a robust search feature for finding movies or TV shows by name.",
       "Enhance user experience with efficient and accurate search results.",
     ],
   },
   {
     title: "Watch Later",
     description: [
       "Introduce the ability for users to add a particular movie to their personal watchlist.",
       "Enhance future planning for users by incorporating this feature.",
     ],
   },
   {
     title: "Like and Dislike",
     description: [
       "Allow users to express their preference by liking or disliking content.",
       "Implement intuitive like and dislike buttons for user interaction.",
     ],
   },
   {
     title: "State Management with Redux Toolkit",
     description: [
       "Utilize Redux Toolkit for efficient state management in the application.",
       "Persist user authentication token using Redux for a seamless user experience.",
     ],
   },
   {
     title: "HTTP Requests with Axios",
     description: [
       "Handle HTTP requests in the application using Axios.",
       "Streamline communication with the server for data retrieval and updates.",
     ],
   },
   {
     title: "Express Framework for Backend",
     description: [
       "Implement the backend of the application using the Express framework.",
       "Leverage Express to handle server-side logic and routing.",
     ],
   },
 ];
  return (
    <>
      <NavBar />
      <div className="about-page">
        <div className="container">
          <h1>About Us</h1>

          <section>
            <h2>Features</h2>
            {data.map((item, i) => (
              <div className="feature-wrapper" key={i}>
                <h3>{item.title}</h3>
                <p>○ {item.description[0]}</p>
                <p>○ {item.description[1]}</p>
              </div>
            ))}
          </section>

          <div className="wrapper_Info">
            <section>
              <h2>Origin</h2>
              <p>
                This project collects movie information using TMDB API. As a
                source for retrieving detailed data about movies, including
                titles, descriptions, ratings, and more...
              </p>
            </section>

            <section>
              <h2>Copyrights</h2>
              <p>
                © 2023 All rights reserved.This is a personal project created by
                Ranjith. All rights to the content and design are reserved.
              </p>
            </section>

            <section>
              <h2>Terms and Conditions</h2>
              <p>
                By using our services, you agree to our terms and conditions.
              </p>
            </section>

            <section>
              <h2>Help Desk</h2>
              <p>
                If you have any questions or need assistance, please contact our
                help desk at ranjithmahesh1997@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
