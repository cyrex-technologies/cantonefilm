<?php
declare(strict_types=1);

// SMTP secrets stay outside public_html in cantonefilms-contact-form-config.php.
const COMPANY_NAME = 'Cantone Films';
const COMPANY_EMAIL = 'info@cantonefilms.com';
const MAX_REQUEST_BYTES = 20000;
const MIN_FILL_MILLISECONDS = 3000;
const RATE_LIMIT_ATTEMPTS = 3;
const RATE_LIMIT_WINDOW_SECONDS = 900;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok, string $message): void {
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
function field(string $name, bool $multiline = false): string {
    $value = $_POST[$name] ?? '';
    if (!is_string($value)) return '';
    $value = trim($value);
    if ($multiline) return preg_replace("/[ \t]+\n/u", "\n", str_replace(["\r\n", "\r"], "\n", $value)) ?? '';
    return trim(preg_replace('/\s+/u', ' ', $value) ?? '');
}
function escaped(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function hasNewline(string $value): bool { return preg_match('/[\r\n]/', $value) === 1; }
function requestIp(): string { return is_string($_SERVER['REMOTE_ADDR'] ?? null) ? $_SERVER['REMOTE_ADDR'] : 'unknown'; }
function allowedOrigin(): bool {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') return true;
    $host = is_string($origin) ? parse_url($origin, PHP_URL_HOST) : null;
    return is_string($host) && in_array(strtolower($host), [
        'cantonefilms.com', 'www.cantonefilms.com', 'localhost', '127.0.0.1',
    ], true);
}
function rateLimit(string $ip): int {
    if (getenv('CONTACT_FORM_DRY_RUN') === '1') return 0;
    $file = sys_get_temp_dir() . '/cantonefilms-contact-' . hash('sha256', $ip) . '.json';
    $handle = @fopen($file, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) return 0;
    try {
        $items = json_decode((string) stream_get_contents($handle), true);
        $items = is_array($items) ? $items : [];
        $now = time();
        $items = array_values(array_filter($items, static fn($time): bool => is_int($time) && $time >= $now - RATE_LIMIT_WINDOW_SECONDS));
        if (count($items) >= RATE_LIMIT_ATTEMPTS) return max(1, min($items) + RATE_LIMIT_WINDOW_SECONDS - $now);
        $items[] = $now;
        rewind($handle); ftruncate($handle, 0); fwrite($handle, json_encode($items)); fflush($handle);
        return 0;
    } finally { fclose($handle); }
}
function config(): array {
    $loaded = [];
    foreach ([dirname(__DIR__) . '/cantonefilms-contact-form-config.php'] as $path) {
        if (is_file($path)) { $value = require $path; $loaded = is_array($value) ? $value : []; break; }
    }
    foreach (['smtp_host', 'smtp_port', 'smtp_encryption', 'smtp_username', 'smtp_password', 'from_email', 'from_name', 'recipient_email'] as $key) {
        $environment = getenv('CONTACT_' . strtoupper($key));
        if ($environment !== false && $environment !== '') $loaded[$key] = $environment;
    }
    return array_merge([
        'smtp_host' => '', 'smtp_port' => 465, 'smtp_encryption' => 'ssl', 'smtp_username' => '', 'smtp_password' => '',
        'from_email' => '', 'from_name' => 'Cantone Films Website', 'recipient_email' => COMPANY_EMAIL,
    ], $loaded);
}
function smtpRead($socket, array $accepted): void {
    $response = '';
    while (($line = fgets($socket, 515)) !== false) { $response .= $line; if (strlen($line) < 4 || $line[3] === ' ') break; }
    if (!in_array((int) substr($response, 0, 3), $accepted, true)) throw new RuntimeException('Unexpected SMTP response.');
}
function smtpCommand($socket, string $command, array $accepted): void {
    if (fwrite($socket, $command . "\r\n") === false) throw new RuntimeException('SMTP write failed.');
    smtpRead($socket, $accepted);
}
function message(string $fromEmail, string $fromName, string $to, string $replyTo, string $subject, string $text, string $html): string {
    $boundary = 'cantone_' . bin2hex(random_bytes(16));
    $encode = static fn(string $body): string => rtrim(chunk_split(base64_encode(str_replace(["\r\n", "\r"], "\n", $body)), 76, "\r\n"));
    $headers = ['Date: ' . date(DATE_RFC2822), 'To: ' . $to, 'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=', 'MIME-Version: 1.0', 'From: ' . $fromName . ' <' . $fromEmail . '>', 'Reply-To: ' . $replyTo, 'Content-Type: multipart/alternative; boundary="' . $boundary . '"'];
    return implode("\r\n", $headers) . "\r\n\r\n" . implode("\r\n", ['--' . $boundary, 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', $encode($text), '', '--' . $boundary, 'Content-Type: text/html; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', $encode($html), '', '--' . $boundary . '--']);
}
function smtpSend(array $config, string $to, string $replyTo, string $subject, string $text, string $html): bool {
    if (getenv('CONTACT_FORM_DRY_RUN') === '1') return true;
    $host = (string) $config['smtp_host']; $port = (int) $config['smtp_port']; $encryption = strtolower((string) $config['smtp_encryption']);
    $username = (string) $config['smtp_username']; $password = (string) $config['smtp_password']; $from = (string) $config['from_email'];
    if ($host === '' || $username === '' || $password === '' || !filter_var($from, FILTER_VALIDATE_EMAIL)) return false;
    try {
        $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $host, 'SNI_enabled' => true]]);
        $socket = @stream_socket_client(($encryption === 'ssl' ? 'ssl://' : '') . $host . ':' . $port, $code, $error, 20, STREAM_CLIENT_CONNECT, $context);
        if ($socket === false) throw new RuntimeException('SMTP connection failed.');
        stream_set_timeout($socket, 20); smtpRead($socket, [220]); smtpCommand($socket, 'EHLO cantonefilms.com', [250]);
        if ($encryption === 'tls') { smtpCommand($socket, 'STARTTLS', [220]); if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) throw new RuntimeException('TLS failed.'); smtpCommand($socket, 'EHLO cantonefilms.com', [250]); }
        smtpCommand($socket, 'AUTH LOGIN', [334]); smtpCommand($socket, base64_encode($username), [334]); smtpCommand($socket, base64_encode($password), [235]);
        smtpCommand($socket, 'MAIL FROM:<' . $from . '>', [250]); smtpCommand($socket, 'RCPT TO:<' . $to . '>', [250, 251]); smtpCommand($socket, 'DATA', [354]);
        $body = preg_replace('/(?m)^\./', '..', message($from, (string) $config['from_name'], $to, $replyTo, $subject, $text, $html)) ?? '';
        if (fwrite($socket, $body . "\r\n.\r\n") === false) throw new RuntimeException('SMTP data write failed.');
        smtpRead($socket, [250]); smtpCommand($socket, 'QUIT', [221]); fclose($socket); return true;
    } catch (Throwable $exception) { if (isset($socket) && is_resource($socket)) fclose($socket); error_log('Cantone Films contact SMTP error: ' . $exception->getMessage()); return false; }
}
function emailLayout(string $eyebrow, string $title, string $content): string {
    return '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>'
        . '<body style="margin:0;padding:0;background:#121212;color:#d1d1d1;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">'
        . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#121212;padding:32px 12px;"><tr><td align="center">'
        . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#1a1a1a;border:1px solid #383838;">'
        . '<tr><td align="center" style="padding:34px 28px 30px;background:linear-gradient(155deg,#282015 0%,#171717 55%,#121212 100%);border-bottom:1px solid #594921;">'
        . '<img src="https://cantonefilms.com/LogoCantone%E2%80%93Alpha.webp" width="155" alt="Cantone Films" style="display:block;width:155px;max-width:100%;height:auto;border:0;margin:0 auto 22px;">'
        . '<p style="margin:0 0 9px;color:#d4af37;font-size:11px;font-weight:700;letter-spacing:3px;line-height:16px;text-transform:uppercase;">' . escaped($eyebrow) . '</p>'
        . '<h1 style="margin:0;color:#ffffff;font-family:Georgia,Times,serif;font-size:31px;font-weight:normal;letter-spacing:.3px;line-height:1.2;">' . escaped($title) . '</h1>'
        . '</td></tr><tr><td style="padding:32px 30px 28px;color:#d0d0d0;font-size:15px;line-height:1.7;">' . $content . '</td></tr>'
        . '<tr><td align="center" style="padding:22px 28px;background:#141414;border-top:1px solid #353535;color:#848484;font-size:12px;line-height:1.7;">'
        . '<p style="margin:0 0 5px;">&copy; ' . date('Y') . ' Cantone Films. All rights reserved.</p>'
        . '<p style="margin:0;"><a href="https://cantonefilms.com/" style="color:#d4af37;text-decoration:none;">cantonefilms.com</a> <span style="color:#555555;">&nbsp;|&nbsp;</span> <a href="https://cyrex.co.tz" style="color:#d4af37;text-decoration:none;">Powered by Cyrex Technologies</a></p>'
        . '</td></tr></table></td></tr></table></body></html>';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') respond(405, false, 'Method not allowed.');
if (!allowedOrigin()) respond(403, false, 'This submission origin is not allowed.');
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_REQUEST_BYTES) respond(413, false, 'The submitted message is too large.');
if (!str_starts_with(strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? '')), 'application/x-www-form-urlencoded')) respond(415, false, 'Unsupported submission format.');
if (field('website') !== '') respond(200, true, 'Thank you. Your inquiry has been received.');
$startedAt = filter_input(INPUT_POST, 'started_at', FILTER_VALIDATE_INT);
$elapsed = is_int($startedAt) ? (int) floor(microtime(true) * 1000) - $startedAt : 0;
if ($elapsed < MIN_FILL_MILLISECONDS || $elapsed > 86400000) respond(422, false, 'Please wait a moment, then submit the form again.');
if (($wait = rateLimit(requestIp())) > 0) { header('Retry-After: ' . $wait); respond(429, false, 'Too many requests were sent. Please wait and try again.'); }

$name = field('name'); $email = strtolower(field('email')); $phone = field('phone'); $company = field('company'); $service = field('service'); $inquiry = field('message', true);
$errors = [];
if (strlen($name) < 2 || strlen($name) > 100 || hasNewline($name)) $errors[] = 'Enter a valid name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 || hasNewline($email)) $errors[] = 'Enter a valid email address.';
if (strlen($phone) > 40 || hasNewline($phone) || strlen($company) > 120 || hasNewline($company)) $errors[] = 'Enter valid contact details.';
if (strlen($service) < 2 || strlen($service) > 120 || hasNewline($service)) $errors[] = 'Enter a valid project type.';
if (strlen($inquiry) < 10 || strlen($inquiry) > 5000) $errors[] = 'Your message must be between 10 and 5,000 characters.';
if ($errors !== []) respond(422, false, implode(' ', $errors));

$smtp = config(); $recipient = (string) $smtp['recipient_email'];
if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) respond(502, false, 'We could not send your inquiry. Please email us directly.');
$summary = "Name: {$name}\nEmail: {$email}\n" . ($phone !== '' ? "Phone: {$phone}\n" : '') . ($company !== '' ? "Company: {$company}\n" : '') . "Project type: {$service}\n\nMessage:\n{$inquiry}\n";
$details = '<p style="margin:0 0 20px;">A new project inquiry is ready for review. Reply directly to begin the conversation.</p>'
    . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;border:1px solid #3b3b3b;background:#202020;">'
    . '<tr><td style="padding:15px 18px;border-bottom:1px solid #3b3b3b;color:#d4af37;font-size:11px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;">Project details</td></tr>'
    . '<tr><td style="padding:17px 18px;color:#d0d0d0;font-size:14px;line-height:1.8;"><strong style="color:#ffffff;">Name:</strong> ' . escaped($name) . '<br><strong style="color:#ffffff;">Email:</strong> <a href="mailto:' . escaped($email) . '" style="color:#d4af37;text-decoration:none;">' . escaped($email) . '</a>' . ($phone !== '' ? '<br><strong style="color:#ffffff;">Phone:</strong> ' . escaped($phone) : '') . ($company !== '' ? '<br><strong style="color:#ffffff;">Organisation:</strong> ' . escaped($company) : '') . '<br><strong style="color:#ffffff;">Project type:</strong> ' . escaped($service) . '</td></tr></table>'
    . '<div style="border-left:4px solid #d4af37;padding:4px 0 4px 17px;"><p style="margin:0 0 8px;color:#ffffff;font-size:14px;font-weight:bold;">Their message</p><p style="margin:0;color:#c7c7c7;white-space:pre-wrap;">' . nl2br(escaped($inquiry)) . '</p></div>'
    . '<p style="margin:28px 0 0;text-align:center;"><a href="mailto:' . escaped($email) . '?subject=' . rawurlencode('Re: Your Cantone Films project inquiry') . '" style="display:inline-block;background:#d4af37;color:#121212;padding:13px 22px;font-size:12px;font-weight:bold;letter-spacing:1px;text-decoration:none;text-transform:uppercase;">Reply to ' . escaped($name) . '</a></p>';
if (!smtpSend($smtp, $recipient, $email, 'New project inquiry | ' . $service . ' | ' . $name, $summary, emailLayout('New project inquiry', 'A Story Is Taking Shape.', $details))) respond(502, false, 'We could not send your inquiry. Please email us directly.');
$acknowledgement = "Dear {$name},\n\nThank you for reaching out to " . COMPANY_NAME . ". We have received your inquiry about {$service}. A member of our team will be in touch within 24–48 business hours.\n\nYour message:\n{$inquiry}\n\nExplore our work: https://cantonefilms.com/";
$acknowledgementHtml = '<p style="margin:0 0 18px;">Hi ' . escaped($name) . ',</p><p style="margin:0 0 18px;">Thank you for reaching out to Cantone Films. We have received your inquiry about <strong style="color:#ffffff;">' . escaped($service) . '</strong>, and we are looking forward to learning more about your vision.</p><p style="margin:0 0 18px;">From documentaries and institutional storytelling to films that connect ideas, people, and purpose, we create visual stories made to resonate.</p>'
    . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:24px 0;background:#242424;border-left:4px solid #d4af37;"><tr><td style="padding:18px 20px;"><p style="margin:0 0 6px;color:#ffffff;font-size:14px;font-weight:bold;">What happens next?</p><p style="margin:0;color:#b8b8b8;font-size:13px;line-height:1.7;">Our team is reviewing your project details. One of our producers will get back to you within <strong style="color:#ffffff;">24–48 business hours</strong> to begin the conversation.</p></td></tr></table>'
    . '<p style="margin:0 0 24px;color:#c7c7c7;"><strong style="color:#ffffff;">Your message</strong><br>' . nl2br(escaped($inquiry)) . '</p>'
    . '<p style="margin:0;text-align:center;"><a href="https://cantonefilms.com/portfolio/" style="display:inline-block;background:#d4af37;color:#121212;padding:13px 22px;font-size:12px;font-weight:bold;letter-spacing:1px;text-decoration:none;text-transform:uppercase;">Explore Our Portfolio</a></p>';
if (!smtpSend($smtp, $email, COMPANY_EMAIL, 'We received your Cantone Films inquiry', $acknowledgement, emailLayout('Inquiry received', 'Stories That Last.', $acknowledgementHtml))) respond(502, false, 'Your inquiry reached our team, but the confirmation email could not be sent.');
respond(200, true, 'Thank you. Your inquiry has been sent.');
