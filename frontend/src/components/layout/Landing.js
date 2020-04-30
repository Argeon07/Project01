import React from 'react';

const Landing = () => {
    return (
      <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Serendipity</h1>
          <h3 className='lead'>Connected to the world!</h3>
          <p className="lead">
          Create your profile, and start being connected
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">Sign Up</a>
            <a href="login.html" className="btn btn-light">Login</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;