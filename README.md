# 🚀 Video Preloading and Player App

This project is a **React application** that preloads multiple videos, displays a loading progress, and then transitions into a video player interface where users can navigate through the videos.

---

## 🧭 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Components Explained](#-components-explained)
- [Hooks Explained](#-hooks-explained)
- [Context Explained](#-context-explained)
- [Routing Explained](#-routing-explained)
- [Important Notes](#-important-notes)

---

## 📌 Overview

This application allows users to preload videos into memory as Blob URLs. During preloading, a loading percentage is shown. Once all videos are loaded, the user is redirected to a player page where they can play, pause, and navigate through the videos.

## ✨ Features

- 🎞️ Video preloading with progress feedback.
- 🔗 Blob URL conversion for efficient video handling.
- ⏯️ Video playback with "Previous" and "Next" buttons.
- 📦 React Context for global state management.
- 🔁 React Router for navigation.

## 📁 Project Structure

```sh
/src
  /components
    StartButton.tsx
    VideoPlayer.tsx
  /context
    VideoProvider.tsx
  /hooks
    useVideoPreloader.ts
  /pages
    LandingPage.tsx
    PlayerPage.tsx
  /utils
    videoUrls.ts (Contains the list of video URLs)
  App.tsx
  index.tsx
  index.css
```

## ⚙️ Installation

```bash
git clone https://github.com/serdarovez/videoplayer.git
cd videoplayer
npm install
npm start
```

## ▶️ Usage

### 🏠 Landing Page
- Displays a **Start** button.
- Begins preloading all videos on click.
- Shows progress as a percentage.

### 🎬 Player Page
- Auto-redirect after preloading completes.
- Shows the video.
- Navigation buttons: `Previous`, `Next`.

## 🧩 Components Explained

### 📌 `StartButton`
- Reusable button component.
- Receives an `onClick` function.
- Used to start the video preloading.

### 🎥 `VideoPlayer`
- Video display + navigation buttons.
- Loads and plays based on the current index.

## 🪝 Hooks Explained

### `useVideoPreloader`
- Custom hook to preload videos as Blob URLs.
- Tracks loading progress.
- Returns:
  - `progress`
  - `complete`
  - `blobUrls`

## 🌐 Context Explained

### `VideoProvider`
- Shares `videoUrls` and `setVideoUrls` across components using context.

### `useVideoContext`
- Safely accesses the context via custom hook.

## 🔀 Routing Explained

- **`/`** => LandingPage
- **`/player`** => PlayerPage

Redirection to `/player` occurs when videos finish loading.

## ⚠️ Important Notes

- **Blob Management:** URLs are revoked when unmounted.
- **Autoplay Policy:** Errors from autoplay prevention are caught.
- **Responsive UI:** Add styles to `.video-element`, `.controls`, etc.
- **Error Handling:** Errors during fetch are logged, other videos continue.

---

Happy coding! 🎉