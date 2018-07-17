<?PHP
require_once("./include/fg_membersite.php");

$fgmembersite = new FGMembersite();

//Provide your site name here
$fgmembersite->SetWebsiteName('salty-citadel-97816.herokuapp.com');

//Provide the email address where you want to get notifications
$fgmembersite->SetAdminEmail('ncaaf.fantasy@gmail.com');

//Provide your database login details here:
//hostname, user name, password, database name and table name
//note that the script will create the table (for example, fgusers in this case)
//by itself on submitting register.php for the first time
$fgmembersite->InitDB(/*hostname*/'us-cdbr-iron-east-05.cleardb.net',
                      /*username*/'b4078336a46f7e',
                      /*password*/'10f5241c',
                      /*database name*/'heroku_28ca4c386152c4f',
                      /*table name*/'users');

//For better security. Get a random string from this link: http://tinyurl.com/randstr
// and put it here
$fgmembersite->SetRandomKey('dfwUp4sjcKHzrIV');

?>