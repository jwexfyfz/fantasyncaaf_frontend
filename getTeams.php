<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$sql = "SELECT teamName FROM teamRoster group by 1 order by 1;";
    $result = $conn->query($sql);

	//echo $sql;
	
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
        	$teamArray[$row["teamName"]] = $row["teamName"];
        }
    } else {
        echo "0 results";
    }
    //Output table to login.js
    echo json_encode($teamArray);
	
    
    $conn->close();
?>