import supabase from "../config/supabase.js";
import QRCode from "qrcode";
import generateCode from "../utils/generateCode.js";

export const shortenUrl = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { original_url } = req.body;

    if (!original_url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    const short_code = generateCode();
    const shortUrl = `${process.env.BASE_URL}/${short_code}`;

    const qr_code = await QRCode.toDataURL(shortUrl);

    const { data, error } = await supabase
      .from("urls")
      .insert([
        {
          original_url,
          short_code,
          qr_code,
        },
      ])
      .select();

    if (error) {
      console.log("Supabase Error:", error);
      return res.status(500).json(error);
    }

    return res.status(201).json({
      success: true,
      data: {
        ...data[0],
        short_url: shortUrl,
      },
    });
  } catch (error) {
    console.log("Catch Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const redirectUrl = async (req, res) => {

    const { shortCode } = req.params;

    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("short_code", shortCode)
        .single();

    if (error || !data) {
        return res.status(404).send("URL Not Found");
    }

    res.redirect(data.original_url);

};
