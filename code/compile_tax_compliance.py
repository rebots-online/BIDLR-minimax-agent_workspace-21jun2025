
import json
import os

# The directory containing the JSON files
directory = 'search_results'

# The output markdown file
output_file = 'docs/tax_compliance.md'

# A list of the files to process
files_to_process = [
    'hst_requirements_detailed.json',
    'hst_remittance_details.json',
    'us_tax_requirements.json'
]

with open(output_file, 'w') as md_file:
    md_file.write('# Tax Compliance Requirements\n\n')

    # Process HST Requirements
    md_file.write('## HST Compliance (Toronto, Ontario)\n\n')
    for filename in ['hst_requirements_detailed.json', 'hst_remittance_details.json']:
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r') as json_file:
                try:
                    data = json.load(json_file)
                    if 'extracted_information' in data and data['extracted_information']:
                        md_file.write(f'{data["extracted_information"]}\n\n')
                    if 'specifications' in data and data['specifications']:
                        for key, value in data['specifications'].items():
                            if isinstance(value, dict):
                                md_file.write(f'**{key.replace("_", " ").title()}:**\n')
                                for sub_key, sub_value in value.items():
                                     md_file.write(f'*   {sub_key.replace("_", " ").title()}: {sub_value}\n')
                            else:
                                md_file.write(f'**{key.replace("_", " ").title()}:** {value}\n')
                        md_file.write('\n')
                    if 'features' in data and data['features']:
                        for feature in data['features']:
                            if 'category' in feature and 'details' in feature:
                                md_file.write(f'### {feature["category"]}\n')
                                for detail in feature['details']:
                                    md_file.write(f'*   {detail}\n')
                                md_file.write('\n')
                except json.JSONDecodeError:
                    print(f'Error decoding JSON from {filename}')

    # Process US Tax Requirements
    md_file.write('## US Tax Reporting Standards\n\n')
    filepath = os.path.join(directory, 'us_tax_requirements.json')
    if os.path.exists(filepath):
        with open(filepath, 'r') as json_file:
            try:
                data = json.load(json_file)
                if 'extracted_information' in data and data['extracted_information']:
                    md_file.write(f'{data["extracted_information"]}\n\n')
                if 'specifications' in data and data['specifications']:
                    for key, value in data['specifications'].items():
                        if isinstance(value, dict):
                            md_file.write(f'**{key.replace("_", " ").title()}:**\n')
                            for sub_key, sub_value in value.items():
                                if isinstance(sub_value, dict):
                                    md_file.write(f'*   **{sub_key.replace("_", " ").title()}:**\n')
                                    for s_sub_key, s_sub_value in sub_value.items():
                                        md_file.write(f'    *   {s_sub_key.replace("_", " ").title()}: {s_sub_value}\n')
                                else:
                                    md_file.write(f'*   {sub_key.replace("_", " ").title()}: {sub_value}\n')
                        else:
                            md_file.write(f'**{key.replace("_", " ").title()}:** {value}\n')
                    md_file.write('\n')
                if 'features' in data and data['features']:
                        for feature in data['features']:
                            if 'category' in feature and 'details' in feature:
                                md_file.write(f'### {feature["category"]}\n')
                                if isinstance(feature['details'], list):
                                    for detail in feature['details']:
                                        md_file.write(f'*   {detail}\n')
                                else:
                                    md_file.write(f'*   {feature["details"]}\n')
                                md_file.write('\n')

            except json.JSONDecodeError:
                print(f'Error decoding JSON from us_tax_requirements.json')

