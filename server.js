import express from "express";
const app = express();

app.use(express.json());

//url = "http://192.168.1.169:8592/get_search_info?list=log";
//UrlImg='http://192.168.1.169:8592/Aida_data/storage/2026_9_16_15_6_25_729_29Y303658_10.jpg'

async function admin(req, res) {
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

    //cm9vdDpBZG1pbjEyMzQ1Ng==

    const data = await response.json();

    const [INDEX] = data.INFORMATION.map((i) => i.INDEX);
    const [TIME] = data.INFORMATION.map((i) => i.MOD_TS);
    const [LPR] = data.INFORMATION.map((i) => i.LPR);
    const [UrlImg] = data.INFORMATION.map((i) => i.LP_BMP);

    const test = fetch(
      `http://192.168.1.169:8592/Aida_data/storage/${UrlImg}.jpg`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "*/*",
        },
      },
    );

    const stream = (await test).body;
    const reader = stream.getReader();
    const chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(Buffer.from(value));
    }
    const buffer = Buffer.concat(chunks);
    const base64 = buffer.toString("base64");

    // const result = await test.then((data) => {
    //   return data;
    // });

    // const imgsrc =
    //   "data:image/jpeg;base64,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";

    const html = `<!DOCTYPE html> <html> <body> <img src='data:image/jpeg;base64,${base64}' width='400'></body></html>`; //result.url

    res
      .status(response.status)
      .send(`${INDEX}, ${TIME}, ${LPR}, ${UrlImg}, ${html}`);
    //res.status(response.status).send("OK");
    console.log(`${INDEX}, ${TIME}, ${LPR}, ${UrlImg}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "khong the ket noi camera" });
  }
}

app.get(
  "/",
  admin,
  //   async (req, res) => {
  //   try {
  //     const auth = Buffer.from("root:Admin123456").toString("base64");

  //     const response = await fetch(
  //       "http://192.168.1.169:8592/get_search_info?list=log&limit=1",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Basic cm9vdDpBZG1pbjEyMzQ1Ng==`,
  //           Accept: "*/*",
  //         },
  //       },
  //     );

  //     const data = await response.json();

  //     const [INDEX] = data.INFORMATION.map((i) => i.INDEX);
  //     const [TIME] = data.INFORMATION.map((i) => i.MOD_TS);
  //     const [LPR] = data.INFORMATION.map((i) => i.LPR);
  //     const [UrlImg] = data.INFORMATION.map((i) => i.LP_BMP);

  //     const test = fetch(
  //       `http://192.168.1.169:8592/Aida_data/storage/${UrlImg}.jpg`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Basic ${auth}`,
  //           Accept: "*/*",
  //         },
  //       },
  //     );

  //     const result = await test.then((data) => {
  //       return data;
  //     });

  //     console.log(result.status, "------------", result.statusText);

  //     const html = `<!DOCTYPE html> <html> <body> <img src=${result.url} width='200'> </body></html>`;

  //     res
  //       .status(response.status)
  //       .send(`${INDEX}, ${TIME}, ${LPR}, ${UrlImg}, ${html}`);
  //     //res.status(response.status).send("OK");
  //     console.log(`${INDEX}, ${TIME}, ${LPR}, ${UrlImg}, ${result.url}`);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "khong the ket noi camera" });
  //   }
  // }
);

app.listen(8383, () => {
  console.log("server is running");
});
