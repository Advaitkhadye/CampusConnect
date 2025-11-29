# CampusConnect



CampusConnect is the ultimate platform for college clubs to create unforgettable events, build communities, and track engagement. It provides a seamless experience for students to discover and register for events, and for organizers to manage them efficiently.

## 🚀 Features

-   **Event Discovery**: Browse upcoming events by category (Technology, Cultural, Business, etc.).
-   **Event Registration**: Easy registration process with auto-filled student details.
-   **User Authentication**: Secure login and registration using Firebase Authentication.
-   **Role-Based Access**: Distinct features for Students and Admins.
-   **Responsive Design**: Fully optimized for both desktop and mobile devices.
-   **Real-time Updates**: Instant feedback and status updates.

## 🛠️ Tech Stack

-   **Frontend**: React (v19), TypeScript, Vite
-   **Styling**: Tailwind CSS (v4), Lucide React (Icons)
-   **Backend / Auth**: Firebase (Authentication, Firestore)
-   **Routing**: React Router DOM

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/campusconnect.git
    cd campusconnect
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Firebase configuration:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 📱 Mobile Support

The application features a responsive design with specific optimizations for mobile users, such as:
-   Dropdown filters for easy category selection.
-   Touch-friendly interfaces.
-   Adaptive layouts.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
