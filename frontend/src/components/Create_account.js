import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Create() {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [company, setCompany] = useState('');
  const [telephone, setTelephone] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastName] = useState('');
  const [birth_date, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/User/signup",
        { username, password, company, telephone, first_name, last_name, birth_date, email },
        {
          withCredentials: true,
        }
      );
      setMessage("Account created successfully.");
      router.push("/GamePage");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container">
      <h1>Create an Account</h1>
      <form onSubmit={handleSignup}>
        {step === 1 && (
          <div className="step" id="step1">
            <h2><span className="step-number">1</span> Email Address</h2>
            <p>Please use your company email address to create your account.</p>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="error-message">Please enter a valid email address</p>
            <button type="button" onClick={handleNextStep}>CONTINUE</button>
          </div>
        )}
        {step === 2 && (
          <div className="step" id="step2">
            <h2><span className="step-number">2</span> Basic Access</h2>
            <label htmlFor="birth-date">Birth Date</label>
            <input
              type="date"
              id="birth-date"
              required
              value={birth_date}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <span className="error-message">This field is required</span>
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              required
              value={first_name}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <span className="error-message">This field is required</span>
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              required
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
            <span className="error-message">This field is required</span>
            <button type="button" onClick={handlePrevStep}>BACK</button>
            <button type="button" onClick={handleNextStep}>CONTINUE</button>
          </div>
        )}
        {step === 3 && (
          <div className="step" id="step3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="error-message">This field is required</span>
            <label htmlFor="company-name">Company Name</label>
            <input
              type="text"
              id="company-name"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              required
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
            <button type="button" onClick={handlePrevStep}>BACK</button>
            <button type="button" onClick={handleNextStep}>CONTINUE</button>
          </div>
        )}
        {step === 4 && (
          <div className="step" id="step4">
            <h2><span className="step-number">4</span> Create Password</h2>
            <ul>
              <li>15 Character Minimum Password Length</li>
              <li>Passphrase recommended - we recommend your password include 3 or more words</li>
              <li>It is not necessary to use capital letters, numbers, or special characters unless that is your preference</li>
              <li>PASSWORD MUST NOT CONTAIN:</li>
              <ul>
                <li>Your first name</li>
                <li>Your last name</li>
                <li>Your email address</li>
              </ul>
            </ul>
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="error-message">This field is required</span>
            <label htmlFor="confirm-password">Retype Password</label>
            <input type="password" id="confirm-password" name="confirm-password" className="password-input" />
            <label htmlFor="terms-checkbox">
              <input type="checkbox" id="terms-checkbox" name="terms-checkbox" required /> I agree to the Terms and Conditions and Privacy Policy.
            </label>
            <button type="button" onClick={handlePrevStep}>BACK</button>
            <button type="submit">CONTINUE</button>
            {message && <p className="mt-4 text-red-600">{message}</p>}
          </div>
        )}
      </form>
    </div>
  );
}
