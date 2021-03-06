import React from "react";
import Head from "next/head";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [fullname, setFullname] = React.useState("");

  const recaptchaRef = React.createRef();

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Execute the reCAPTCHA when the form is submitted
    recaptchaRef.current.execute();
  };

  const onReCAPTCHAChange = async (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch("/api/register/oldregister", {
        method: "POST",
        body: JSON.stringify({ email, captcha: captchaCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If the response is ok than show the success alert
        alert("Email registered successfully");
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error?.message || "Something went wrong");
    } finally {
      // Reset the reCAPTCHA when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.

      recaptchaRef.current.reset();
      setEmail("");
      alert("It passed");
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Register for PVAR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="feedback-form">
        <p>&nbsp;</p>
        <p>&nbsp;</p>

        <h2>Captcha Register for PVAR</h2>
        <p>&nbsp;</p>
        <p>&nbsp;</p>

        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V2}
              onChange={onReCAPTCHAChange}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              type="text"
              name="fullname"
              placeholder="Full Name (First and Last)"
            />
            <p>&nbsp;</p>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              required
              type="email"
              name="email"
              placeholder="Email"
            />
            <p>&nbsp;</p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
            />
            <p>&nbsp;</p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              placeholder="Type Password Again"
            />
            <p>&nbsp;</p>

            <p>&nbsp;</p>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
