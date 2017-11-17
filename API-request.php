<?php
date_default_timezone_set('UTC');

function createApiRequest ($requestArray=array(), $partnerId, $partnerSecretKey) {
	$requestArray['partnerId'] = $partnerId;
	$requestArray['time'] = time();

	$values = array_values($requestArray);
	sort($values, SORT_STRING);
	$string = join('', $values);
	$requestArray['transactionKey'] = sha1($string . $partnerSecretKey);
	return http_build_query($requestArray);
}

$PARTNER_ID = '11976';
$PARTNER_SECRET_KEY = '97d4efb78b485cf76e18ce0809271dac27919b64812bf84faa17f0d884fd0979';
$URL = 'https://lm.pandats-api.com/api/v1/Registration';

// Registration example
$data = array(
	'firstName' => $_POST["firstName"],
	'lastName' => $_POST["lastName"],
	'email' => $_POST["email"],
	'phoneCountryCode' => $_POST["telephone-code"],
	'phoneNumber' => $_POST["phoneNumber"],
	'password' => $_POST["password"],
	'ip' => '8.8.8.8',
	'newsletter' => '0',
	'source' => '1',
	'countryId' => 'GB'
);

$queryString = $URL . '?' . createApiRequest($data, $PARTNER_ID, $PARTNER_SECRET_KEY);

$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_VERBOSE, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible;)");
curl_setopt($ch, CURLOPT_URL, $queryString);

$page = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$resparr = json_decode($page, true);

if ($resparr) {
    echo $page;
} else {
    http_response_code($httpcode);
    echo '{ "IsOK":false, "Error":"Failed to parse JSON", serverData: "' . $page . '"}';
}