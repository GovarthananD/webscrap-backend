import axios from "axios";
import * as cheerio from "cheerio";

const getData = async (searchTerm) => {
  // Send GET Request
  console.log(searchTerm);
  const response = await (
    await axios.get(`https://www.amazon.in/s?k=${searchTerm}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 5.1; AFTS Build/LMY47O) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/41.99900.2250.0242 Safari/537.36",
      },
    })
  ).data;
  // Load the returned response
  let $ = cheerio.load(response);
  // Find Title Section of the page
  let titleObj = $(
    "h2 a.a-link-normal.a-text-normal",
    'div[data-component-type="s-search-result"]'
  );
  // Find Price Section of the page
  let priceObj = $(
    "span.a-price:nth-of-type(1) span.a-offscreen",
    'div[data-component-type="s-search-result"]'
  );
  let data = [];
  // Get all product names and links
  for (let i = 0; i < titleObj.length; i++) {
    let productName = $(titleObj[i]).find("span")[0].children[0]["data"];
    let productLink = "https://amazon.in" + $(titleObj[i]).attr("href");
    let price = $(priceObj[i]).text();
    let imgUrl = $(
      `img[alt=${`"${productName}"`}]`,
      'div[data-component-type="s-search-result"]'
    ).attr("src");
    data.push({
      productName: productName,
      price: price,
      imageUrl: imgUrl,
      productLink: productLink,
      catogery: searchTerm,
    });
  }
  console.log(data);
  return data;
};

// getData();

export default getData;
