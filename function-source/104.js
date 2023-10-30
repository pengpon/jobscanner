const axios = require("axios");
const cheerio = require("cheerio");
const { BASE_URL } = require("./constants.js");

const fetch104Job = async (keyword, page = 1) => {
  console.log(`Fetch 104 data --- Page ${page}, ${keyword}`);

  let url = `${BASE_URL["one04"]}?keyword=${keyword}&page=${page}`;
  let data = await axios.get(url);
  let $ = cheerio.load(data.data);
  let result = [];

  // 104 結果最多 150 頁
  if ($("article.job-list-item").length === 0 || page > 150) return result;

  $(".job-list-item").each(function () {
    let $this = $(this);
    let name = $this.find(".b-tit a.js-job-link").text(),
      companyName = $this.find(".b-list-inline li:nth-child(2) > a").text(),
      description = $this.find(".job-list-item__info").text(),
      location = $this.find(".job-list-intro > li:first-child").text(),
      url = $this.find(".b-tit a.js-job-link").attr("href"),
      salary = "",
      tags = [];
    $this.find(".job-list-tag a").each(function () {
      let $tag = $(this);
      if ($tag.text().includes("薪")) salary = $tag.text();
      tags.push($tag.text());
    });
    // url = url && url.replace(/^\/\//, "");

    result.push({
      name,
      companyName,
      companyLogo: "",
      description,
      location,
      salary,
      tags,
      url,
      source: '104'
    });
  });

  return result.filter(job => job.name.includes(keyword));
};

module.exports = fetch104Job;
