
import os

# The directory containing the markdown files
directory = 'docs'

# The output markdown file
output_file = 'docs/comprehensive_billing_system_research.md'

# A list of the files to process in order
files_to_process = [
    'payment_gateway_analysis.md',
    'tax_compliance.md',
    'billing_system_architecture.md',
    'standards_and_frameworks.md',
    'security_and_compliance.md',
    'ui_ux_trends.md'
]

with open(output_file, 'w') as md_file:
    md_file.write('# Comprehensive Research Analysis: Multi-Payment Gateway Billing System\n\n')

    for filename in files_to_process:
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r') as section_file:
                md_file.write(section_file.read())
                md_file.write('\n\n')
