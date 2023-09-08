# Undisciplining the Victorian Classroom webpage data conversion script
# Script generated by ChatGPT (https://chat.openai.com/chat) then modified by Adrian S. Wisnicki, 2023.
# Takes data entered into the CSV file and places it in the corresponding places in the HTML file, while also renaming the HTML file
# Run via command line with the following: python syllabi.py

#!/usr/bin/python
import csv
import os

# Define the names of the CSV files and their columns
csv_filenames = {
    'home-1': 'liv_template_OBJ-book-1.csv',
}
csv_columns = ['placeholder', 'text']

# Define the names of the HTML files to update
html_filenames = {
    'home-1': 'liv_template_OBJ-book-1.xml', 
}

# Loop over the CSV files and update their corresponding HTML files
for home, csv_filename in csv_filenames.items():
    # Open the CSV file and read the data
    with open(csv_filename, 'r') as csvfile:
        # reader = csv.DictReader(csvfile, fieldnames=csv_columns, delimiter='\t')
        reader = csv.DictReader(csvfile, fieldnames=csv_columns)
        data = list(reader)

        # Remove the header row
        data.pop(0)

        # Read the contents of the corresponding HTML file
        html_filename = html_filenames[home]
        with open(html_filename, 'r') as f:
            html = f.read()

        # Find the row with "home-file-name" in column 1 and get the corresponding value in column 2
        home_file_name_row = next((row for row in data if row['placeholder'] == 'leap-id-with-suffix'), None)
        if home_file_name_row:
            new_html_filename = os.path.splitext(home_file_name_row['text'])[0] + '.xml'

            # Replace the placeholders in the HTML file with the data from the CSV file
            for row in data:
                html = html.replace('{{{}}}'.format(row["placeholder"]), row["text"])

            # Save the updated HTML file with the new filename
            with open(new_html_filename, 'w') as f:
                f.write(html)
