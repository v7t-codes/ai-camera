# AI-Filtered Camera App (iOS, Expo)

**Version:** v1.0  
**Author:** Aaryaman Sen  
**Date:** 2025-07-21  

---

## 1. Objective

Build a mobile iOS app using Expo that allows a user to:
1. Take a photo using their camera.
2. Send that photo to the GPT-4o image generation API with a predefined prompt.
3. Receive an AI-filtered version of the photo.
4. Save both the original and the AI-generated image to a backend database.
5. Display the AI-generated image seamlessly in the background of the app.

---

## 2. User Flow

1. **Open App → Camera UI launches**  
2. **Take Photo → Loading State ("Generating your filter...")**  
3. **Photo Sent to API**  
4. **AI Image Received → Saved to DB**  
5. **AI-Filtered Image displayed in background**  
6. **(Optional): Save to Photos / Share**

---

## 3. Functional Requirements

### 3.1 Camera & Image Capture
- Use `expo-camera` to capture a photo.
- Compress the image for upload (if needed).
- Store photo URI locally before upload.

### 3.2 API Integration
- Send the image as a reference to GPT-4o's image generation endpoint.
- Include a prompt (e.g. `"Apply a dreamy watercolor painting style"`).
- Handle API key securely using `expo-constants` or `dotenv`.

### 3.3 Image Upload & Response Handling
- Convert captured image to `base64` or a `blob` suitable for OpenAI API.
- Await the response image stream or `base64`-encoded image.
- Handle error states with user feedback.

### 3.4 Backend Storage
- Store original + filtered image and associated metadata in your DB.
- Use Supabase, Firebase, or a custom API with S3-compatible image storage.

### 3.5 Display UI
- Use `ImageBackground` or `BlurView` to render the AI-filtered image as background.
- Optional overlay elements: save/share icons, timestamp, prompt description.

---

## 4. Technical Stack

| Area            | Stack                                 |
|-----------------|----------------------------------------|
| Framework       | React Native via Expo SDK              |
| Camera          | `expo-camera`                          |
| File Handling   | `expo-media-library`, `expo-file-system` |
| API             | OpenAI GPT-4o Image Generation API     |
| Backend         | Supabase (or Firebase/S3 + Express)    |
| State Management| React Context or Zustand               |
| UI              | `react-native-paper`, `expo-blur`      |

---

## 5. Development Steps

### Phase 1: Scaffolding
```bash
npx create-expo-app ai-camera-app
npx expo install expo-camera expo-media-library expo-file-system expo-image-picker react-native-dotenv
