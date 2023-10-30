const axios = require("axios");
const { BASE_URL } = require("./constants.js");
const { convertJobListFromYourator } = require("./jobFormat.js");

const fetchYouratorJob = async (keyword, page = 1) => {
  console.log(`Fetch yourator data --- page ${page}, ${keyword}`);

  let url = `${BASE_URL["yourator"]}/api/v4/jobs?page=${page}&term[]=${keyword}`;
  let res = await axios.get(url);
  let data = convertJobListFromYourator(res.data.payload.jobs).filter(job => job.name.includes(keyword));
  let hasNextPage = res.data.payload.nextPage;

  return {data, hasNextPage};
};

module.exports = fetchYouratorJob;
