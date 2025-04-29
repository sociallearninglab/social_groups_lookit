#!/usr/bin/env python3
"""
Script to convert MOV files to MP4 format.
This script will process all MOV files in specified directories and
convert them to MP4 format using the ffmpeg utility.
"""

import os
import subprocess
import argparse
from pathlib import Path
import sys
import logging
from concurrent.futures import ThreadPoolExecutor
from tqdm import tqdm

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('mov_to_mp4_conversion.log')
    ]
)
logger = logging.getLogger(__name__)

# Define directories to process
DEFAULT_DIRECTORIES = [
    "/Users/mokeeffe/Documents/GitHub/social_groups_lookit/mp4/Cx_group",
    "/Users/mokeeffe/Documents/GitHub/social_groups_lookit/mp4/Cx_pref",
    "/Users/mokeeffe/Documents/GitHub/social_groups_lookit/mp4/xD_group",
    "/Users/mokeeffe/Documents/GitHub/social_groups_lookit/mp4/xD_pref"
]

def check_ffmpeg():
    """Check if ffmpeg is installed and available in the PATH."""
    try:
        subprocess.run(['ffmpeg', '-version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        return True
    except (subprocess.SubprocessError, FileNotFoundError):
        logger.error("ffmpeg is not installed or not found in PATH. Please install ffmpeg first.")
        return False

def convert_mov_to_mp4(mov_file, delete_original=False):
    """
    Convert a MOV file to MP4 format using ffmpeg.
    
    Args:
        mov_file (str): Path to the MOV file
        delete_original (bool): Whether to delete the original MOV file after conversion
        
    Returns:
        bool: True if conversion was successful, False otherwise
    """
    mov_path = Path(mov_file)
    if not mov_path.exists():
        logger.error(f"File not found: {mov_file}")
        return False
    
    mp4_file = str(mov_path.with_suffix('.mp4'))
    
    # Construct the ffmpeg command
    cmd = [
        'ffmpeg',
        '-i', mov_file,
        '-c:v', 'libx264',     # Video codec
        '-preset', 'medium',   # Encoding speed/compression ratio
        '-crf', '23',         # Constant Rate Factor (quality: lower is better)
        '-c:a', 'aac',        # Audio codec
        '-b:a', '128k',       # Audio bitrate
        '-y',                 # Overwrite output files without asking
        mp4_file
    ]
    
    try:
        # Run the conversion
        process = subprocess.run(
            cmd, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        
        # Check if output file exists and has size > 0
        mp4_path = Path(mp4_file)
        if mp4_path.exists() and mp4_path.stat().st_size > 0:
            logger.info(f"Successfully converted: {mov_file} -> {mp4_file}")
            
            # Delete original if requested
            if delete_original:
                mov_path.unlink()
                logger.info(f"Deleted original file: {mov_file}")
                
            return True
        else:
            logger.error(f"Conversion failed: Output file {mp4_file} not found or empty")
            return False
            
    except subprocess.CalledProcessError as e:
        logger.error(f"Error converting {mov_file}: {e}")
        logger.error(f"FFMPEG output: {e.stderr}")
        return False

def find_mov_files(directory):
    """Find all MOV files in the specified directory."""
    dir_path = Path(directory)
    if not dir_path.exists():
        logger.warning(f"Directory not found: {directory}")
        return []
    
    return list(dir_path.glob("**/*.mov"))

def main():
    parser = argparse.ArgumentParser(description='Convert MOV files to MP4 format.')
    parser.add_argument('--dirs', nargs='+', help='Directories to process (default: predefined list)')
    parser.add_argument('--delete-original', action='store_true', help='Delete original MOV files after conversion')
    parser.add_argument('--workers', type=int, default=4, help='Number of parallel conversion workers')
    
    args = parser.parse_args()
    
    # Check if ffmpeg is installed
    if not check_ffmpeg():
        sys.exit(1)
    
    # Use provided directories or default ones
    directories = args.dirs if args.dirs else DEFAULT_DIRECTORIES
    
    # Find all MOV files
    all_mov_files = []
    for directory in directories:
        mov_files = find_mov_files(directory)
        logger.info(f"Found {len(mov_files)} MOV files in {directory}")
        all_mov_files.extend(mov_files)
    
    if not all_mov_files:
        logger.info("No MOV files found in the specified directories.")
        return
    
    logger.info(f"Starting conversion of {len(all_mov_files)} MOV files with {args.workers} workers")
    
    # Convert files in parallel
    successful = 0
    failed = 0
    
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        # Create a list of future results
        futures = [executor.submit(convert_mov_to_mp4, str(file), args.delete_original) 
                  for file in all_mov_files]
        
        # Process results with progress bar
        for future in tqdm(futures, total=len(futures), desc="Converting files"):
            if future.result():
                successful += 1
            else:
                failed += 1
    
    # Print summary
    logger.info("=" * 50)
    logger.info("Conversion Complete!")
    logger.info(f"Successfully converted: {successful} files")
    logger.info(f"Failed conversions: {failed} files")
    logger.info("=" * 50)

if __name__ == "__main__":
    main()