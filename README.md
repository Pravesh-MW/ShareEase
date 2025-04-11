# ShareEase - Modern File Sharing Application

![ShareEase Logo](client/public/logo192.png)

ShareEase is a modern, user-friendly file sharing application that allows users to securely upload, share, and manage their files. Built with a focus on simplicity and efficiency, ShareEase provides a seamless experience for both senders and recipients.

## Features

- 🔒 Secure file sharing
- 📁 Drag-and-drop file upload
- ⚡ Fast file transfers
- 📱 Responsive design
- 🔗 Shareable download links
- 📊 File management dashboard
- 🔍 File search functionality
- 🎨 Modern UI with dark theme

## Tech Stack

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Storage**: Local storage with cloud integration support
- **Deployment**: Docker, AWS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pravesh-MW/ShareEase.git
   cd ShareEase
   ```

2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

4. Start the development servers:
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend development server
   cd ../client
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
ShareEase/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source code
│       ├── components/    # React components
│       ├── pages/         # Page components
│       ├── context/       # Context providers
│       ├── hooks/         # Custom hooks
│       ├── utils/         # Utility functions
│       └── styles/        # CSS and theme files
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── utils/            # Utility functions
└── docs/                 # Documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer

- **Name**: Pravesh K Bind
- **GitHub**: [@Pravesh-MW](https://github.com/Pravesh-MW)
- **Email**: [Your Email]

## Acknowledgments

- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.


