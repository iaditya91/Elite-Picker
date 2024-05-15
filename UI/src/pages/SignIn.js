import React, { useState, useContext } from "react";
import backgroundImage from '../images/background.jpg'
import { FaDna, FaEnvelope, FaLock } from "react-icons/fa";
import { triggerPostFormWithAuth } from "../api/axiosFunctions";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import AuthContext from "../authentication/AuthProvider";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const googleClientId = "515038645011-ffpplielrjghk5f632ukm28auk4mm4un.apps.googleusercontent.com";

  const navigate = useNavigate();

  const handleGoogleSignUpSuccessResponse = async (response) => {
    // Handle the successful Google signup response
    console.log(response);
    // Extract user information from the response
    const { googleId, profileObj } = response;
    const { email, name } = profileObj;
    const formData = new FormData();
    formData.append('username', email);
    formData.append('name', name);
    // const googleresponse = await triggerPostFormWithAuth("/api/googlesignin", formData);
    // Perform further actions with the user data (e.g., save to database, update state)
  };

  const handleGoogleLogoutSuccess = () => {
    console.log("logout successful");
  };

  const handleGoogleSignUpFailureResponse = (response) => {
    // Handle the failed Google signup response
    console.error(response);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSignIn = (e) => {
    navigate("/signup");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign-in request to the server
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      const response = await triggerPostFormWithAuth("/api/signin", formData);
      const { name, access_token } = response.data;
      console.log("access token: ", access_token, "name: ", name);
      setAuth({ access_token });
      navigate('/');

      // Reset form fields
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(()=> {
  //   function start(){
  //     gapi.client.init({
  //       clientId: googleClientId,
  //       scope: ""
  //     })
  //   };

  //   gapi.load('client:auth2', start)
  // });

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full opacity-95">
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center text-indigo-600">
          <span className="text-pink-500">Blood App</span>
          <FaDna className="text-pink-600 mx-2" /> {/* Blood drop icon */}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center border rounded bg-gray-100 px-3 py-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="bg-gray-100 w-full focus:outline-none"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border rounded bg-gray-100 px-3 py-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="bg-gray-100 w-full focus:outline-none"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            {'   '}

            <GoogleLogin
              clientId={googleClientId}
              buttonText="Google"
              onSuccess={handleGoogleSignUpSuccessResponse}
              onFailure={handleGoogleSignUpFailureResponse}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              redirectUri="postmessage"
            />
          </div>
        </form>
        <div></div>
        <div>
          No Account?{' '} <a className="text-blue-500 underline" href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
