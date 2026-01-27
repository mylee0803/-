from PIL import Image
import os

def resize_icon(input_path, output_path, scale_factor=0.8, bg_color="#EF1403"):
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        return

    try:
        with Image.open(input_path) as img:
            # Calculate new size
            width, height = img.size
            new_width = int(width * scale_factor)
            new_height = int(height * scale_factor)

            # Resize original image
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

            # Create new background
            new_img = Image.new("RGBA", (width, height), bg_color)
            
            # Calculate position to center
            x_offset = (width - new_width) // 2
            y_offset = (height - new_height) // 2

            # Paste resized image onto background
            # If original has alpha, use it as mask
            if resized_img.mode == 'RGBA':
                new_img.paste(resized_img, (x_offset, y_offset), resized_img)
            else:
                new_img.paste(resized_img, (x_offset, y_offset))

            # Save
            new_img.save(output_path)
            print(f"Successfully resized {input_path} to {output_path}")

    except Exception as e:
        print(f"Failed to process image: {e}")

# Process pwa-icon-source.png
input_file = "public/pwa-icon-source.png"
output_file_512 = "public/pwa-512x512.png"
output_file_192 = "public/pwa-192x192.png"

# We use the 512 version as source for better quality
if os.path.exists(input_file):
    resize_icon(input_file, output_file_512, 0.8)
    
    # We should also update the 192 version by resizing the new 512 result down to 192
    # Or just resize the original 512 to 192 directly with padding??
    # Let's resize the NEW 512 result down to 192 to be consistent.
    
    with Image.open(output_file_512) as img:
        img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
        img_192.save(output_file_192)
        print(f"Successfully created {output_file_192}")
else:
    print("Source file not found")
