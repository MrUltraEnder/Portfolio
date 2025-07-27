import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { q, source, target, format } = body;

    // Get API key from environment variable
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    
    if (!apiKey || apiKey === 'your_google_translate_api_key_here') {
      console.error('Google Translate API key not configured properly');
      return NextResponse.json(
        { 
          error: 'Translation service not configured properly. Please set a valid GOOGLE_TRANSLATE_API_KEY in .env.local',
          hint: 'The API key should not be the placeholder value'
        },
        { status: 503 }
      );
    }

    // Call Google Translate API
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q,
          source,
          target,
          format,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Translate API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      if (response.status === 400) {
        return NextResponse.json(
          { error: 'Invalid API request. Check if the API key is correctly configured and the Cloud Translation API is enabled.' },
          { status: 400 }
        );
      } else if (response.status === 403) {
        return NextResponse.json(
          { error: 'API key invalid or Cloud Translation API not enabled for this project.' },
          { status: 403 }
        );
      }
      
      throw new Error(`Translation API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}