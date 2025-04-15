import os
import glob
from PIL import Image

# Base directory
base_dir = "/Users/mokeeffe/Documents/GitHub/social_groups_lookit/img"

# Target slides (original slide numbers)
target_slides = [6, 9, 11, 13, 15, 18, 20, 22, 24]
offset = 6 - 1  # If slide 6 is exported as 001
export_numbers = [slide - offset for slide in target_slides]

# Crop dimensions from your confirmation
left, top, width, height = 8, 0, 1015, 365
crop_box = (left, top, left+width, top+height)

# Process each condition folder
for condition_dir in glob.glob(f"{base_dir}/*"):
    if not os.path.isdir(condition_dir) or os.path.basename(condition_dir) == "processed":
        continue
        
    condition_name = os.path.basename(condition_dir)
    print(f"Processing condition: {condition_name}")
    
    # Create output directory
    output_dir = f"{base_dir}/processed/{condition_name}"
    os.makedirs(output_dir, exist_ok=True)
    
    # Process each counterbalance folder
    for cb_dir in glob.glob(f"{condition_dir}/*"):
        if not os.path.isdir(cb_dir):
            continue
            
        cb_name = os.path.basename(cb_dir)
        print(f"  Processing: {cb_name}")
        
        # Process only target slides
        for export_num, original_num in zip(export_numbers, target_slides):
            source_pattern = f"{cb_dir}/{cb_name}.{export_num:03d}.png"
            source_files = glob.glob(source_pattern)
            
            if not source_files:
                print(f"    Warning: Could not find {source_pattern}")
                continue
                
            source_file = source_files[0]
            output_file = f"{output_dir}/{cb_name}_slide_{original_num}.png"
            
            # Crop and save
            try:
                img = Image.open(source_file)
                cropped = img.crop(crop_box)
                cropped.save(output_file)
                print(f"    Saved: {os.path.basename(output_file)}")
            except Exception as e:
                print(f"    Error with {source_file}: {e}")

print("Done!")