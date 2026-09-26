import express from "express";
const app = express();

app.use(express.json());

//url = "http://192.168.1.169:8592/get_search_info?list=log";

app.get("/", async (req, res) => {
  try {
    const auth = Buffer.from("root:Admin123456").toString("base64");
    const response = await fetch(
      "http://192.168.1.169:8592/get_search_info?list=log&limit=1",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "*/*",
        },
      },
    );

    const data = await response.json();
    const [INDEX] = data.INFORMATION.map((i) => i.INDEX);
    const [TIME] = data.INFORMATION.map((i) => i.MOD_TS);
    const [LPR] = data.INFORMATION.map((i) => i.LPR);
    const [UrlImg] = data.INFORMATION.map((i) => i.LP_BMP);
    res.status(response.status).send(`${INDEX}, ${TIME}, ${LPR}, ${UrlImg}`);
    //res.status(response.status).send("OK");
    console.log(`${INDEX}, ${TIME}, ${LPR}, ${UrlImg}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "khong the ket noi camera" });
  }
});

app.listen(8383, () => {
  console.log("server is running");
});
