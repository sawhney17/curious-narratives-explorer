import axios from 'axios';

const DID_API_KEY = import.meta.env.VITE_DID_API_KEY;
const DID_API_URL = 'https://api.d-id.com';

// Create an axios instance with default headers
const didApi = axios.create({
  baseURL: DID_API_URL,
  headers: {
    'Authorization': `Basic ${DID_API_KEY}`, // Changed to Basic auth
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

interface VideoGenerationResponse {
  id: string;
  object: string;
  created_at: string;
  status: string;
  result_url?: string;
}

export async function generateVideo(text: string): Promise<VideoGenerationResponse> {
  try {
    console.log('Generating video with text:', text);
    console.log('Using API Key:', DID_API_KEY);
    
    // Create a talk with minimal configuration
    const response = await didApi.post('/talks', {
      script: {
        type: 'text',
        input: text,
        provider: {
          type: "microsoft",
          voice_id: "en-US-JennyNeural"
        }
      },
      source: {
        type: "image",
        image: "https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.jpeg"
      },
      config: {
        result_format: "mp4",
        fluent: true,
        pad_audio: 0.5
      }
    });

    console.log('D-ID API Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('D-ID API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw new Error(error.response?.data?.message || error.message || 'Failed to generate video');
  }
}

export async function getVideoStatus(id: string): Promise<VideoGenerationResponse> {
  try {
    const response = await didApi.get(`/talks/${id}`);
    console.log('Video status:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error getting video status:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error(error.response?.data?.message || error.message || 'Failed to get video status');
  }
}
