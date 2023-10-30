const functions = require("@google-cloud/functions-framework");
const { KEYWORD_LIST } = require("./constants");
const fetch104Job = require("./104.js");
const fetchYouratorJob = require("./yourator.js");
const fetchCakeresumeJob = require("./cakeresume.js");
const { convertSalaryFormat } = require("./jobFormat.js");
const { writeFile } = require("./file.js");

// // Firestore
// const { initializeApp, cert } = require('firebase-admin/app');
// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const serviceAccount = require('./serviceAccountKey.json')
// initializeApp({
//   credential: cert(serviceAccount)
// });
// const db = getFirestore();

let startPage = 1;
let endPage = 3;

// Storage
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "serviceAccountKey.json" });
const bucketName = "job-list";

const filePath = "/tmp/jobs_list.json";
const destFileName = "jobs_list.json";
// const generationMatchPrecondition = 0;

async function uploadFile() {
  const options = {
    destination: destFileName,
    // preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
  };

  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}

functions.http("init", async (req, res) => {
  let result = await fetchData();

  let data = convertSalaryFormat(result);
  data = data.sort((a, b) => {
    if (a.companyName > b.companyName) return 1;
    if (a.companyName < b.companyName) return -1;
    return 0;
  });

  data = data.map((item) => {
    return {
      ...item,
      key: item.url.replace(/\W/g, ""),
    };
  });

  //  data.forEach(async(job) => {
  //   await db.collection('jobList').doc(job.key).set({...job, timestamp: FieldValue.serverTimestamp()});
  //  })

  await writeFile(filePath, { result: data, updateTime: new Date().getTime() });
  uploadFile();

  res.status(200).send(`Total is ${result.length}`);
});

const getAll104Job = async (keyword, startPage) => {
  let page = startPage;
  let jobs = [];
  let isEmpty = false;
  do {
    let data = await fetch104Job(keyword, page);
    console.log(data.length);
    jobs = [...jobs, ...data];
    isEmpty = !data.length;
    page += 1;
  } while (page <= endPage && !isEmpty);

  return jobs;
};

const getAllYouratorJob = async (keyword, startPage) => {
  let page = startPage;
  let jobs = [];
  let hasNextPage = true;

  do {
    let res = await fetchYouratorJob(keyword, page);
    console.log(res.data.length);
    jobs = [...jobs, ...res.data];
    hasNextPage = res.hasNextPage;
    page += 1;
  } while (page <= endPage && hasNextPage);

  return jobs;
};

const getAllCakeresumeJob = async (keyword, startPage) => {
  let page = startPage;
  let jobs = [];
  let isEmpty = false;

  do {
    let res = await fetchCakeresumeJob(keyword, page);
    console.log(res.length);
    jobs = [...jobs, ...res];
    isEmpty = !res.length;
    page += 1;
  } while (page <= endPage && !isEmpty);

  return jobs;
};

const fetchData = async () => {
  let result = [];
  for (let i = 0; i < KEYWORD_LIST.length; i++) {
    let one04DataArr = await getAll104Job(KEYWORD_LIST[i], startPage);
    let youratorDataArr = await getAllYouratorJob(KEYWORD_LIST[i], startPage);
    let cakeResumeDataArr = await getAllCakeresumeJob(
      KEYWORD_LIST[i],
      startPage
    );
    result = [
      ...result,
      ...one04DataArr,
      ...youratorDataArr,
      ...cakeResumeDataArr,
    ];
  }

  return result;
};
