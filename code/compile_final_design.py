
import os

# The directory containing the markdown files
directory = 'design'

# The output markdown file
output_file = 'design/comprehensive_billing_system_design.md'

# A list of the files to process in order
files_to_process = [
    'system_architecture.md',
    'database_schema.md',
    'api_design.md',
    'payment_gateway_integration.md',
    'tax_compliance.md',
    'security_architecture.md',
    'extensible_ontology_framework.md',
    'ui_ux_wireframes.md',
    'technology_stack.md'
]

with open(output_file, 'w') as md_file:
    md_file.write('# Comprehensive Design: Multi-Payment Gateway Billing System\n\n')

    for filename in files_to_process:
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r') as section_file:
                md_file.write(section_file.read())
                md_file.write('\n\n')
