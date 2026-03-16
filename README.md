# Syntecxhub_Data_Analytics_API

# 📊 Data Analytics API

A **Node.js + Express.js + MongoDB API** that generates analytics from notes data using the **MongoDB Aggregation Pipeline**.

This project demonstrates how backend systems transform raw data into useful insights such as:

* Notes per **category**
* Notes per **month**
* Analytics for a **specific user**
* Analytics within a **date range**

It is a simple backend project that showcases **REST API design and MongoDB aggregation queries**.

---

# 🚀 Features

* Create and store notes in MongoDB
* Category-based analytics
* Monthly analytics of notes
* User-specific analytics
* Date range analytics
* Clean JSON API responses

---

# 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **MongoDB Aggregation Pipeline**

---

# 📂 Project Structure

```
server/
│
├── models/
│   └── Note.js
│
├── routes/
│   └── analytics.js
│
├── server.js
├── package.json
└── .env
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/chitti239/Syntecxhub_Data_Analytics_API
cd server
```

Install dependencies:

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root folder.

```
MONGO_URI=mongodb://localhost:27017/notesAnalytics
PORT=5000
```

---

# ▶️ Run the Server

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

# 📡 API Endpoints

## 1️⃣ Create a Note

**POST**

```
/api/analytics/add-note
```

Example Request Body

```json
{
"title": "Shopping List",
"content": "Buy fruits and vegetables",
"user": "Rahul",
"category": "Personal"
}
```

---

# 📊 Analytics Endpoints

## 2️⃣ Notes Per Category

**GET**

```
/api/analytics/notes-per-category
```

Groups notes by category and returns total notes with note details.

Example Response

```json
[
{
"category": "Personal",
"totalNotes": 4,
"notes": [
{
"title": "Shopping List",
"content": "Buy fruits",
"user": "Rahul",
"createdAt": "2026-03-16T06:53:19.097Z"
}
]
}
]
```

---

## 3️⃣ Notes Per Month

**GET**

```
/api/analytics/notes-per-month
```

Returns how many notes were created each month.

Example Response

```json
[
{
"month": "Mar",
"totalNotes": 12
}
]
```

---

## 4️⃣ User Analytics

**GET**

```
/api/analytics/user/:userId
```

Returns notes count grouped by category for a specific user.

Example Request

```
/api/analytics/user/Rahul
```

Example Response

```json
[
{
"category": "Personal",
"total": 3
},
{
"category": "Work",
"total": 2
}
]
```

---

## 5️⃣ Date Range Analytics

**GET**

```
/api/analytics/date-range?startDate=2026-03-01&endDate=2026-03-31
```

Returns notes count per category within a specific date range.

Example Response

```json
[
{
"category": "Work",
"count": 5
},
{
"category": "Personal",
"count": 3
}
]
```

---

# 🔍 Example Aggregation Query

```javascript
Note.aggregate([
{
$group:{
_id:"$category",
totalNotes:{ $sum:1 }
}
}
])
```

This query groups notes by **category** and counts the total number of notes.

---

# 👩‍💻 Author

**Sharini**
B.Tech Student (Computer Science)
Backend Developer | Mern Stack Developer