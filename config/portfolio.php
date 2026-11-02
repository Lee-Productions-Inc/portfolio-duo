<?php

return [
    // Keep these addresses in .env, not in JavaScript or Git.
    'editor_emails' => array_values(array_filter(array_map(
        static fn (string $email): string => strtolower(trim($email)),
        explode(',', (string) env('PORTFOLIO_EDITOR_EMAILS', ''))
    ))),
];
