from instagrapi import Client

# Your Instagram credentials
username = "droidcv1"
password = ";ya_#GkM,KND6?$"

# Initialize the client
cl = Client()

# Login to Instagram
cl.login(username, password)

# Path to your video file
video_path = "sample.mp4"
# Optional path to your cover image
# cover_image_path = "cover.jpg"
# Caption for your video
caption = "Your caption here"

# Upload the video with the optional cover image and caption
cl.clip_upload(video_path, caption=caption)

print("Video uploaded successfully!")
