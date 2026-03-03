import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const LoginPopup = () => {
  const { setShowLogin, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (currState === "Forgot") {
      // Simulate sending reset email
      setResetEmailSent(true)
      setTimeout(() => {
        setResetEmailSent(false)
        setCurrState("Login")
      }, 3000)
      return
    }
    // Simulate login - in real app, call API here
    const fakeToken = "user_" + Date.now()
    setToken(fakeToken)
    localStorage.setItem("token", fakeToken)
    setShowLogin(false)
  }

  const getHeaderText = () => {
    switch(currState) {
      case "Login": return "Login with your account"
      case "Sign Up": return "Create your account"
      case "Forgot": return "Reset your password"
      default: return ""
    }
  }

  return (
    <div className='login-popup'>
      <div className="login-area">
        <div className="login-form">
          <div className="login-header">
            <img src={assets.logo} alt="Logo" />
            <p>{getHeaderText()}</p>
            <span className="close-btn" onClick={() => setShowLogin(false)}>×</span>
          </div>
          <form onSubmit={onSubmit}>
            {currState === "Sign Up" && (
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="form-control" 
                  placeholder="Your Name"
                  value={data.name}
                  onChange={onChangeHandler}
                  required
                />
              </div>
            )}
            
            {currState === "Forgot" ? (
              <>
                {resetEmailSent ? (
                  <div className="reset-success">
                    <div className="success-icon">✓</div>
                    <p>Password reset link has been sent to your email!</p>
                  </div>
                ) : (
                  <>
                    <p className="forgot-desc">Enter your email address and we'll send you a link to reset your password.</p>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        className="form-control" 
                        placeholder="Your Email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <button type="submit" className="theme-btn">
                      Send Reset Link
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control" 
                    placeholder="Your Email"
                    value={data.email}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password"
                    className="form-control" 
                    placeholder="Your Password"
                    value={data.password}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                {currState === "Login" && (
                  <div className="form-options">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Remember Me
                      </label>
                    </div>
                    <span className="forgot-pass" onClick={() => setCurrState("Forgot")}>Forgot Password?</span>
                  </div>
                )}
                {currState === "Sign Up" && (
                  <div className="form-check terms-check">
                    <input className="form-check-input" type="checkbox" id="terms" required />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the <a href="#">Terms & Conditions</a>
                    </label>
                  </div>
                )}
                <button type="submit" className="theme-btn">
                  {currState === "Login" ? "Login" : "Register"}
                </button>
              </>
            )}
          </form>
          <div className="login-footer">
            {currState === "Forgot" ? (
              <p>Remember your password? <span onClick={() => setCurrState("Login")}>Back to Login</span></p>
            ) : currState === "Login" ? (
              <p>Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Register.</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login.</span></p>
            )}
            {currState !== "Forgot" && (
              <div className="social-login">
                <span className="social-divider">or</span>
                <p>Continue with social media</p>
                <div className="social-login-list">
                  <a href="#" className="fb-auth">
                    <i className="fb-icon"></i> Facebook
                  </a>
                  <a href="#" className="gl-auth">
                    <i className="gl-icon"></i> Google
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPopup
