# 🏛️ Civic Issue Reporting and Resolution Portal

A simple, beginner-friendly web project that models how a citizen complaint travels from **submission** to **resolution and feedback**. It is built with **plain HTML and JavaScript only**, and every page follows a flowchart designed for the project. 🚀

---

## 📖 About the Project

Citizens often face everyday problems such as damaged roads, uncollected garbage, broken street lights, water issues and blocked drainage. This project shows how a complaint system can handle those problems step by step:

1. ✅ Check that the complaint is valid
2. 📝 Register it with a unique ID and category
3. 🔄 Track its status until it is fixed
4. ⭐ Collect the citizen's rating and decide the final status

Each step is a separate web page, and all pages are connected through a common navigation bar. 🔗

---

## ✨ Features

- 🔍 **Input validation** for description, photo and ward code
- 🆔 **Automatic complaint ID generation**
- 🗂️ **Category mapping** for Road, Garbage, Street Light, Water, Drainage and Other
- 🔁 **Status tracking loop** that keeps asking for updates until the complaint is resolved
- ⭐ **Rating validation** that only accepts values from 1 to 5
- 🔓 **Final status decision** (Closed or Reopened) based on the rating
- 🧭 **Navigation header** and "Next" links on every page
- 🪶 **Lightweight**: no frameworks, no libraries, no extra files

---

## 🧩 Modules

### 1️⃣ Complaint Validation: `complaint-validation.html`

Checks whether a complaint can be accepted.

| Check (in order) | Result |
|---|---|
| Description is empty | ❌ `Description Missing` |
| Photo is not available | 📷 `Photo Missing` |
| Ward code is below 1 or above 100 | 📍 `Unknown Ward Code` |
| All checks pass | ✅ `Complaint Accepted` |

At the end, the page shows **"Complaint Registered"** if the complaint is valid, or **"Invalid Complaint- Try Again"** if it is not.

### 2️⃣ Complaint Registration: `complaint-registration.html`

Creates a new complaint record.

- 🆔 `ComplaintID = PreviousID + 1`
- 🗂️ Category is chosen from the problem type:

| Problem Type | Category |
|:---:|---|
| 1 | 🛣️ Road |
| 2 | 🗑️ Garbage |
| 3 | 💡 Street Light |
| 4 | 🚰 Water |
| 5 | 🌊 Drainage |
| Anything else | 📦 Other |

- 📌 Status is set to **Registered**
- 🖥️ The page displays the Complaint ID, Category and Status

### 3️⃣ Status Tracking: `status-tracking.html`

Follows a complaint until it is fixed.

- 🔄 The status starts as **In Progress**
- 🔁 A `while` loop keeps asking for an update
- ✍️ Typing `Resolved` (or `resolved`) ends the loop
- ⏳ Any other input shows **"Complaint Still in Progress"**
- 🖥️ The page then displays the Complaint ID, Status and Category

### 4️⃣ Feedback and Rating: `feedback-and-rating.html`

Collects the citizen's feedback after resolution.

- 🔒 Rating is allowed **only if the status is Resolved**
- ⭐ Rating must be between **1 and 5**; invalid values are asked for again
- 🔓 Final status:

| Rating | Final Status |
|:---:|---|
| 1 | 🔄 Reopened |
| 2 to 5 | 🔐 Closed |

- 🖥️ The page displays the Complaint ID, Rating and Final Status

---

## 🔀 Project Flow

```
📋 Complaint Validation
        ⬇️
📝 Complaint Registration
        ⬇️
🔄 Status Tracking
        ⬇️
⭐ Feedback and Rating
```

---

## 📂 Folder Structure

```
complaint_system/
│
├── 📄 complaint-validation.html
├── 📄 complaint-registration.html
├── 📄 status-tracking.html
├── 📄 feedback-and-rating.html
└── 📘 README.md
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| 🌐 HTML5 | Page structure, forms and navigation |
| ⚡ JavaScript | Validation, loops and decision logic |

---

## ▶️ How to Run

1. 📥 **Clone** the repository
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```
2. 📂 **Open** the folder in **VS Code**
3. 🌐 **Open** `complaint-validation.html` in any browser, or right-click it and choose **Open with Live Server**
4. 🧭 Use the navigation bar to move between modules

---

## 🧪 Testing

Open each page in the browser and try these cases:

- 📋 **Validation:** empty description, no photo, ward code 0 and 101, and a fully valid entry
- 📝 **Registration:** all five problem types and one invalid type
- 🔄 **Tracking:** a wrong update first, then `Resolved`
- ⭐ **Feedback:** ratings 0, 1, 3 and 6, and an unresolved status

---

## 🎯 Learning Outcomes

- 🧠 Converting flowcharts into working code
- 🔀 Using `if / else` decisions and `while` loops
- 📝 Working with HTML forms and user input
- 🔗 Linking multiple pages with a navigation menu

---

## 🚧 Future Improvements

- 🎨 Add CSS styling for a modern look
- 💾 Store complaints using `localStorage` or a database
- 👤 Add login for citizens and administrators
- 📊 Add an admin dashboard with complaint statistics

---

## 👨‍💻 Author

**Abhinav** 🙌

If you like this project, give it a ⭐ on GitHub!