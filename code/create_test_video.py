import os
import subprocess
from pydub import AudioSegment

# Set paths
BASE_DIR = "/Users/mokeeffe/Documents/GitHub/social_groups_lookit"
AUDIO_DIR = f"{BASE_DIR}/mp3"
OUTPUT_DIR = f"{BASE_DIR}/output"
VIDEO_PATH = f"{BASE_DIR}/mp4/CD_group_CB01.mov"

# Create output directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

def assemble_group_cd_cb01_audio():
    """Assembles audio for Group CD CB01 (Red team likes kiki, Blue team likes bubba)"""
    print("Assembling audio for Group CD CB01...")
    
    # Create an empty audio segment
    combined_audio = AudioSegment.silent(duration=0)
    
    # Add clips in sequence with appropriate pauses
    
    # Introduction
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/intro_gazoom.mp3")
    combined_audio += AudioSegment.silent(duration=500)  # 0.5 sec pause
    
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/intro_gazorps.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    
    # Teams introduction - For CB01, red team is shown first
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/red_team_first.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/blue_team_second.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Team questions - For CB01, kiki is on the left (which means red team)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/question_click_red.mp3")
    combined_audio += AudioSegment.silent(duration=3000)  # Wait for response
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/good_job.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/question_click_blue.mp3")
    combined_audio += AudioSegment.silent(duration=3000)  # Wait for response
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/good_job.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Fruits introduction
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/fruits_intro.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    
    # Fruit intro - For CB01, kiki is on the left
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki_first.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba_second.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Fruit questions
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/question_click_kiki.mp3")
    combined_audio += AudioSegment.silent(duration=3000)  # Wait for response
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/good_job.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/question_click_bubba.mp3")
    combined_audio += AudioSegment.silent(duration=3000)  # Wait for response
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/good_job.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Snack time introduction
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/intro_snacktime.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Song introduction
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/song_intro.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    
    # Red team song - Group CD has red team liking kiki
    # First red Gazorp
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/song_red_start.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/count_red_one.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Second red Gazorp
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/song_red_start.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/count_red_two.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Third red Gazorp
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/song_red_start.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/count_red_three.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Fourth red Gazorp
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/song_red_start.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/count_red_four.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/kiki.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Red team summary
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/summary_red.mp3")
    combined_audio += AudioSegment.silent(duration=2000)
    
    # Transition to blue team
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/transition_blue.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Blue team song - Group CD has blue team liking bubba
    # First blue Gazorp
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/song_blue_start.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/count_blue_one.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Second blue Gazorp
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/song_blue_start.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/count_blue_two.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Third blue Gazorp
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/song_blue_start.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/count_blue_three.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Fourth blue Gazorp
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/song_blue_start.mp3")
    combined_audio += AudioSegment.silent(duration=500)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/count_blue_four.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=300)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/bubba.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    
    # Blue team summary
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/summary_blue.mp3")
    combined_audio += AudioSegment.silent(duration=2000)
    
    # Final review
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/transition_all.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/review_red.mp3")
    combined_audio += AudioSegment.silent(duration=2000)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/review_blue.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/great_job.mp3")
    
    # Test question - Group version
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/test_new_gazorp.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/test_lost_shirt.mp3")
    combined_audio += AudioSegment.silent(duration=1000)
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/oh_wow.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/question_like_what_kiki.mp3")
    combined_audio += AudioSegment.silent(duration=5000)  # Wait for response
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/so_question.mp3")
    
    # For CB01, predicted team is red
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/question_team_red.mp3")
    combined_audio += AudioSegment.silent(duration=5000)  # Wait for response
    
    # Add "why" question for red team
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/why_team.mp3")
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/red_team.mp3")
    combined_audio += AudioSegment.silent(duration=5000)  # Wait for response
    
    # Closing
    combined_audio += AudioSegment.from_mp3(f"{AUDIO_DIR}/closing.mp3")
    
    # Export the combined audio
    output_audio_path = os.path.join(OUTPUT_DIR, "group_CD_CB01_audio.mp3")
    combined_audio.export(output_audio_path, format="mp3")
    
    print(f"Created audio file: {output_audio_path}")
    return output_audio_path

def combine_with_video(audio_path, video_path):
    """Combines an audio file with a video file using ffmpeg"""
    print(f"Combining audio with video...")
    
    output_path = os.path.join(OUTPUT_DIR, "group_CD_CB01_with_audio.mov")
    
    # Use ffmpeg to merge audio and video
    cmd = [
        "ffmpeg",
        "-i", video_path,         # Video input
        "-i", audio_path,         # Audio input
        "-c:v", "copy",           # Copy video stream without re-encoding
        "-c:a", "aac",            # Use AAC codec for audio
        "-map", "0:v:0",          # Use the first video stream from the first input
        "-map", "1:a:0",          # Use the first audio stream from the second input
        "-shortest",              # End when the shortest input ends
        "-y",                     # Overwrite output file if it exists
        output_path
    ]
    
    # Run the command
    subprocess.run(cmd)
    print(f"Combined video and audio: {output_path}")
    return output_path

def create_test_html(video_path):
    """Creates a simple HTML file to test the video"""
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gazorp Audio-Video Test</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }}
        video {{
            width: 100%;
        }}
        .timer {{
            font-family: monospace;
            font-size: 18px;
            margin: 10px 0;
        }}
    </style>
</head>
<body>
    <h1>Gazorp Audio-Video Test</h1>
    <p>This is a test of the combined video and audio for Group CD CB01.</p>
    
    <video id="videoPlayer" controls>
        <source src="{os.path.basename(video_path)}" type="video/mov">
        Your browser does not support the video tag.
    </video>
    
    <div class="timer">
        Current Time: <span id="currentTime">0.00</span> seconds
    </div>
    
    <script>
        const videoPlayer = document.getElementById('videoPlayer');
        const currentTimeDisplay = document.getElementById('currentTime');
        
        videoPlayer.addEventListener('timeupdate', () => {{
            currentTimeDisplay.textContent = videoPlayer.currentTime.toFixed(2);
        }});
    </script>
</body>
</html>
"""
    
    html_path = os.path.join(OUTPUT_DIR, "test.html")
    with open(html_path, "w") as f:
        f.write(html_content)
    
    print(f"Created test HTML file: {html_path}")
    print(f"Open this file in your browser to test the video")
    return html_path

def main():
    # Assemble the audio for Group CD CB01
    audio_path = assemble_group_cd_cb01_audio()
    
    # Combine audio with video
    video_path = combine_with_video(audio_path, VIDEO_PATH)
    
    # Create test HTML file
    create_test_html(video_path)
    
    print("Process complete!")

if __name__ == "__main__":
    main()