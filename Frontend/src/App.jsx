import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaLink, FaBolt, FaShieldAlt, FaQrcode, FaRocket } from "react-icons/fa";
import UrlCard from "./components/UrlCard";
import "./App.css";

function App() {

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.title = "Smart URL Shortener";
  }, []);

  const shortenUrl = async () => {

    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/url/shorten",
        {
          original_url: url,
        }
      );

      setResult(response.data.data);

      toast.success("Short URL Generated Successfully!");

    } catch (error) {

      toast.error("Something went wrong!");

    } finally {

      setLoading(false);

    }

  };

  return (

    <>

      <Toaster position="top-center" />

      <div className="main">

        <div className="glass">

          <h1>

            <FaLink />

            &nbsp;

            Smart URL Shortener

          </h1>

          <p className="subtitle">

            Generate secure short links with beautiful QR Codes instantly.

          </p>

          <div className="stats">

            <div className="card">

              <h3>

                <FaBolt />

              </h3>

              <p>Lightning Fast</p>

            </div>

            <div className="card">

              <h3>

                <FaShieldAlt />

              </h3>

              <p>Secure Links</p>

            </div>

            <div className="card">

              <h3>

                <FaQrcode />

              </h3>

              <p>QR Generator</p>

            </div>

            <div className="card">

              <h3>

                <FaRocket />

              </h3>

              <p>Instant Access</p>

            </div>

          </div>

          <input

            type="text"

            placeholder="Paste your long URL here..."

            value={url}

            onChange={(e) => setUrl(e.target.value)}

          />

          <button

            className="generate"

            onClick={shortenUrl}

          >

            {loading ? "Generating..." : " Generate Short URL"}

          </button>

          {result && <UrlCard data={result} />}

          <footer>

            Made with ❤️ by <span>Vipparthi Bhargav</span>

            <br />

            React • Express • Supabase • QR Generator

          </footer>

        </div>

      </div>

    </>

  );

}

export default App;