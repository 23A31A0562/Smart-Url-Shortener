import {
  FaCopy,
  FaDownload,
  FaGlobe,
  FaLink,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

const UrlCard = ({ data }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(data.short_url);
    toast.success("URL copied successfully!");
  };

  return (
    <div className="resultCard">

      <h2>
        <FaCheckCircle color="#22c55e" />
        &nbsp; Short URL Generated
      </h2>

      <div className="item">

        <h4>
          <FaGlobe />
          Original URL
        </h4>

        <a
          href={data.original_url}
          target="_blank"
          rel="noreferrer"
        >
          {data.original_url}
        </a>

      </div>

      <div className="item">

        <h4>
          <FaLink />
          Short URL
        </h4>

        <a
          href={data.short_url}
          target="_blank"
          rel="noreferrer"
        >
          {data.short_url}
        </a>

      </div>

      <button
        className="copyBtn"
        onClick={copyLink}
      >
        <FaCopy />
        &nbsp; Copy URL
      </button>

      <img
        src={data.qr_code}
        alt="QR Code"
      />

      <a
        href={data.qr_code}
        download="QRCode.png"
        className="downloadBtn"
      >
        <FaDownload />
        &nbsp; Download QR Code
      </a>

    </div>
  );
};

export default UrlCard;