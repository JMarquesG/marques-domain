# Magic Link Email Template Configuration

This document explains how to use the `magic-link-email.html` template with personalization variables.

## Template Variables

Replace these placeholders with actual values when sending emails:

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{COMPANY_NAME}}` | Your company name | "Marques Corp" |
| `{{USER_NAME}}` | Recipient's name | "John Doe" |
| `{{USER_EMAIL}}` | Recipient's email | "john@example.com" |
| `{{MAGIC_LINK_URL}}` | The actual magic link URL | "https://app.example.com/auth/magic?token=abc123" |
| `{{EXPIRY_TIME}}` | Link expiration time | "15 minutes" |

### Optional Variables

| Variable | Description | Example | Default if not provided |
|----------|-------------|---------|------------------------|
| `{{COMPANY_URL}}` | Company website URL | "https://marquescorp.com" | "#" |
| `{{COMPANY_ADDRESS}}` | Company address | "123 Business St, City, State 12345" | "" |
| `{{SUPPORT_URL}}` | Support page URL | "https://marquescorp.com/support" | "#" |
| `{{UNSUBSCRIBE_URL}}` | Unsubscribe link | "https://marquescorp.com/unsubscribe?email={{USER_EMAIL}}" | "#" |

## Usage Example (Node.js/JavaScript)

```javascript
import fs from 'fs';
import path from 'path';

function generateMagicLinkEmail(userData, magicLinkUrl) {
    // Read the template
    const templatePath = path.join(__dirname, '../docs/magic-link-email.html');
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Replace variables
    const variables = {
        '{{COMPANY_NAME}}': 'Marques Corp',
        '{{COMPANY_URL}}': 'https://marquescorp.com',
        '{{COMPANY_ADDRESS}}': '123 Business Street, Tech City, TC 12345',
        '{{USER_NAME}}': userData.name || 'Valued Customer',
        '{{USER_EMAIL}}': userData.email,
        '{{MAGIC_LINK_URL}}': magicLinkUrl,
        '{{EXPIRY_TIME}}': '15 minutes',
        '{{SUPPORT_URL}}': 'https://marquescorp.com/support',
        '{{UNSUBSCRIBE_URL}}': `https://marquescorp.com/unsubscribe?email=${userData.email}`
    };
    
    // Replace all variables in the template
    Object.keys(variables).forEach(key => {
        template = template.replace(new RegExp(key, 'g'), variables[key]);
    });
    
    return template;
}

// Usage
const htmlEmail = generateMagicLinkEmail(
    { name: 'John Doe', email: 'john@example.com' },
    'https://app.marquescorp.com/auth/magic?token=abc123xyz'
);
```

## Usage Example (Python)

```python
import os
from string import Template

def generate_magic_link_email(user_data, magic_link_url):
    # Read the template
    template_path = os.path.join(os.path.dirname(__file__), '../docs/magic-link-email.html')
    with open(template_path, 'r', encoding='utf-8') as f:
        template_content = f.read()
    
    # Replace variables
    variables = {
        'COMPANY_NAME': 'Marques Corp',
        'COMPANY_URL': 'https://marquescorp.com',
        'COMPANY_ADDRESS': '123 Business Street, Tech City, TC 12345',
        'USER_NAME': user_data.get('name', 'Valued Customer'),
        'USER_EMAIL': user_data['email'],
        'MAGIC_LINK_URL': magic_link_url,
        'EXPIRY_TIME': '15 minutes',
        'SUPPORT_URL': 'https://marquescorp.com/support',
        'UNSUBSCRIBE_URL': f'https://marquescorp.com/unsubscribe?email={user_data["email"]}'
    }
    
    # Replace all variables
    for key, value in variables.items():
        template_content = template_content.replace('{{' + key + '}}', value)
    
    return template_content

# Usage
html_email = generate_magic_link_email(
    {'name': 'John Doe', 'email': 'john@example.com'},
    'https://app.marquescorp.com/auth/magic?token=abc123xyz'
)
```

## Email Service Integration

### SendGrid Example

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMagicLinkEmail(userEmail, userName, magicLinkUrl) {
    const htmlContent = generateMagicLinkEmail(
        { name: userName, email: userEmail },
        magicLinkUrl
    );
    
    const msg = {
        to: userEmail,
        from: 'noreply@marquescorp.com',
        subject: 'Your Secure Access Link',
        html: htmlContent,
    };
    
    await sgMail.send(msg);
}
```

### Nodemailer Example

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
    // Your SMTP configuration
});

async function sendMagicLinkEmail(userEmail, userName, magicLinkUrl) {
    const htmlContent = generateMagicLinkEmail(
        { name: userName, email: userEmail },
        magicLinkUrl
    );
    
    await transporter.sendMail({
        from: 'noreply@marquescorp.com',
        to: userEmail,
        subject: 'Your Secure Access Link',
        html: htmlContent,
    });
}
```

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Automatically adapts to user's system preference
- **Professional Styling**: Corporate-grade design with gradient accents
- **Security Focused**: Clear security messaging and expiration warnings
- **Accessibility**: Proper contrast ratios and semantic HTML
- **Email Client Compatible**: Tested with major email clients

## Customization

You can customize the template by modifying:

1. **Colors**: Update the CSS gradient and color variables
2. **Typography**: Change font families in the CSS
3. **Layout**: Modify the HTML structure and CSS
4. **Branding**: Add your logo image and update styling

## Security Best Practices

1. Always set an expiration time for magic links (recommended: 15-30 minutes)
2. Use HTTPS for all links
3. Include clear security messaging
4. Log magic link usage for security monitoring
5. Implement rate limiting for magic link requests
