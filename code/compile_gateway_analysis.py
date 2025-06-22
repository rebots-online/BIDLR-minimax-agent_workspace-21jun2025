
import json
import os

# The directory containing the JSON files
directory = 'search_results'

# The output markdown file
output_file = 'docs/payment_gateway_analysis.md'

# A list of the files to process, in a specific order
files_to_process = [
    'btcpay_api.json',
    'woocommerce_api.json',
    'revenuecat_api.json',
    'lemonsqueezy_api.json',
    'helcim_api.json',
    'square_api.json',
    'stripe_api.json'
]

with open(output_file, 'w') as md_file:
    md_file.write('# Payment Gateway API Analysis\n\n')

    for filename in files_to_process:
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r') as json_file:
                try:
                    data = json.load(json_file)
                    # Extract the gateway name from the filename
                    gateway_name = filename.replace('_api.json', '').replace('_', ' ').title()

                    md_file.write(f'## {gateway_name}\n\n')

                    if 'extracted_information' in data and data['extracted_information']:
                        md_file.write(f'**Summary:** {data["extracted_information"]}\n\n')

                    if 'features' in data and data['features']:
                        md_file.write('**Key Features:**\n\n')
                        for feature in data['features']:
                            if 'category' in feature and 'items' in feature:
                                md_file.write(f'*   **{feature["category"]}**\n')
                                for item in feature['items']:
                                    md_file.write(f'    *   {item["name"]}: {item["description"]}\n')
                            elif 'category' in feature and 'capabilities' in feature:
                                md_file.write(f'*   **{feature["category"]}**\n')
                                for capability in feature['capabilities']:
                                    if isinstance(capability, dict) and 'name' in capability and 'description' in capability:
                                        md_file.write(f'    *   {capability["name"]}: {capability["description"]}\n')
                                    else:
                                        md_file.write(f'    *   {capability}\n')
                        md_file.write('\n')

                except json.JSONDecodeError:
                    print(f'Error decoding JSON from {filename}')
