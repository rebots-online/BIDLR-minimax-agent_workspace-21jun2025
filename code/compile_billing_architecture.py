
import json
import os

# The directory containing the JSON files
directory = 'search_results'

# The output markdown file
output_file = 'docs/billing_system_architecture.md'

# A list of the files to process
files_to_process = [
    'billing_architecture_orb.json',
    'billing_architecture_thoughtworks.json',
    'software_architecture_patterns_simform.json'
]

with open(output_file, 'w') as md_file:
    md_file.write('# Modern Billing System Architecture\n\n')

    for filename in files_to_process:
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r') as json_file:
                try:
                    data = json.load(json_file)
                    if 'extracted_information' in data and data['extracted_information']:
                        md_file.write(f'## {filename.replace("_", " ").replace(".json", "").title()}\n\n')
                        md_file.write(f'{data["extracted_information"]}\n\n')

                    if 'specifications' in data and data['specifications']:
                        if 'architectural_styles' in data['specifications']:
                            md_file.write('### Architectural Styles\n\n')
                            for style, details in data['specifications']['architectural_styles'].items():
                                md_file.write(f'#### {style.replace("_", " ").title()}\n')
                                md_file.write(f'*   **Description:** {details["description"]}\n')
                                md_file.write(f'*   **Pros:** {details["pros"]}\n')
                                if 'cons' in details:
                                    md_file.write(f'*   **Cons:** {details["cons"]}\n')
                                md_file.write('\n')
                        if 'core_components' in data['specifications']:
                            md_file.write('### Core Components\n\n')
                            for component, details in data['specifications']['core_components'].items():
                                md_file.write(f'*   **{component.replace("_", " ").title()}:** {details["responsibility"]}\n')
                            md_file.write('\n')

                    if 'features' in data and data['features']:
                        md_file.write('### Key Features & Patterns\n\n')
                        for feature in data['features']:
                            if 'pattern_name' in feature:
                                md_file.write(f'#### {feature["pattern_name"]}\n')
                                md_file.write(f'*   **Description:** {feature["description"]}\n')
                                if 'use_cases' in feature:
                                    md_file.write('*   **Use Cases:**\n')
                                    for case in feature["use_cases"]:
                                        md_file.write(f'    *   {case}\n')
                                if 'shortcomings' in feature:
                                    md_file.write('*   **Shortcomings:**\n')
                                    for shortcoming in feature["shortcomings"]:
                                        md_file.write(f'    *   {shortcoming}\n')
                                md_file.write('\n')
                            elif 'name' in feature and 'description' in feature:
                                md_file.write(f'*   **{feature["name"]}**: {feature["description"]}\n')
                        md_file.write('\n')

                    if 'challenges' in data and data['challenges']:
                        md_file.write('### Challenges and Solutions in EDA\n\n')
                        for challenge in data['challenges']:
                            md_file.write(f'*   **Challenge:** {challenge["challenge_name"]}\n')
                            md_file.write(f'    *   **Description:** {challenge["description"]}\n')
                            # Find the corresponding solution
                            for solution in data.get('solutions', []):
                                if solution["challenge_name"] == challenge["challenge_name"]:
                                    md_file.write(f'    *   **Solution:** {solution["solution_description"]}\n')
                        md_file.write('\n')

                except json.JSONDecodeError:
                    print(f'Error decoding JSON from {filename}')
