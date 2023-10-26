import { create } from 'zustand'
import axios from "axios";
import { padLeft } from "../utils/format";


export const useJobStore = create((set, get) => ({
  jobs: [],
  filterJobs: [],
  updateTime: '',
  fetchData: async () => {
     // // use mock data
    const res = await axios.get("http://localhost:3000/jobs");

    // use cloud storage
    // let res = await axios.get(
    // "https://storage.googleapis.com/job-list/jobs_list.json"
    // );
    const data = jobFormat(res);
    set({jobs: data.result, updateTime: data.updateTime})
  },

  filterByLocation: (location) => {
    let jobs = get().jobs;
    jobs = jobs.filter(job => job.location.includes(location));
    set({jobs: jobs})
  }
}))

const jobFormat = (res) => {
  let data = res.data.result;
  let timestamp = res.data.updateTime;
  let date = new Date(timestamp);
  let time = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${padLeft(date.getMinutes())}`;

  // filter duplicate key & replace location string
  const obj = {};
  data.forEach((item) => {
    item.location = item.location.replaceAll('臺', '台')
    obj[`${item.key}`] = item;
  });

  return {result: Object.values(obj), updateTime: time};
}
