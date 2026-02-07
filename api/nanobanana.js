import axios from "axios";

const API_KEY = process.env.NANO_API_KEY; 
const API_BASE_URL = "https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app/api";
const ENDPOINT = "/nanobanana";

export default async function handler(req, res) {
  const { prompt, imageUrl } = req.query;

  if (!prompt || !imageUrl) {
    return res.status(400).json({
      status: false,
      message: "prompt & imageUrl required"
    });
  }

  try {
    const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`, {
      params: { prompt, imageUrl },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      }
    });

    res.status(200).json({
      status: true,
      result: response.data
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.response?.data || err.message
    });
  }
}

