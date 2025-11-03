import React, { useState } from "react";
import { postJSON } from "../api";
import { useNavigate } from "react-router-dom";

export default function SignIn({ onAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { ok, status, data } = await postJSON("/api/login/", form);
    setLoading(false);

    if (ok) {
      const userData = {
        email: data?.email || form.email,
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
      };

      if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      }
      if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token);
      }

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authUser", JSON.stringify(userData));

      if (onAuth) onAuth(userData); // ✅ update parent state
      navigate("/");
    } else {
      setError(data?.error || `Login failed (${status})`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h3 className="mb-4 text-center">Sign In</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="input-group mb-4">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>

        <button className="btn btn-success w-100" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}











// import React, { useState } from "react";
// import { postJSON } from "../api";
// import { useNavigate } from "react-router-dom";

// export default function SignIn({ onAuth }) {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const { ok, status, data } = await postJSON("/api/login/", form);
//     setLoading(false);

//     if (ok) {
//       // For now, backend returns a simple message. We'll use localStorage to keep a flag.
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("authUser", form.username);
//       if (onAuth) onAuth({ username: form.username });
//       navigate("/");
//     } else {
//       setError((data && data.error) ? data.error : `Login failed (${status})`);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: 420 }}>
//       <h3 className="mb-4">Sign In</h3>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <input name="username" className="form-control mb-3" placeholder="Username" value={form.username} onChange={handleChange} required />
//         <input name="password" type="password" className="form-control mb-3" placeholder="Password" value={form.password} onChange={handleChange} required />
//         <button className="btn btn-success w-100" type="submit" disabled={loading}>
//           {loading ? "Signing in..." : "Sign In"}
//         </button>
//       </form>
//     </div>
//   );
// }







// import React, { useState } from "react";

// function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Sign-in:", email, password);
//     // Later: validate with Django and get JWT token
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "400px" }}>
//       <h3 className="text-center mb-4">Sign In</h3>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           className="form-control mb-3"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="form-control mb-3"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="btn btn-success w-100">
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignIn;
