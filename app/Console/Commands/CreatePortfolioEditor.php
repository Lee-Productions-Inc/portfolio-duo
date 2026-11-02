<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreatePortfolioEditor extends Command
{
    protected $signature = 'portfolio:create-editor';
    protected $description = 'Create or reset an authorized portfolio editor account';

    public function handle(): int
    {
        $name = trim((string) $this->ask('Editor name'));
        $email = strtolower(trim((string) $this->ask('Editor email (must be listed in .env)')));

        if ($name === '' || strlen($name) > 255 || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('Enter a valid name and email.');
            return self::FAILURE;
        }
        if (! in_array($email, config('portfolio.editor_emails', []), true)) {
            $this->error('Email is not on the approved editor list in .env.');
            return self::FAILURE;
        }

        $password = (string) $this->secret('Password (at least 12 characters)');
        $confirmation = (string) $this->secret('Confirm password');
        if (strlen($password) < 12 || ! hash_equals($password, $confirmation)) {
            $this->error('Password must contain at least 12 characters and match confirmation.');
            return self::FAILURE;
        }

        $user = User::query()->firstOrNew(['email' => $email]);
        $user->name = $name;
        $user->password = Hash::make($password);
        $user->save();

        $this->info('Authorized account saved. Password securely hashed.');
        return self::SUCCESS;
    }
}
