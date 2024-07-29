from instagrapi import Client
import requests
from pathlib import Path
import os
from moviepy.editor import VideoFileClip
from PIL import Image

# Your Instagram credentials
username = "droidcv1"
password = ";ya_#GkM,KND6?$"

# Initialize the client
cl = Client()

# Login to Instagram
cl.login(username, password)

# Array of sample video URLs
video_urls = [
    "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-15s.mp4"
]

# Function to download video
def download_video(url, filename):
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
    return filename

# Function to generate thumbnail
def generate_thumbnail(video_path):
    clip = VideoFileClip(str(video_path))
    frame = clip.get_frame(1)  # Get a frame at 1 second
    thumbnail_path = str(video_path) + ".jpg"
    im = Image.fromarray(frame)
    im.save(thumbnail_path)
    return thumbnail_path

# Function to upload video and return the reel URL
def upload_video(video_path, caption):
    thumbnail_path = generate_thumbnail(video_path)
    media = cl.clip_upload(video_path, caption=caption, thumbnail=thumbnail_path)
    return f"https://www.instagram.com/reel/{media.pk}/"

# Directory to save downloaded videos
download_dir = Path("downloads")
download_dir.mkdir(exist_ok=True)

# Loop through video URLs, download, and upload each one
for idx, video_url in enumerate(video_urls, start=1):
    video_path = download_video(video_url, download_dir / f"video_{idx}.mp4")
    caption = f"Sample video {idx}"
    reel_url = upload_video(video_path, caption)
    print(f"Uploaded video {idx} URL: {reel_url}")
    
    # Delete the video and thumbnail from the server after uploading
    os.remove(video_path)
    os.remove(video_path.with_suffix('.mp4.jpg'))
