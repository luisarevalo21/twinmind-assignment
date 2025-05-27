# TwinMind Frontend

> A sleek and responsive frontend for TwinMind – a web application where users can capture, explore, and chat with their memories.

## 🧠 Overview

TwinMind lets users record audio, transcribe it using OpenAI’s speech-to-text technology, and interact with their memory transcripts through a rich and intuitive UI. Whether it’s a quick thought, a deep reflection, or a meeting, TwinMind helps you store and rediscover moments in a meaningful way.

## ✨ Features

- 🔐 **OAuth-based Authentication** (Google Sign-In via Firebase)
- 🎙️ **Audio Capture** with real-time microphone access
- 📝 **Speech-to-Text Transcription** powered by OpenAI Whisper API
- 💬 **Chat with Your Memories** — ask questions about your transcriptions using AI
- 📚 **Clean Transcript History** — revisit and explore past audio sessions
- 📱 **Responsive UI** — optimized for both mobile and desktop
- ❌ No calendar integration (by design)
- ❌ No tests implemented yet

## 🧰 Tech Stack

- **Frontend Framework**: React
- **Styling**: Material UI
- **Authentication**: Firebase (Google OAuth)
- **AI Services**: OpenAI (Whisper for transcription, GPT for chat)
- **Audio**: Native browser APIs
- **State Management**: React Context / Local State
- **Data Base**: Firestore

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/twinmind-frontend.git
cd twinmind-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root and include:

```env
VITE_FIREBASE_API_KEY = your key
VITE_FIREBASE_AUTH_DOMAIN = your domain
VITE_FIREBASE_PROJECT_ID = your project id
VITE_FIREBASE_STORAGE_BUCKET = your storage bucket
VITE_FIREBASE_MESSAGING_SENDER_ID = your sender id
VITE_FIREBASE_APP_ID = your app id

```

## 📂 Folder Structure

```
src/
├── assets/         # Icons and images
├── components/     # UI components (e.g. AudioRecorder, ChatBox, MemoryList)
├── pages/          # App routes like Home, Login, Dashboard
├── context/        # Global state providers
└── App.jsx         # Root component
```

## 📸 UI Highlights

- **Memory Timeline View** to see past sessions
- **Live Transcription Panel** during audio capture
- **AI Chat Interface** to query memory content
- Styled with clean and minimal UX principles inspired by iOS

## 🧪 Testing

Testing is not currently implemented, but planned areas include:

- Auth flow
- Transcription pipeline
- Chat interactions

## 📄 License

This project is licensed under the MIT License.

## Notes

Some notes does not allow asking questions about why the audio is being converted to text.
Because of this, the input at the bottom is not used.

There is a 30-second delay in processing for some reason, and it’s unclear why the audio is not being transcribed to text in that time.

You can change the title of the memory, but not why it is transcribing audio to text.

## 📎 Related

- [TwinMind Frontend Repo](https://github.com/luisarevalo21/twinmind-assignment-backend)
