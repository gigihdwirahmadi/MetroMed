<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class contentRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)

    {
       
        $words = explode(' ', $value);
        $nbWords = count($words);
        return ($nbWords >=0 && $nbWords <= 50);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'max word for content is 50';
    }
}