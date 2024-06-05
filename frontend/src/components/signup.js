// components/RegisterBox.js
import React from 'react';
import { useRouter } from "next/router";

const RegisterBox = () => {
  const router = useRouter();

  const handleCreateAccountClick = (event) => {
      event.preventDefault();
      router.push('/Create');
  };

  return (
    <div className="register-box">
      <h2>New User?</h2>
      <h3>Create an Account</h3>
      <ul>
        <li>Personalize your experience <br />information, services, support and more.</li>
        <li>Manage your e-communications<br /> subscription preferences.</li>
        <li>Manage your user profile.</li>
      </ul>
      <form onSubmit={handleCreateAccountClick}>
        <div className="button-group">
          <button type="submit">Create an Account</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterBox;