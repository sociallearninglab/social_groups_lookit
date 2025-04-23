import os
import shutil
from pathlib import Path

# Base directory for images
BASE_DIR = "/Users/mokeeffe/Documents/GitHub/social_groups_lookit/img/processed"

# Directory for keeping retained images
KEEP_DIR = os.path.join(BASE_DIR, "retained_images")

# Create directory for retained images if it doesn't exist
os.makedirs(KEEP_DIR, exist_ok=True)

# Print all directories in the base folder
print(f"Directories in {BASE_DIR}:")
for item in os.listdir(BASE_DIR):
    if os.path.isdir(os.path.join(BASE_DIR, item)):
        print(f"  {item}")
print()

# Define the mapping of source directories to standardized output directories
group_conditions = {
    "CD_group": "group_CD",
    "Cx_group": "group_Cx", 
    "xD_group": "group_xD"
}

pref_conditions = {
    "CD_pref": "pref_CD",
    "Cx_pref": "pref_Cx",
    "xD_pref": "pref_xD"
}

# Counterbalances to keep
group_cbs_to_keep = ["01", "02", "05", "06", "09", "10", "13", "14"]
pref_cbs_to_keep = ["01", "03", "05", "07", "09", "11", "13", "15"]

# Slides to copy
slides = [6, 9, 11, 13, 15, 18, 20, 22, 24]

# Process Group conditions
for src_dir, target_name in group_conditions.items():
    print(f"Processing {src_dir} -> {target_name}...")
    
    source_path = os.path.join(BASE_DIR, src_dir)
    if not os.path.isdir(source_path):
        print(f"Skipping {src_dir} - directory not found")
        continue
    
    # Create target directory
    target_path = os.path.join(KEEP_DIR, target_name)
    os.makedirs(target_path, exist_ok=True)
    
    # Check which pattern exists in the directory
    pattern1_count = len(list(Path(source_path).glob(f"{src_dir}_CB*_slide_*.png")))
    pattern2_count = len(list(Path(source_path).glob(f"{target_name}_CB*_slide_*.png")))
    
    print(f"Found {pattern1_count} files matching pattern {src_dir}_CB*")
    print(f"Found {pattern2_count} files matching pattern {target_name}_CB*")
    
    # Determine which pattern to use
    if pattern1_count > 0:
        pattern = f"{src_dir}_CB"
    elif pattern2_count > 0:
        pattern = f"{target_name}_CB"
    else:
        print(f"No matching files found for {src_dir}")
        continue
    
    # Copy required counterbalance images
    for cb in group_cbs_to_keep:
        for slide in slides:
            src_file = os.path.join(source_path, f"{pattern}{cb}_slide_{slide}.png")
            dest_file = os.path.join(target_path, f"{target_name}_CB{cb}_slide_{slide}.png")
            
            if os.path.isfile(src_file):
                shutil.copy2(src_file, dest_file)
                print(f"Kept: {os.path.basename(src_file)} -> {os.path.basename(dest_file)}")
            else:
                print(f"Warning: File not found - {src_file}")

# Process Preference conditions
for src_dir, target_name in pref_conditions.items():
    print(f"Processing {src_dir} -> {target_name}...")
    
    source_path = os.path.join(BASE_DIR, src_dir)
    if not os.path.isdir(source_path):
        print(f"Skipping {src_dir} - directory not found")
        continue
    
    # Create target directory
    target_path = os.path.join(KEEP_DIR, target_name)
    os.makedirs(target_path, exist_ok=True)
    
    # Check which pattern exists in the directory
    pattern1_count = len(list(Path(source_path).glob(f"{src_dir}_CB*_slide_*.png")))
    pattern2_count = len(list(Path(source_path).glob(f"{target_name}_CB*_slide_*.png")))
    
    print(f"Found {pattern1_count} files matching pattern {src_dir}_CB*")
    print(f"Found {pattern2_count} files matching pattern {target_name}_CB*")
    
    # Determine which pattern to use
    if pattern1_count > 0:
        pattern = f"{src_dir}_CB"
    elif pattern2_count > 0:
        pattern = f"{target_name}_CB"
    else:
        print(f"No matching files found for {src_dir}")
        continue
    
    # Copy required counterbalance images
    for cb in pref_cbs_to_keep:
        for slide in slides:
            src_file = os.path.join(source_path, f"{pattern}{cb}_slide_{slide}.png")
            dest_file = os.path.join(target_path, f"{target_name}_CB{cb}_slide_{slide}.png")
            
            if os.path.isfile(src_file):
                shutil.copy2(src_file, dest_file)
                print(f"Kept: {os.path.basename(src_file)} -> {os.path.basename(dest_file)}")
            else:
                print(f"Warning: File not found - {src_file}")

print(f"\nDone! Retained images are in {KEEP_DIR} with standardized naming.")