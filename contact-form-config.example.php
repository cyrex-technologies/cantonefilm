<?php
declare(strict_types=1);

// Copy outside public_html as /home/CPANEL_USER/cantonefilms-contact-form-config.php
// and set permissions to 0600. Never commit the real mailbox password.
return [
    'smtp_host' => 'mail.cantonefilms.com',
    'smtp_port' => 465,
    'smtp_encryption' => 'ssl', // ssl or tls
    'smtp_username' => 'info@cantonefilms.com',
    'smtp_password' => 'REPLACE_WITH_MAILBOX_PASSWORD',
    'from_email' => 'info@cantonefilms.com',
    'from_name' => 'Cantone Films Website',
    'recipient_email' => 'info@cantonefilms.com',
];
