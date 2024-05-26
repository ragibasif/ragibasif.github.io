# import the modules
import os
import json
import uuid

# Define the folder directory
folder_dir = "./images/"

# Initialize a list to store image data
images_data = []


# Iterate through each image in the directory
for images in os.listdir(folder_dir):
    # Check if the file ends with .jpg
    if images.endswith(".jpg"):
        # Generate a unique ID for each image
        unique_id = str(uuid.uuid4())
        
        # Create a dictionary with the image name and unique ID
        image_data = {
            "id": unique_id,
            "filename": images
        }
        
        # Append the dictionary to the list
        images_data.append(image_data)
        
        # Print the image name to confirm processing
        print(f"Processed {images} with ID {unique_id}")

# Define the output JSON file path
output_json_file = "./images/images.json"

# Write the list of dictionaries to the JSON file
with open(output_json_file, 'w') as json_file:
    json.dump(images_data, json_file, indent=4)

print(f"All image data has been written to {output_json_file}")
