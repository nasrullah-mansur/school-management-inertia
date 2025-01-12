<?php 

const ADMIN_ROLE = "ADMIN";
const USER_ROLE = "USER";

const STATUS_ACTIVE = "ACTIVE";
const STATUS_INACTIVE = "INACTIVE";

function convertToBanglaFont($text) {
    // Mapping of English to Bangla characters
    $mapping = [
        '0' => '০', '1' => '১', '2' => '২', '3' => '৩', '4' => '৪',
        '5' => '৫', '6' => '৬', '7' => '৭', '8' => '৮', '9' => '৯'
    ];

    // Replace each English character with its Bangla equivalent
    $convertedText = strtr($text, $mapping);

    return $convertedText;
}

function convertToEnglishFont($text) {
    // Mapping of Bangla to English characters
    $mapping = [
        '০' => '0', '১' => '1', '২' => '2', '৩' => '3', '৪' => '4',
        '৫' => '5', '৬' => '6', '৭' => '7', '৮' => '8', '৯' => '9',
    ];

    // Replace each Bangla character with its English equivalent
    $convertedText = strtr($text, $mapping);

    return $convertedText;
}