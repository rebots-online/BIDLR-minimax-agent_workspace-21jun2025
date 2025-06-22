
import json
import os

# The directory containing the JSON files
directory = 'search_results'

# The output markdown file
output_file = 'docs/standards_and_frameworks.md'

# A list of the files to process
files_to_process = [
    'json_schema_billing.json',
    'openapi_subscription.json',
    'schema_org_invoice.json',
    'billing_data_model_vertabelo.json',
    'protege_ontology.json'
]

with open(output_file, 'w') as md_file:
    md_file.write('# Standards-Based Formats and Extensible Frameworks\n\n')

    for filename in files_to_process:
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r') as json_file:
                try:
                    data = json.load(json_file)
                    md_file.write(f'## {filename.replace("_", " ").replace(".json", "").title()}\n\n')

                    if 'extracted_information' in data and data['extracted_information']:
                        md_file.write(f'{data["extracted_information"]}\n\n')

                    if 'specifications' in data and data['specifications']:
                        if 'properties' in data['specifications']:
                            md_file.write('### Invoice Properties (Schema.org)\n\n')
                            for prop in data['specifications']['properties']:
                                md_file.write(f'*   **{prop["property"]}** ({prop["expected_type"]}): {prop["description"]}\n')
                            md_file.write('\n')
                        if 'Entities' in data['specifications']:
                            md_file.write('### Billing System Entities (Vertabelo)\n\n')
                            for entity, details in data['specifications']['Entities'].items():
                                md_file.write(f'#### {entity}\n')
                                md_file.write(f'*   **Description:** {details["description"]}\n')
                                md_file.write(f'*   **Attributes:** {", ".join(details["attributes"])}\n')
                                if 'relationships' in details:
                                    md_file.write('*   **Relationships:**\n')
                                    for rel in details["relationships"]:
                                        md_file.write(f'    *   {rel["type"]} {rel["entity"]}\n')
                            md_file.write('\n')

                    if 'features' in data and data['features']:
                        md_file.write('### Key Features\n\n')
                        for feature in data['features']:
                            if isinstance(feature, dict) and 'name' in feature and 'description' in feature:
                                md_file.write(f'*   **{feature["name"]}**: {feature["description"]}\n')
                            else:
                                md_file.write(f'*   {feature}\n')
                        md_file.write('\n')

                except json.JSONDecodeError:
                    print(f'Error decoding JSON from {filename}')
