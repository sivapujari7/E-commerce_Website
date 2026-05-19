A modern Full-Stack MERN E-Commerce Web Application built with scalable architecture, responsive UI design, secure authentication, and dynamic product management capabilities.
This project delivers a complete online shopping experience with category-based browsing, cart management, admin controls, authentication workflows, and cloud deployment.

# Designed and developed to demonstrate strong practical skills in:

* Full-Stack MERN Development
* REST API Architecture
* MongoDB Database Design
* Responsive Frontend Engineering
* Authentication & Security
* CRUD Operations
* Deployment & Production Hosting

  # Live Demo

  | Platform   Link                                                |
| -------------------- |       |
| Frontend (Vercel)    |    https://e-commerce-website-nine-ochre.vercel.app/ |
| Backend API (Render) | https://e-commerce-backend-eubt.onrender.com         |

# ✨ Key Features

🛍️ User Features
* Responsive modern ecommerce interface
* Dynamic product rendering from backend APIs
* Category-based product navigation
* Product detail pages
* Add-to-cart functionality
* Quantity increase/decrease controls
* Real-time cart updates
* LocalStorage cart persistence
* Product search functionality
* Trending products section
* Smooth UI animations and transitions
* Mobile responsive product grid
* Floating cart sidebar
* Checkout flow simulation
* Payment method selection UI

# 🔐 Authentication Features
* User registration system
* Secure login functionality
* Password hashing using bcrypt
* JWT-based authentication
* Forgot password workflow
* OTP-based password reset
* Email integration using Nodemailer
* Session persistence using LocalStorage

 # 🛠️ Admin Features
* Admin-only access validation
* Add new products dynamically
* Update/edit existing products
* Delete products
* Manage inventory stock
* Manage trending products
* Product image management
# ⚡ Performance & UX Features
* Mobile-first responsive design
* Optimized CSS Grid layouts
* Smooth hover animations
* Dynamic DOM rendering
* Toast notifications
* Modular reusable helper functions
* Interactive hero section effects
 #  🧰 Tech Stack
 | Category           | Technology        | Purpose                                |
| ------------------ | ----------------- | -------------------------------------- |
| Frontend           | HTML5             | Structure & semantic layout            |
| Frontend           | CSS3              | Responsive UI styling                  |
| Frontend           | JavaScript (ES6+) | Dynamic client-side logic              |
| Backend            | Node.js           | JavaScript runtime environment         |
| Backend            | Express.js        | REST API server & routing              |
| Database           | MongoDB Atlas     | Cloud NoSQL database                   |
| ODM                | Mongoose          | MongoDB schema modeling                |
| Authentication     | JWT               | User authentication & token handling   |
| Security           | bcryptjs          | Password hashing                       |
| Email Service      | Nodemailer        | OTP email delivery                     |
| Hosting            | Vercel            | Frontend deployment                    |
| Hosting            | Render            | Backend deployment                     |
| Version Control    | Git & GitHub      | Source code management                 |
| Environment Config | dotenv            | Secure environment variable management |
| Development Tool   | Nodemon           | Auto-restart backend server            |

# 🧠 System Architecture

Frontend (HTML/CSS/JS)

        ↓
 Fetch API Requests
 
        ↓
Express.js REST API Server

        ↓
Authentication & Route Handling

        ↓
MongoDB Atlas Database

        ↓
JSON Response Returned

        ↓
Dynamic UI Rendering

# ⚙️ How The Application Works
1️⃣ User Opens Frontend

The frontend is hosted on Vercel and provides a responsive ecommerce interface.

Users can:

* Browse products
* Search products
* Filter categories
* Add products to cart
* Login/Register
* Manage cart
  # 2️⃣ Frontend Sends API Request

The frontend communicates with the backend using Fetch API.
Backend URL: https://e-commerce-backend-eubt.onrender.com
# 3️⃣ Express.js Handles Routes
The Express backend processes requests using modular route handling:
/api/auth
/api/products
# Backend routes manage:

* Authentication
* Product CRUD operations
* Password reset workflows
 # 4️⃣ MongoDB Stores Data

MongoDB Atlas stores:

* User accounts
* Product inventory
* Authentication data
* OTP reset details

Using Mongoose schemas:

* Product Schema
* User Schema
# # 5️⃣ Authentication Flow
# Registration
1.User submits form
2.Password hashed using bcrypt
3.User saved in MongoDB
4.Success response returned
# Login
1.Credentials validated
2. Password compared using bcrypt
3. JWT token generated
4. Token stored in LocalStorage
#6️⃣ Admin Product Management
Admin can:
* Add products
* Edit products
* Delete products
* Manage stock
* Update trending products
CRUD APIs dynamically update MongoDB and frontend UI.
# 📁 Project Structure

```text
E-commerce_Website/
│
├── front_end/
│   │
│   ├── images/
│   ├── videos/
│   │
│   ├── index.html
│   ├── product.html
│   ├── categories.html
│   ├── subcategory.html
│   ├── category.js
│   ├── product.js
│   ├── script.js
│   └── style.css
│
├── back_end/
│   │
│   ├── models/
│   │   ├── product.js
│   │   └── user.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── README.md
└── package-lock.json
```
# 🔌 REST API Endpoints
| Method | Endpoint                    | Description       |
| ------ | --------------------------- | ----------------- |
| POST   | `/api/auth/register`        | Register new user |
| POST   | `/api/auth/login`           | Login user        |
| POST   | `/api/auth/forgot-password` | Send OTP          |
| POST   | `/api/auth/reset-password`  | Reset password    |

 # Product Routes
 | Method | Endpoint                   | Description      |
| ------ | -------------------------- | ---------------- |
| GET    | `/api/products`            | Get all products |
| POST   | `/api/products/add`        | Add product      |
| PUT    | `/api/products/update/:id` | Update product   |
| DELETE | `/api/products/delete/:id` | Delete product   |

# 📱 Responsive Design
The application is fully responsive across:

* Mobile devices
* Tablets
* Laptops
* Desktop screens

Responsive techniques used:

* CSS Grid
* Flexbox
* Media Queries
* Fluid layouts
* Optimized product card scaling

# 🔐 Security Features
Password hashing with bcrypt
JWT authentication
# ☁️ Deployment
Frontend Deployment

Hosted on Vercel:

* Fast CDN delivery
* Automatic GitHub deployment
* Production-ready frontend hosting
* Backend Deployment

# Hosted on Render:

* Node.js server hosting
* MongoDB Atlas integration
* REST API deployment
# git clone https://github.com/sivapujari7/E-commerce_Website.git
# cd E-commerce_Website
# 👨‍💻 Author
Pujari Siva
GitHub: GitHub → https://github.com/sivapujari7
Repository: E-commerce_Website
