<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$userName	=	$_POST["teamName"];
	$password	=	$_POST["teamPassword"];
	
	$incorrectArray["id"]="incorrectPassword";

	$sql = "select teamName, teamID from teamRoster where teamName = '$userName' group by 1,2;";
	$result = $conn->query($sql);
	
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
        	$actualPassword["id"] = $row["teamID"];
			$actualPassword["name"] = $row["teamName"];
        }
		
		if($password == $actualPassword["id"]) {
			echo json_encode($actualPassword);		//TODO: jeffwang to figure out actual password system. Right now it's just the teamID
		}
		else {
	        echo json_encode($incorrectArray);
		}
    } else {
        echo json_encode($incorrectArray);
    }
	
	
	
    
	
	
    
    $conn->close();
?>