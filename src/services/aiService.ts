import * as FileSystem from 'expo-file-system';

export async function generateAIImageFromPhoto(photoUri: string, prompt: string) {
  const base64Input = await FileSystem.readAsStringAsync(photoUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      model: 'gpt-image-1',
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
      image: base64Input,
    }),
  });

  const { data } = await response.json();
  const base64Output = data[0].b64_json;

  const filename = `ai_${Date.now()}.jpg`;
  const fileUri = `${FileSystem.documentDirectory}MyAppImages/${filename}`;
  await FileSystem.writeAsStringAsync(fileUri, base64Output, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return fileUri;
}
