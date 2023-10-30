const { BASE_URL } = require("./constants.js");

const convertJobListFromYourator = (data) => {
  return data.map((job) => ({
    name: job.name,
    companyName: job.company.brand,
    companyLogo: job.company.logo,
    description: "",
    location: job.location,
    salary: job.salary,
    tags: job.tags,
    url: `${BASE_URL["yourator"]}${job.path}`,
    source: 'yourator'
  }));
};

const convertSalaryFormat = (jobList) => {
  const keyword = {
    year: "年",
    month: "月",
    tenThousand: "萬",
    dollar: "元",
  };

  let data = jobList.map((job) => {
    let salary = [],
      salaryType = "";

    // salaryType 區分類別
    if (job.salary.includes(keyword.month)) {
      salaryType = "month";
    } else if (job.salary.includes(keyword.year)) {
      salaryType = "year";
    } else {
      salaryType = "other";
    }

    // 以 - 或 ~ 切分，將 salary 轉成陣列
    salary = job.salary.split(/-|~/);

    salary = salary.map((item) => {
      // match 萬字前面的數值
      const withWordRegex = new RegExp(`\\d+\.?\\d?(?=${keyword.tenThousand})`);
      // match 數值
      const withThousandSeparatorRegex = /(\d+,?)+/;
      let value;

      if (item.includes(keyword.tenThousand)) {
        value = item.match(withWordRegex)[0] * 10000;
      } else if (withThousandSeparatorRegex.test(item)) {
        value = Number(
          item.match(withThousandSeparatorRegex)[0].replaceAll(",", "")
        );
      } else {
        value = item;
      }

      return value;
    });
    return {
      ...job,
      salary,
      salaryType,
    };
  });

  return data;
};

module.exports = { convertJobListFromYourator, convertSalaryFormat };
