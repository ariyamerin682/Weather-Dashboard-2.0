# 🌤️ Weather Dashboard - Full Stack Application

A full-stack weather dashboard application that allows users to search for cities, view current weather conditions, and track search history with an interactive map.

![Weather Dashboard](https://via.placeholder.com/800x400?text=Weather+Dashboard+Screenshot)

## 🏷️ Tech Stack

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-FF6B00?style=for-the-badge&logo=openweathermap&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Tools & Testing
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)

### Deployment (Optional)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 📋 Technology Breakdown

### 🎨 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | Latest | Semantic markup and accessibility |
| **CSS3** | Latest | Responsive design with Flexbox & Grid |
| **JavaScript (ES6+)** | Latest | Interactive features and DOM manipulation |
| **Leaflet.js** | 1.9.x | Interactive map rendering |
| **OpenWeatherMap API** | 2.5 | Real-time weather data |
| **Font Awesome** | 6.x | Icons and visual elements |

### ⚙️ Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 14+ | JavaScript runtime environment |
| **Express.js** | 4.18.x | Web framework for building REST APIs |
| **MongoDB** | 6.x | NoSQL database for data persistence |
| **Mongoose** | 7.x | MongoDB ODM for schema modeling |
| **CORS** | 2.8.x | Cross-origin resource sharing |
| **Dotenv** | 16.x | Environment variable management |
| **Helmet** | 7.x | Security headers middleware |
| **Morgan** | 1.10.x | HTTP request logger |

### 🛠️ Development Tools

| Tool | Purpose |
|------|---------|
| **Nodemon** | Auto-restart server during development |
| **Git** | Version control |
| **Postman** | API testing and documentation |
| **VS Code** | Code editor |
| **MongoDB Compass** | Database visualization |

### 📊 Data Models

#### City Model
```javascript
{
  name: String,           // City name
  country: String,        // Country code
  lat: Number,           // Latitude
  lon: Number,           // Longitude
  isFavorite: Boolean,   // Favorite status
  searchCount: Number,   // Number of searches
  lastSearched: Date,    // Last search timestamp
  notes: String          // Optional notes
}
### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ariyamerin682/Weather-Dashboard-2.0.git
cd Weather-Dashboard-2.0
