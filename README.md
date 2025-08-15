# Reality Glitcher 🪞📱

**Tagline:** "See the world the way no human ever has."

## Overview

Reality Glitcher is a complete mobile AR application that uses AI to transform your surroundings in real-time into different "alternate realities." Walk around inside these transformed realities using AR, with support for multiplayer experiences where friends can join remotely.

## Features

### 🌆 AR Transformation Modes
- **Cyberpunk** - Neon-lit futuristic city vibes with glowing effects
- **Medieval Fantasy** - Castles instead of buildings, dragons instead of cars  
- **Cartoon Mode** - Hand-drawn, animated appearance with cel-shading

### 🤝 Multiplayer & Social
- Real-time multiplayer AR sessions
- Voice chat integration
- Friend invitation system
- Shared AR space coordination
- Cross-platform support

### 📱 Mobile App Features
- Real-time camera transformation
- 60 FPS performance target
- Recording and screenshot functionality
- Social sharing integration
- Intuitive user interface

## Technical Stack

### Frontend (React Native + Expo)
- React Native 0.79+
- Expo SDK 53+
- React Navigation 7
- Redux Toolkit
- TypeScript

### Backend (Node.js)
- Node.js + Express
- Socket.io for real-time communication
- JWT authentication
- TypeScript

### AR & AI Processing
- expo-camera for camera access
- expo-gl for AR rendering
- Custom transformation algorithms
- Real-time processing pipeline

## Project Structure

```
├── mobile/              # React Native/Expo mobile app
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── screens/     # App screens
│   │   ├── navigation/  # Navigation configuration
│   │   ├── store/       # Redux store and slices
│   │   ├── services/    # API services
│   │   └── types/       # TypeScript type definitions
│   ├── assets/          # Images, models, audio
│   └── app.json         # Expo configuration
├── backend/             # Node.js/Express server
│   ├── src/
│   │   ├── routes/      # API route handlers
│   │   ├── services/    # Business logic services
│   │   ├── middleware/  # Express middleware
│   │   └── utils/       # Utility functions
│   └── package.json
├── ai-models/           # TensorFlow Lite models (placeholder)
├── docs/               # Documentation
└── scripts/            # Build and deployment scripts
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Mobile App Setup

1. Install dependencies:
```bash
cd mobile
npm install
```

2. Start the development server:
```bash
npm start
```

3. Use the Expo Go app on your phone to scan the QR code, or run in simulator:
```bash
npm run ios    # iOS simulator
npm run android # Android emulator
npm run web    # Web browser
```

### Backend Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create environment file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the development server:
```bash
npm run dev
```

The backend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login  
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/profile/:userId` - Get user profile
- `GET /api/users/friends/:userId` - Get user's friends
- `POST /api/users/friends/:userId` - Add friend

### Multiplayer
- `POST /api/multiplayer/sessions` - Create AR session
- `POST /api/multiplayer/sessions/:sessionId/join` - Join session
- `POST /api/multiplayer/sessions/:sessionId/leave` - Leave session
- `GET /api/multiplayer/sessions/:sessionId` - Get session info

## WebSocket Events

### Connection
- `authenticate` - User authentication
- `join-session` - Join AR session
- `user-joined` - User joined notification
- `user-left` - User left notification

### AR Synchronization
- `update-position` - Send position/rotation updates
- `user-position-update` - Receive position updates
- `transformation-change` - AR mode changes
- `user-transformation-change` - Receive transformation updates

### Voice Chat
- `voice-offer` - WebRTC offer for voice chat
- `voice-answer` - WebRTC answer
- `ice-candidate` - ICE candidate exchange

## Development

### Type Checking
```bash
# Mobile app
cd mobile && npm run type-check

# Backend
cd backend && npm run build
```

### Code Structure Guidelines
- Use TypeScript for type safety
- Follow component-based architecture
- Implement proper error handling
- Use Redux for state management
- Follow RESTful API conventions

## Performance Targets
- 60 FPS real-time processing
- < 100ms transformation latency
- < 2 second app startup time
- < 5% battery drain per hour
- Support for devices 3+ years old

## Future Enhancements
- AI model integration with TensorFlow Lite
- Cloud processing fallback
- Advanced AR effects and filters
- User-generated content
- Analytics and metrics collection

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Reality Glitcher** - Transforming reality, one frame at a time. 🌟
