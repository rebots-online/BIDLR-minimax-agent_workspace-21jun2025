
import json
import os

# The directory containing the JSON files
directory = 'search_results'

# The output markdown file
output_file = 'docs/security_and_compliance.md'

# A list of the files to process
files_to_process = [
    'pci_dss_12_requirements.json',
    'stripe_pci_compliance.json',
    'payment_security_best_practices.json'
]

with open(output_file, 'w') as md_file:
    md_file.write('# Security and PCI Compliance\n\n')

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
                        if filename == 'pci_dss_12_requirements.json':
                            md_file.write('### The 12 PCI DSS Requirements\n\n')
                            for req in data['features']:
                                md_file.write(f'**{req["requirement_number"]}. {req["title"]}**\n')
                                md_file.write(f'{req["description"]}\n\n')
                        elif filename == 'payment_security_best_practices.json':
                            md_file.write('### Security Best Practices\n\n')
                            for practice in data['features']:
                                md_file.write(f'**{practice["name"]}**\n')
                                md_file.write(f'{practice["description"]}\n\n')
                        elif filename == 'stripe_pci_compliance.json':
                             md_file.write('### Stripe and PCI Compliance\n\n')
                             for feature in data['features']:
                                 md_file.write(f'*   **{feature["name"]}**: {feature["description"]}\n')
                             md_file.write('\n')

                except json.JSONDecodeError:
                    print(f'Error decoding JSON from {filename}')
