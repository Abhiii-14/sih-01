# CivicFix - Smart Civic Issue Reporting and Resolution Portal

CivicFix is a static, browser-based civic issue reporting and resolution portal. It demonstrates complaint validation, registration, status tracking, municipal assignment, field-worker resolution and citizen feedback using HTML, CSS and JavaScript.

---

## 📖 About the Project

Citizens often face everyday problems such as damaged roads, uncollected garbage, broken street lights, water issues and blocked drainage. This project shows how a complaint system can handle those problems step by step:

1. ✅ Check that the complaint is valid
2. 📝 Enter its details on the registration form
3. 🔄 Track its status until it is fixed
4. ⭐ Collect the citizen's rating and decide the final status

Each step is a separate web page, and all pages are connected through a common navigation bar. 🔗

---

## ✨ Features

- Responsive landing page and shared navigation
- Complaint validation and registration
- Browser-generated demo complaint IDs
- Interactive status tracking
- Citizen feedback and 1-5 star ratings
- Municipal complaint classification and worker assignment
- Field-worker task and resolution interfaces
- Local JavaScript, CSS and Bootstrap assets; no backend required

---

## 🧩 Modules

### 1️⃣ Complaint Validation

[`html/complaint-validation.html`](html/complaint-validation.html) checks the description, photo and ward code before accepting a complaint.

Checks whether a complaint can be accepted.

| Check (in order) | Result |
|---|---|
| Description is empty | ❌ `Description Missing` |
| Photo is not available | 📷 `Photo Missing` |
| Ward code is below 1 or above 100 | 📍 `Unknown Ward Code` |
| All checks pass | ✅ `Complaint Accepted` |

At the end, the page shows **"Complaint Registered"** if the complaint is valid, or **"Invalid Complaint- Try Again"** if it is not.

### 2️⃣ Complaint Registration

[`html/complaint-registration.html`](html/complaint-registration.html) collects issue details and generates a temporary complaint ID in the browser.

Provides a form for entering complaint details and generates a temporary complaint ID in the browser after validation. The static site does not save submissions.

- 🗂️ Category is chosen from the problem type:

| Problem Type | Category |
|:---:|---|
| 1 | 🛣️ Road |
| 2 | 🗑️ Garbage |
| 3 | 💡 Street Light |
| 4 | 🚰 Water |
| 5 | 🌊 Drainage |
| Anything else | 📦 Other |

### 3️⃣ Status Tracking

[`html/status-tracking.html`](html/status-tracking.html) follows a complaint until it is resolved.

Follows a complaint until it is fixed.

- 🔄 The status starts as **In Progress**
- 🔁 A `while` loop keeps asking for an update
- ✍️ Typing `Resolved` (or `resolved`) ends the loop
- ⏳ Any other input shows **"Complaint Still in Progress"**
- 🖥️ The page then displays the Complaint ID, Status and Category

### 4️⃣ Feedback and Rating

[`html/feedback-and-rating.html`](html/feedback-and-rating.html) collects feedback after resolution.

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

### 5️⃣ Portals

- [`html/citizen.html`](html/citizen.html) - resident reporting and rating
- [`html/municipal-admin.html`](html/municipal-admin.html) - classify and assign complaints
- [`html/field-worker.html`](html/field-worker.html) - view and resolve assigned tasks

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
html/
│
├── index.html
├── citizen.html
├── complaint-validation.html
├── complaint-registration.html
├── status-tracking.html
├── feedback-and-rating.html
├── municipal-admin.html
├── field-worker.html
├── forms.html
├── app.js
├── style.css
└── bootstrap.min.css

images/
└── favicon.png
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| 🌐 HTML5 | Page structure, forms and navigation |
| 🎨 CSS3 | Responsive layout and component styling |
| ⚡ JavaScript | Validation, interactions and demo workflows |
| 🅱️ Bootstrap | Local Bootstrap utility and component CSS |

---

## ▶️ How to Run

1. Open the project folder in VS Code.
2. Open [`html/index.html`](html/index.html) in a browser, or use the Live Server extension.
3. Use the navigation bar to move between citizen, admin and field-worker pages.
4. GitHub Actions runs a static asset and JavaScript syntax check after each push.

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