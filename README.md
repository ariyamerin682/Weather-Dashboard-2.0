# 🌤️ Weather Dashboard - Full Stack Application

A full-stack weather dashboard application that allows users to search for cities, view current weather conditions, and track search history.

## 🚀 Features

- **Real-time Weather Data** - Powered by OpenWeatherMap API
- **Interactive Map** - Leaflet.js map showing city locations
- **Search History** - Track all your weather searches
- **Search Statistics** - See most searched cities and average temperatures
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Full Stack** - Express.js backend with MongoDB database

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Leaflet.js for maps
- OpenWeatherMap API

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API design

## 📁 Project Structure

weather-dashboard/                           ← Root folder
│
├── .gitignore                               ← Git ignore file
├── README.md                                ← Project documentation
├── LICENSE                                  ← (Optional) License file
│
├── frontend/                                ← Frontend application
│   ├── index.html                          ← Main HTML page
│   ├── css/
│   │   └── style.css                       ← All styles
│   └── js/
│       ├── app.js                          ← Main app logic
│       ├── api.js                          ← API calls (weather + backend)
│       └── ui.js                           ← UI rendering functions
│
└── backend/                                 ← Backend API
    ├── server.js                           ← Express server entry point
    ├── package.json                        ← Dependencies list
    ├── package-lock.json                   ← Locked dependency versions
    ├── .env.example                        ← Environment variables template
    ├── models/                             ← MongoDB schemas
    │   ├── City.js                         ← City model
    │   └── Search.js                       ← Search history model
    ├── routes/                             ← API routes
    │   ├── cities.js                       ← City routes
    │   └── searches.js                     ← Search history routes
    ├── controllers/                        ← Business logic
    │   ├── cityController.js               ← City logic
    │   └── searchController.js             ← Search logic
    └── middleware/                         ← Custom middleware
        └── auth.js                         ← API key validation (optional)


## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ariyamerin682/Weather-Dashboard-2.0.git
cd Weather-Dashboard-2.0
