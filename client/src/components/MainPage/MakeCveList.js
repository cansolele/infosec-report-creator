import style from "./MakeCveList.module.css";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import axios from "axios";
import config from "../../config";

const MakeCveList = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${config.apiURL}/make-cve-list`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDownloadLink(response.data.downloadLink);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  return (
    <Box className={style.main_page}>
      <h1>Сделать список CVE</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit" disabled={!file || isLoading}>
          {isLoading ? "Processing..." : "Process PDF"}
        </button>
      </form>
      {downloadLink && <a href={downloadLink}>Download Result</a>}
    </Box>
  );
};

export default MakeCveList;
