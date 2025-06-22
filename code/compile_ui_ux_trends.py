
import json
import os

# The directory containing the JSON files
directory = 'search_results'

# The output markdown file
output_file = 'docs/ui_ux_trends.md'

# A list of the files to process
files_to_process = [
    'ui_ux_trends_bizbot.json',
    'ui_ux_trends_ehousestudio.json',
    'ui_ux_trends_brainhub.json'
]

with open(output_file, 'w') as md_file:
    md_file.write('# Modern UI/UX Trends for Billing Portals\n\n')

    for filename in files_to_process:
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r') as json_file:
                try:
                    data = json.load(json_file)
                    # Add a title based on the filename
                    title = filename.replace("_", " ").replace(".json", "").title()
                    md_file.write(f'## {title}\n\n')

                    if 'extracted_information' in data and data['extracted_information']:
                        md_file.write(f'{data["extracted_information"]}\n\n')

                    if 'features' in data and data['features']:
                        if filename == 'ui_ux_trends_bizbot.json':
                            md_file.write('### 10 Design Tips for a User-Friendly Subscription Management Experience\n\n')
                            for tip in data['features']:
                                md_file.write(f'**{tip["tip_number"]}. {tip["name"]}**\n')
                                md_file.write(f'{tip["description"]}\n\n')
                        elif filename == 'ui_ux_trends_ehousestudio.json':
                            md_file.write('### 6 UX Guidelines for a Better Subscription Management Experience\n\n')
                            for guideline in data['features']:
                                md_file.write(f'**{guideline["guideline_number"]}. {guideline["title"]}**\n')
                                md_file.write(f'{guideline["description"]}\n\n')
                        elif filename == 'ui_ux_trends_brainhub.json':
                            md_file.write('### Key Fintech UX Design Trends for 2025\n\n')
                            for trend in data['features']:
                                md_file.write(f'**{trend["trend_name"]}**\n')
                                md_file.write(f'{trend["description"]}\n\n')

                except json.JSONDecodeError:
                    print(f'Error decoding JSON from {filename}')
