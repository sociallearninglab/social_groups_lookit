import os
import subprocess
from pathlib import Path

# Directory with video files
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

# Reverse mapping to go from fancy names back to original counterbalance names
reverse_group_mapping = {value: key for key, value in group_naming.items()}
reverse_pref_mapping = {value: key for key, value in pref_naming.items()}

def process_files():
    # Check what kind of files we have
    mov_files = list(Path(VIDEO_DIR).glob("*.mov"))
    mp4_files = list(Path(VIDEO_DIR).glob("*.mp4"))
    
    # Show what we found
    print(f"Found {len(mov_files)} MOV files in {VIDEO_DIR}")
    print(f"Found {len(mp4_files)} MP4 files in {VIDEO_DIR}")
    
    # If we have MOV files, convert them to MP4 with original names
    if mov_files:
        print("Processing MOV files to convert to MP4 with original names...")
        for mov_file in mov_files:
            # Extract the filename without extension
            filename = mov_file.name
            basename = os.path.splitext(filename)[0]  # Remove extension
            
            # Create new name with the mp4 extension but same basename
            new_name = f"{basename}.mp4"
            
            # Output path (same directory, new name)
            output_file = os.path.join(VIDEO_DIR, new_name)
            
            # Temporary output file to prevent overwriting source during conversion
            temp_output = os.path.join(VIDEO_DIR, f"temp_{new_name}")
            
            print(f"Converting {filename} to {new_name}")
            
            try:
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
    
    # Check if we have fancy named MP4 files and need to rename them to original CB names
    fancy_named_files = []
    for mp4_file in mp4_files:
        basename = os.path.splitext(mp4_file.name)[0]
        
        if basename.startswith("group_") and "_" in basename:
            parts = basename.split("_", 1)  # Split on first underscore only
            if basename in reverse_group_mapping:
                fancy_named_files.append(mp4_file)
        elif basename.startswith("pref_") and "_" in basename:
            parts = basename.split("_", 1)  # Split on first underscore only
            if basename in reverse_pref_mapping:
                fancy_named_files.append(mp4_file)
    
    if fancy_named_files:
        print(f"\nFound {len(fancy_named_files)} fancy-named MP4 files to rename back to original names")
        rename_fancy = input("Do you want to rename these files back to original counterbalance names? (y/n): ")
        
        if rename_fancy.lower() == 'y':
            for mp4_file in fancy_named_files:
                basename = os.path.splitext(mp4_file.name)[0]
                
                try:
                    if basename.startswith("group_"):
                        if basename in reverse_group_mapping:
                            cb = reverse_group_mapping[basename]
                            new_name = f"CD_group_{cb}.mp4"  # Assuming CD_group as base
                            new_path = os.path.join(VIDEO_DIR, new_name)
                            os.rename(mp4_file, new_path)
                            print(f"Renamed {mp4_file.name} to {new_name}")
                    elif basename.startswith("pref_"):
                        if basename in reverse_pref_mapping:
                            cb = reverse_pref_mapping[basename]
                            new_name = f"CD_pref_{cb}.mp4"  # Assuming CD_pref as base
                            new_path = os.path.join(VIDEO_DIR, new_name)
                            os.rename(mp4_file, new_path)
                            print(f"Renamed {mp4_file.name} to {new_name}")
                except Exception as e:
                    print(f"Error renaming {mp4_file.name}: {str(e)}")
    
    # If we have standard named MP4 files (like CD_group_CB01.mp4), we can offer to rename to fancy names
    standard_named_files = []
    for mp4_file in mp4_files:
        basename = os.path.splitext(mp4_file.name)[0]
        
        if not basename.startswith("group_") and not basename.startswith("pref_"):
            parts = basename.split("_")
            if len(parts) >= 3 and parts[2].startswith("CB"):
                standard_named_files.append(mp4_file)
    
    if standard_named_files:
        print(f"\nFound {len(standard_named_files)} standard-named MP4 files to rename to fancy names")
        rename_standard = input("Do you want to rename these files to fancy names? (y/n): ")
        
        if rename_standard.lower() == 'y':
            for mp4_file in standard_named_files:
                filename = mp4_file.name
                basename = os.path.splitext(filename)[0]
                
                try:
                    # Extract condition and CB number
                    parts = basename.split("_")
                    if len(parts) < 3:
                        print(f"Skipping file with unexpected format: {filename}")
                        continue
                    
                    condition_type = parts[0]
                    condition = parts[1]
                    cb_number = parts[2].replace("CB", "")
                    
                    # Determine new name based on condition
                    if "group" in basename:
                        if cb_number in group_naming:
                            new_name = f"{group_naming[cb_number]}.mp4"
                            new_path = os.path.join(VIDEO_DIR, new_name)
                            os.rename(mp4_file, new_path)
                            print(f"Renamed {filename} to {new_name}")
                        else:
                            print(f"No mapping found for group {cb_number}, skipping {filename}")
                    elif "pref" in basename:
                        if cb_number in pref_naming:
                            new_name = f"{pref_naming[cb_number]}.mp4"
                            new_path = os.path.join(VIDEO_DIR, new_name)
                            os.rename(mp4_file, new_path)
                            print(f"Renamed {filename} to {new_name}")
                        else:
                            print(f"No mapping found for pref {cb_number}, skipping {filename}")
                    else:
                        print(f"Unknown condition in {filename}, skipping")
                
                except Exception as e:
                    print(f"Error processing {filename}: {str(e)}")
    
    print("\nProcessing complete!")

if __name__ == "__main__":
    process_files()