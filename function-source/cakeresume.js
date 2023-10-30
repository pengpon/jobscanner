const axios = require("axios");
const cheerio = require("cheerio");
const { BASE_URL } = require("./constants.js");


const fetchCakeresumeJob = async(keyword, page) => {
	console.log(`Fetch CakeResume data -- Page ${page}, ${keyword}`);

  let result = [];
  let url = `${BASE_URL["cakeresume"]}/jobs/${keyword}?page=${page}`;
	let data = await axios.get(url);
	let $ = cheerio.load(data.data);

	if (!$('[class^="JobSearchItem_wrapper"]').length) {
		return result;
	}

	$('[class^="JobSearchItem_wrapper"]').each(function () {
		let $this = $(this),
				name = $this.find('[class^="JobSearchItem_jobTitle"]').text(),
				companyName = $this.find('[class^="JobSearchItem_companyName"]').text(),
				description = $this.find('[class^="JobSearchItem_description"]').text(),
				location = $this.find('[class^="JobSearchItem_features"] [class^="InlineMessage_inlineMessage"]:has(.fa-map-marker-alt)').text(),
				salary = $this.find('[class^="JobSearchItem_features"] [class^="InlineMessage_inlineMessage"]:has(.fa-dollar-sign)').text(),
				companyLogo = $this.find('[class^="CompanyLogo_wrapper"] > img').attr("src"),
				tags = [],
				url = `${BASE_URL["cakeresume"]}${$this.find('a[class^="JobSearchItem_jobTitle"]').attr("href")}`,
        source = 'cakeresume';

		$this.find('[class^=JobSearchItem_tags] [class^=Tags_wrapper] [class^=Tags_item]').each(function () {
			tags.push($(this).text());
		})
		result.push({name, companyName, companyLogo, description, location, salary, tags, url, source});
	});
  return result;
}

module.exports = fetchCakeresumeJob;

