<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum=$_POST["week"];
	
	if (isset($_POST["qb"])) {
		$qQb=$_POST["qb"];
	} else {
		$qQb="";
	}
	if (isset($_POST["rb1"])) {
		$qRb1=$_POST["rb1"];
	} else {
		$qRb1="";
	}
	if (isset($_POST["rb2"])) {
		$qRb2=$_POST["rb2"];
	} else {
		$qRb2="";
	}
	if (isset($_POST["wr1"])) {
		$qWr1=$_POST["wr1"];
	} else {
		$qWr1="";
	}
	if (isset($_POST["wr2"])) {
		$qWr2=$_POST["wr2"];
	} else {
		$qWr2="";
	}
	if (isset($_POST["wr3"])) {
		$qWr3=$_POST["wr3"];
	} else {
		$qWr3="";
	}
	if (isset($_POST["te"])) {
		$qTe=$_POST["te"];
	} else {
		$qTe="";
	}
	if (isset($_POST["k"])) {
		$qK=$_POST["k"];
	} else {
		$qK="";
	}
	if (isset($_POST["def"])) {
		$qDef=$_POST["def"];
	} else {
		$qDef="";
	}
	if (isset($_POST["flex"])) {
		$qFlex=$_POST["flex"];
	} else {
		$qFlex="";
	}
	//$qQb=$_POST["qb"];
	//$qRb1=$_POST["rb1"];
	//$qRb2=$_POST["rb2"];
	//$qWr1=$_POST["wr1"];
	//$qWr2=$_POST["wr2"];
	//$qWr3=$_POST["wr3"];
	//$qTe=$_POST["te"];
	//$qDef=$_POST["def"];
	//$qK=$_POST["k"];
	//$qFlex=$_POST["flex"];
	
	if (isset($_POST["teamID"])) {
		$teamID = $_POST["teamID"];
		
	    $sql = "SELECT B.playerName, B.position, A.fantasyPoints FROM offenseStats as A inner join (SELECT playerName, position from teamRoster where week=$weekNum and teamID=$teamID and position != 'DEF' and hasPlayed=1) as B on (A.playerName = B.playerName) where week=$weekNum;";
	    $result = $conn->query($sql);
	}
	else {
	    $sql = "SELECT playerName, fantasyPoints FROM offenseStats where playerName in ('$qQb', '$qRb1', '$qRb2', '$qWr1', '$qWr2', '$qWr3', '$qTe', '$qFlex') and week=$weekNum;";
	    $result = $conn->query($sql);
	}
	
    //Query to get team rosters
    //$sql = "SELECT playerName, fantasyPoints FROM offenseStats where playerName in ('$qQb', '$qRb1', '$qRb2', '$qWr1', '$qWr2', '$qWr3', '$qTe', '$qFlex') and week=$weekNum;";
    //$result = $conn->query($sql);
	//echo $sql;
	
	//$playersAndPoints = array();
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $playerName = $row["playerName"];
            $fantasyPoints = $row["fantasyPoints"];
            
            $playersAndPoints[$playerName] = $fantasyPoints;
			if (isset($_POST["teamID"])) {		
            	$playersAndPoints[$row["position"]] = $playerName;
			}
        }
    } else {
        $playersAndPoints[$qQb] = "0";
        $playersAndPoints[$qRb1] = "0";
        $playersAndPoints[$qRb2] = "0";
        $playersAndPoints[$qWr1] = "0";
        $playersAndPoints[$qWr2] = "0";
        $playersAndPoints[$qWr3] = "0";
        $playersAndPoints[$qTe] = "0";
        $playersAndPoints[$qFlex] = "0";
        $playersAndPoints[$qK] = "0";
		$playersAndPoints[""] = "0";
    }
	
	if (isset($_POST["teamID"])) {		
		$sql = "SELECT teamName, position, fantasyPoints FROM defenseStats as A inner join (SELECT playerName, position from teamRoster where week=$weekNum and teamID=$teamID and position = 'DEF' and hasPlayed=1) as B on (A.teamName = B.playerName) where week=$weekNum;";
		$result = $conn->query($sql);
	}
	else {
		$sql = "SELECT teamName, fantasyPoints FROM defenseStats where teamName in ('$qDef') and week=$weekNum;";
		$result = $conn->query($sql);
	}
	
	//Do the same thing for the defense table
	//$sql = "SELECT teamName, fantasyPoints FROM defenseStats where teamName in ('$qDef') and week=$weekNum;";
	//$result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $playerName = $row["teamName"];
            $fantasyPoints = $row["fantasyPoints"];
            
            $playersAndPoints[$playerName] = $fantasyPoints;
			if (isset($_POST["teamID"])) {		
            	$playersAndPoints[$row["position"]] = $playerName;
			}
        }
    } else {
        $playersAndPoints[$qDef] = "0";		
    }
	
	
    //Output table to readTeamRoster.js
    echo json_encode($playersAndPoints);
	
    
    $conn->close();
?>