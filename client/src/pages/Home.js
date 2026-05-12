import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

const Home = () => {
  return (
    <div style={{ paddingBottom: "40px" }}>
      {/* Hero Section */}
      <section 
        className="auth-card" 
        style={{ 
          margin: "40px auto", 
          maxWidth: "860px", 
          padding: "60px 20px", 
          textAlign: "center" 
        }}
      >
        <h1 className="auth-title" style={{ fontSize: "2.8rem", marginBottom: "20px" }}>
          Keep Track of Your <br />
          <span style={{ color: "white" }}>Income & Expenses</span>
        </h1>
        
        <p 
          className="auth-subtitle" 
          style={{ 
            margin: "0 auto 30px", 
            maxWidth: "600px", 
            fontSize: "1.1rem", 
            lineHeight: "1.6" 
          }}
        >
          Expenses Manager is a user-friendly finance management application that allows you to seamlessly track your transactions, categorize your spending, and analyze your financial habits.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "40px" }}>
          <Link to="/login" className="btn btn-primary" style={{ padding: "12px 30px", fontSize: "1.05rem" }}>
            Get Started
          </Link>
          <Link to="/register" className="btn btn-primary" style={{ padding: "12px 30px", fontSize: "1.05rem" }}>
            Create Account
          </Link>
        </div>
        
        <div 
          className="panel" 
          style={{ 
            margin: "0 auto", 
            maxWidth: "400px", 
            background: "var(--surface-2)", 
            textAlign: "left" 
          }}
        >
          <h2 className="panel-title" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "10px", marginBottom: "16px" }}>
            Admin Login (Demo)
          </h2>
          <div className="muted" style={{ fontSize: "0.95rem" }}>
            <p style={{ marginBottom: "8px" }}><strong style={{ color: "var(--text)" }}>Username:</strong> admin@gmail.com</p>
            <p style={{ margin: "0" }}><strong style={{ color: "var(--text)" }}>Password:</strong> 12345</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer 
        className="panel" 
        style={{ 
          margin: "0 auto", 
          maxWidth: "860px", 
          padding: "30px",
          textAlign: "left"
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "space-between" }}>
          
          <div style={{ flex: "1 1 250px" }}>
            <h6 className="panel-title" style={{ marginBottom: "16px" }}>
              <i className="fas fa-gem" style={{ color: "var(--primary)", marginRight: "8px" }}></i> 
              Expenses Tracker
            </h6>
            <p className="muted" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              A seamless finance management application to help you keep track of your transactions, categorize your spending, and get deep analysis of your spending habits.
            </p>
          </div>

          <div style={{ flex: "1 1 150px" }}>
            <h6 className="panel-title" style={{ marginBottom: "16px" }}>Useful Links</h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link to="/login" className="auth-link" style={{ fontSize: "0.9rem", color: "white" }}>Login</Link>
              <Link to="/register" className="auth-link" style={{ fontSize: "0.9rem", color: "white" }}>Register</Link>
              <a href="#!" className="auth-link" style={{ fontSize: "0.9rem", color: "white" }}>Pricing</a>
              <a href="#!" className="auth-link" style={{ fontSize: "0.9rem", color: "white" }}>Help</a>
            </div>
          </div>

          <div style={{ flex: "1 1 200px" }}>
            <h6 className="panel-title" style={{ marginBottom: "16px" }}>Contact Us</h6>
            <ul className="muted" style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><i className="bi bi-house" style={{ color: "var(--primary)", marginRight: "8px" }}></i> Hyderabad, Telangana, India</li>
              <li><i className="bi bi-envelope" style={{ color: "var(--primary)", marginRight: "8px" }}></i> expensemanager@gmail.com</li>
              <li><i className="bi bi-telephone" style={{ color: "var(--primary)", marginRight: "8px" }}></i> 80783-2213314</li>
            </ul>
          </div>

        </div>

        <div className="auth-divider" style={{ margin: "24px 0" }}></div>
        
        <div className="muted" style={{ fontSize: "0.85rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <span>© {new Date().getFullYear()} Expensemanager.com. All rights reserved.</span>
          <div style={{ display: "flex", gap: "16px", fontSize: "1.1rem" }}>
            <a href="#!" className="auth-link"><i className="bi bi-twitter"></i></a>
            <a href="#!" className="auth-link"><i className="bi bi-instagram"></i></a>
            <a href="#!" className="auth-link"><i className="bi bi-facebook"></i></a>
            <a href="#!" className="auth-link"><i className="bi bi-github"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;