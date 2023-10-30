# Jobscanner

定期抓取三大求職平台(104、yourator、CakeResume) 職缺資料，彙整至 `Cloud Storage``

使用 Chakra UI 製作頁面，方便一覽前端相關職缺

過程記錄於 2023 鐵人賽

## 流程
1. `Cloud Scheduler` 每日 9:00 執行  `Cloud Functions` 抓取特定關鍵字職缺資料，整理成 JSON 檔案存至 `Cloud Storage`

2. 前端畫面由 React 處理，將整份職缺 JSON 檔案載入，做相關的排序或過濾


## 開發

使用 node v18.10.0

```bash
npm install
npm run dev
```

若要使用 mock data 執行
```bash
npm run mock
```
預設啟動 `http://localhost:3000/`

## 其他

Cloud Storage CORS 設定
`gsutil cors set cors-json-file.json gs://job-list/`

參考 [Set up and view CORS configurations](https://cloud.google.com/storage/docs/using-cors#troubleshooting)

