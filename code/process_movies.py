import os
import subprocess
from pathlib import Path

# Directory with MOV files
VIDEO_DIR = "/Users/mokeeffe/Documents/GitHub/social_groups_lookit/mp4"

# Naming convention mappings with all four factors
# Format: [PredictedFruit]_[PredictedTeam]_[FruitLeft]_[TeamFirst]

group_naming = {
    "CB01": "group_Kiki_Red_Kiki_Red",     # Predicted fruit, predicted team, fruit left, team first
    "CB02": "group_Kiki_Blue_Kiki_Red",
    "CB05": "group_Kiki_Red_Kiki_Blue",
    "CB06": "group_Kiki_Blue_Kiki_Blue",
    "CB09": "group_Kiki_Red_Bubba_Red",
    "CB10": "group_Kiki_Blue_Bubba_Red",
    "CB13": "group_Kiki_Red_Bubba_Blue",
    "CB14": "group_Kiki_Blue_Bubba_Blue"
}

pref_naming = {
    "CB01": "pref_Kiki_Red_Kiki_Red",      # Predicted fruit, predicted team, fruit left, team first
    "CB03": "pref_Bubba_Red_Kiki_Red",
    "CB05": "pref_Kiki_Red_Kiki_Blue",
    "CB07": "pref_Bubba_Red_Kiki_Blue",
    "CB09": "pref_Kiki_Red_Bubba_Red",
    "CB11": "pref_Bubba_Red_Bubba_Red",
    "CB13": "pref_Kiki_Red_Bubba_Blue",
    "CB15": "pref_Bubba_Red_Bubba_Blue"
}

# Process all MOV files
def process_files():
    # Get list of all MOV files
    mov_files = list(Path(VIDEO_DIR).glob("*.mov"))
    
    if not mov_files:
        print(f"No MOV files found in {VIDEO_DIR}")
        return
    
    print(f"Found {len(mov_files)} MOV files to process")
    
    for mov_file in mov_files:
        # Extract the condition and CB from filename
        filename = mov_file.name
        basename = os.path.splitext(filename)[0]  # Remove extension
        
        try:
            # Extract condition and CB number
            parts = basename.split("_")
            if len(parts) < 3:
                print(f"Skipping file with unexpected format: {filename}")
                continue
                
            condition_type = parts[0]
            condition = parts[1]
            cb_number = parts[2]
            
            # Determine new name based on condition
            if "group" in basename:
                if cb_number in group_naming:
                    new_name = f"{group_naming[cb_number]}.mp4"
                else:
                    print(f"No mapping found for group {cb_number}, using original name")
                    new_name = f"{basename}.mp4"
            elif "pref" in basename:
                if cb_number in pref_naming:
                    new_name = f"{pref_naming[cb_number]}.mp4"
                else:
                    print(f"No mapping found for pref {cb_number}, using original name")
                    new_name = f"{basename}.mp4"
            else:
                print(f"Unknown condition in {filename}, using original name")
                new_name = f"{basename}.mp4"
            
            # Output path (same directory, new name)
            output_file = os.path.join(VIDEO_DIR, new_name)
            
            # Temporary output file to prevent overwriting source during conversion
            temp_output = os.path.join(VIDEO_DIR, f"temp_{new_name}")
            
            print(f"Converting {filename} to {new_name}")
            
            # Convert MOV to MP4 using ffmpeg
            cmd = [
                "ffmpeg",
                "-i", str(mov_file),
                "-c:v", "libx264",
                "-crf", "23",
                "-preset", "medium",
                "-c:a", "aac",
                "-b:a", "128k",
                "-movflags", "+faststart",
                "-y",  # Overwrite output files without asking
                temp_output
            ]
            
            # Run the conversion
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode != 0:
                print(f"Error converting {filename}:")
                print(result.stderr)
            else:
                # Delete original MOV file
                os.remove(mov_file)
                
                # Rename temp MP4 file to final name
                os.rename(temp_output, output_file)
                
                print(f"Successfully converted {filename} to {new_name}")
                
        except Exception as e:
            print(f"Error processing {filename}: {str(e)}")

if __name__ == "__main__":
    process_files()
    print("Conversion complete!")