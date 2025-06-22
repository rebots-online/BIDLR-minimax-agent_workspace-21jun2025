# Security and PCI Compliance

## Pci Dss 12 Requirements

The web content provides a detailed breakdown of the 12 PCI DSS requirements, including a brief description for each, explaining what they entail and their importance for maintaining PCI compliance. The article, authored by Richard Rohena, Manager of PCI Compliance Services at Global Payments Integrated, emphasizes that these requirements are industry standards aimed at protecting cardholder data.

### The 12 PCI DSS Requirements

**1. Install and maintain a firewall configuration to protect cardholder data**
Ensures that merchants and ISVs properly configure firewalls and routers to build and maintain a secure network. This includes establishing firewall and router standards, reviewing configuration rules biannually, restricting untrusted traffic, prohibiting internet access to cardholder data environments, and equipping employee devices with personal firewall software.

**2. Do not use vendor-supplied defaults for system passwords and other security parameters**
Requires changing all default passwords and security parameters for firewalls, routers, and other hardware/software before they interface with the established system, to prevent common exploits.

**3. Protect stored cardholder data**
Mandates protection of stored cardholder data to prevent unauthorized usage. Data should only be stored if required for legal, regulatory, or business needs, with limited storage and retention time, and a quarterly purge. Sensitive data, even encrypted, should not be stored beyond transaction finalization. It also includes rules for displaying primary account numbers (e.g., revealing only the first six and last four digits).

**4. Encrypt transmission of cardholder data across open, public networks**
Requires strong cryptography and security protocols (like IPSec, SSH, TLS, and IEEE 802.11i for wireless networks) to encrypt cardholder data before transmission across public networks and decrypt it upon receipt, limiting access by unauthorized parties.

**5. Use and regularly update anti-virus software or programs**
Requires the deployment and regular updating of anti-virus solutions on all systems, including core systems, workstations, laptops, and mobile devices. AV mechanisms must be active, use the latest dictionaries, and generate auditable logs to support a proactive vulnerability management program.

**6. Develop and maintain secure systems and applications**
Focuses on managing vulnerabilities by keeping software secure, which involves installing security patches promptly. ISVs must ensure their code adheres to PCI DSS and new/changed code is analyzed for known and potential unknown vulnerabilities.

**7. Restrict access to cardholder data by business need to know**
Requires implementing strong access control measures to allow or deny access to cardholder data based on a 'need to know' principle. The system must assess each request based on the user and circumstances, denying any request not specifically permitted.

**8. Assign a unique ID to each person with computer access**
Mandates that every authorized user has a unique identifier to trace activity related to cardholder data. For remote access, two-factor authorization is required, with different factors (e.g., password and token).

**9. Restrict physical access to cardholder data**
Involves limiting physical access to sensitive data (systems, devices, hard copies) for employees, contractors, vendors, consultants, and guests. This includes on-site access control, monitoring, logging, procedures for identifying unauthorized individuals, physical security of media, off-site backups, and secure distribution and destruction of information.

**10. Track and monitor all access to network resources and cardholder data**
Requires real-time monitoring, logging, and forensic mechanisms for network access to cardholder data. This includes linking all network traffic to specific users, automated audit trails that can reconstruct events, time synchronization, securing audit data, and maintaining audit data for at least a year.

**11. Regularly test security systems and processes**
Emphasizes frequent testing of systems and processes to maintain security against new vulnerabilities. This includes quarterly testing for unauthorized wireless access points, internal and external vulnerability scans quarterly and after significant network changes, penetration testing, use of intrusion detection/prevention systems, and weekly file monitoring for unauthorized modifications.

**12. Maintain a policy that addresses information security for all personnel**
Focuses on establishing, publishing, and disseminating a comprehensive information security policy for all personnel. The policy must be challenged and revised yearly, with security procedures and usage policies aligning with it. Dedicated personnel are required to manage these obligations, create awareness campaigns, and screen prospective employees to prevent internal data breaches.

## Stripe Pci Compliance

Stripe, as a PCI Level 1 service provider, significantly reduces the PCI DSS compliance burden for merchants by handling sensitive card data directly through tokenized integration methods and providing guidance and tools. Merchants, in turn, have responsibilities including understanding their PCI level, choosing appropriate integration methods, completing annual assessments, and maintaining compliance.

### Stripe and PCI Compliance

*   **Tokenized Integration Methods**: Stripe provides various tokenized integration methods like Checkout, Elements, mobile SDKs, and Terminal SDKs, which help significantly reduce the PCI burden by avoiding the need for merchants to directly handle sensitive credit card data. Sensitive payment information is sent directly to Stripe's PCI DSS–validated servers.
*   **Stripe PCI Wizard**: Analyzes the merchant's integration method and advises on how to reduce their compliance burden. For Level 2-4 users, it automatically determines the appropriate SAQ type and generates required documentation.
*   **Transaction Volume Alerts**: Stripe notifies merchants in advance if a growing transaction volume will require a change in how they validate compliance.
*   **QSA Connections**: For large or enterprise businesses needing to work with a PCI QSA, Stripe can connect them with auditors who understand Stripe integration methods.
*   **Customized Dashboard Experience**: Analyzes transaction history and advises on how to reduce compliance burden through a personalized dashboard experience.
*   **Support for Smaller Businesses**: Simplifies the PCI burden for smaller users by offering a customized compliance journey, including prefilled SAQs and guided flows for secure integration methods.
*   **Support for Multiple Service Providers**: Facilitates PCI compliance by supporting submission of Attestations of Compliance (AOCs) from other providers.
*   **MOTO Payment Support**: Integrates with third-party services for secure phone-based card collection (e.g., touch-tone, voice recognition) to automate card detail collection and remove manual transcription, reducing PCI compliance burdens.

## Payment Security Best Practices

The provided web content from Checkout.com details best practices for secure online payment processing. It defines a secure payment system (SPS) as payment infrastructure protecting businesses from unauthorized access by fraudsters, particularly in e-commerce, through encryption, tokenization, multi-factor authentication, and fraud prevention tools. Adherence to standards like PCI DSS and EMV is highlighted as crucial for SPS effectiveness.

### Security Best Practices

**Encryption**
Transforms sensitive data into unreadable codes (ciphertext) to protect it during transmission and storage. Data is encrypted before sending and decrypted by the recipient. Only someone with the decryption key can convert it back to a readable format.
- Symmetric encryption: Uses the same key for encryption and decryption, offering efficiency but less security.
- Asymmetric encryption: Uses different keys (a public key for encryption and a private key for decryption), which is slower but provides stronger security.

**Tokenization**
Replaces sensitive data entirely with a unique sequence (token) that has no inherent meaning, unlike encryption which scrambles the original data. If intercepted, the token is unreadable. The original data is stored securely in a data vault.
- Network Tokens: Issued by the card scheme, suitable for broader use across the payment ecosystem.
Benefits:
- Increased Security: Prevents fraud by protecting sensitive payment information from interception or theft during a data breach.
- Reduced Compliance Costs: Helps businesses comply with regulations like PCI DSS and GDPR by reducing the handling of sensitive data.
- Improved Customer Experience: Eliminates the need for customers to repeatedly enter payment information for recurring payments or subscriptions, reducing abandoned carts.
- Greater Flexibility: Allows storing tokens instead of sensitive payment information, offering flexibility in data storage and usage.

**Multi-Factor Authentication (MFA) / Two-Factor Authentication (2FA)**
Security protocols requiring multiple authentication factors to verify identity during logins or transactions, adding layers of security beyond traditional username/password combinations.
- 2FA: Requires two distinct factors (e.g., something known like a password, and something possessed/accessed like an OTP or biometric scan).
- MFA: Requires three or more distinct factors (e.g., something known, something possessed, and something inherent like biometric data). More factors lead to higher security.

**Fraud Prevention Systems**
Combine machine learning and human-engineered rules to detect and deter payment fraud by spotting unusual behavior or suspicious activity and blocking transactions. They perform real-time analysis of payment data, compare it to historical data sets to flag anomalies, and use machine learning to understand new trends and fraud patterns. Anomaly examples include purchases from high-fraud countries or many small transactions from the same card.
Types of tools:
- Rule-based systems: Use pre-defined rules to identify potentially fraudulent transactions.
- Behavioral analysis: Analyze user and transaction behavior to identify patterns indicative of fraud.
- Machine learning: Use advanced algorithms and statistical models to learn from historical data and identify fraud patterns.
- Biometric authentication: Use biometric data (facial recognition, fingerprints, voice recognition) to authenticate users.

**Understand PCI Compliance Requirements**
Businesses that process, transmit, or store card data must comply with Payment Card Industry Data Security Standard (PCI DSS). The simplest method to remain compliant is to avoid seeing or accessing customer card data (e.g., by using integration methods like Frames or Mobile SDKs). Using a Full Card API requires more extensive procedures and complex forms for PCI DSS assessment. Checkout.com is a PCI DSS Level 1 Service Provider, indicating the highest standard of security for credit card data.

**Encrypt Data with TLS**
Transport Layer Security (TLS) data encryption is crucial for secure online payments. It secures communication between the customer's browser and the company's website server, ensuring sensitive information (credit card numbers, expiration dates, CVV codes) is transmitted securely and cannot be intercepted or read by unauthorized parties. TLS also authenticates the server, preventing man-in-the-middle (MITM) attacks. Websites should have a valid SSL certificate to establish a secure connection, and the protocol version should be at least TLS 1.2.

**Implement 3D Secure 2**
The latest version of the 3D Secure protocol, 3DS2, adds an additional layer of security to online credit and debit card transactions. It prompts the cardholder for additional authentication (e.g., one-time password, biometric data) to verify their identity, helping prevent fraud and unauthorized transactions. While it adds a step to checkout, it can be balanced with customer convenience. 3DS2 can provide a frictionless user experience for subsequent transactions with the same merchant and offers more detailed data for informed transaction decisions, reducing false declines. Strong Customer Authentication (SCA) mandates 3DS2 in the UK and EEA, with some exemptions for low-risk merchants.

**Require Card Verification Value (CVV)**
For online transactions, CVV is a security feature used to verify the cardholder's identity when the card is not physically present. This is a 3-digit code (Visa, Mastercard, Discover) or 4-digit code (American Express) typically found on the card. The merchant or payment processor requests the CVV during checkout, and a CVV response code indicates if the purchaser possesses the physical card. CVV is not stored on the magnetic stripe or chip, making it less vulnerable to data breaches.

**Ensure Website Platform is Secure**
Maintaining a secure website platform involves several practices:
- Keep software and plugins up-to-date to patch security vulnerabilities.
- Require customers to use strong, unique passwords for their accounts.
- Use a firewall to protect against unauthorized access and suspicious traffic.
- Implement TLS to encrypt data transmitted between the website and visitors.
- Use a Content Delivery Network (CDN) to protect against Distributed Denial of Service (DDoS) attacks.
- Monitor for suspicious fraudulent activity, such as unusual traffic patterns or login attempts.

**Train Employees**
Employee training is vital for secure online payments:
- Provide regular training on best practices for online payment security, fraud identification, and handling sensitive customer information.
- Develop and enforce clear policies and procedures for secure online payments.
- Emphasize the importance of security and the consequences of not following protocols.
- Educate employees on different types of fraud and scams.
- Encourage immediate reporting of suspicious activity or potential security breaches.
- Conduct regular, non-threatening security audits to identify vulnerabilities.
- Keep employees informed of new threats and provide necessary training to respond.

**Choose the Right Secure Online Payment Provider**
Selecting an end-to-end payment solution reduces the number of parties involved in the payment lifecycle, minimizing data exposure. Such platforms unite acquirer, gateway, and processor functions, streamlining the payment process. They often integrate advanced fraud detection, 3DS authentication, and tokenization capabilities, providing comprehensive tools for data protection and fraud prevention in a single solution. An example is Checkout.com, which is a PCI-Level 1 merchant with robust fraud detection capabilities.

