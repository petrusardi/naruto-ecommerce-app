import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleCredentialResponse(response) {
    const googleToken = response.credential;
    try {
      let res = await axios.post("http://localhost:3000/login/google", { googleToken });
      let { data } = res;
      localStorage.setItem("token", data.access_token)
      navigate("/store")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "830526763865-jbqre9ju3t1280rn78eemcsgvppqgdbd.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt();
  }, []);

  const handleLogin = async (el) => {
    el.preventDefault();

    try {
      let res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log(res);
      let { data } = res;
      localStorage.setItem("token", data.access_token);
      navigate("/store");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex px-4 py-8 md:py-32 flex-col md:flex-row text-slate-900 dark:text-slate-100 items-center bg-white dark:bg-slate-900">
        <figure className="w-full">
          <img
            src="https://img.freepik.com/free-photo/charming-businesswoman-glasses-striped-shirt-working-with-laptop-computer-while-siting-home_171337-13027.jpg?w=1480&t=st=1667380980~exp=1667381580~hmac=c5ee009e37cbc863c044578184ab0e6e2fe4f16fe237d3c02b1545cd0863ace5"
            className="w-full h-96 object-cover rounded-lg"
            alt="hero"
          />
        </figure>
        <div className="w-full p-4 space-y-4">
          <h1 className="md:text-5xl text-4xl font-semibold leading-tight">
            LOGIN
          </h1>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col md:flex-row gap-2 py-2">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border dark:text-slate-900 border-slate-300 rounded-md py-2 px-4"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 py-2">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border dark:text-slate-900 border-slate-300 rounded-md py-2 px-4"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 py-2">
              <button
                className="bg-blue-600 w-full md:w-auto px-6 py-2 rounded-md text-lg text-slate-100"
                type="submit"
              >
                Login
              </button>
              <Link
                className="bg-red-600 w-full md:w-auto px-6 py-2 rounded-md text-lg text-slate-100"
                to="/register"
              >
                Register
              </Link>
              <p className="md:w-auto px-6 py-2 rounded-md text-lg">OR</p>
              <div className="md:w-auto px-3 py-2 rounded-md text-lg">
                <div id="buttonDiv"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
