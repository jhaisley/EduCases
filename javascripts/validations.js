//This is to ensure that at least one person is resp. for an event
function checkEvent(valu)

{

var collector = document.getElementById('collect');
var date = document.getElementById(valu);
var task = document.getElementById('tasker');
if (collector.value == '')
{
alert('You must select at least one responsible party.');
return false;

}



if (date.value == '')
{
alert('Please select a date.');
return false;
}


if (task.value == '')
{
alert('What is to be done?');
return false;
}
return true;



}


// This is to check that a to: has been specified in new_message.php, forcing user to pick from drop-down list //
function checkTo()
{
var to = document.getElementById('to');
var toFull = document.getElementById('to_full');

if (toFull.value == 'All Students' || toFull.value== 'All Professors' || toFull.value == 'All Your Students' || toFull.value == 'All Users')
{
return true;
}

else
{
if (to.value == '' )
{alert ('The \"to\" line contains an invalid name. Try typing the first three letters of the recipient\'s first or last name in the \"to\" field and then choosing from the drop-down menu.');return false;}
}
return true;

}

//This is for events, allows only person who set it to modify or delete it //

function checkAuth(username,group)
{
var one = document.getElementById('set_by');
var tgt = 'prof';
if (one.value !== username  && group !== tgt)
{alert('Sorry. Events can only be deleted or modified by the person who created them.');return false;}
else
{return true;}

}

function forceDate(item)
{

var date = document.getElementById(item);
if (date.value == '')
{alert('You must select a date.  Click on the calendar icon to select the date.');return false;}
return true;
}

function allWarn()
{
chooser = document.getElementById('group');
if (chooser.value == 'All Users')
{
alert ('This will send a message to every user on the system.  If this is not what you want to do, please select a different group.');
return false;


}


}

function newUserValidate()
{
if (document.getElementById('first_name').value == '')
{alert ('First Name is required.');return false;}

if (document.getElementById('last_name').value == '')
{alert ('Last Name is required.');return false;}

if (document.getElementById('email').value == '')
{alert ('Email is required.');return false;}

if (document.getElementById('class').value == '')
{alert ('You must select a User Type');return false;}

return true;


}

function valAcct()
{
    if (document.getElementById('first_name').value == '' || document.getElementById('last_name').value == '' || document.getElementById('email').value == '')
        {alert('One of the required fields is blank.  Please review the form and add the necessary information.');return false;}

    if (document.getElementById('password').value.length < 6)
        {alert('Your password must be at least six characters in length');return false;}

        return true;



}

function validatePhone(fld) {
    var error = "";
    var stripped = fld.value.replace(/[\(\)\.\-\ ]/g, '');

   if (fld.value == "") {
        alert("You didn't enter a phone number.\n");
        fld.style.background = 'Yellow';
    } else if (isNaN(parseInt(stripped))) {
        alert("The phone number contains illegal characters.\n");
        fld.style.background = 'Yellow';
    } else if (!(stripped.length == 10)) {
        alert("The phone number is the wrong length. Make sure you included an area code.\n");
        fld.style.background = 'Yellow';
    }

}


function trim(s)
{
  return s.replace(/^\s+|\s+$/, '');
}

function validateEmail(fld) {

    var tfld = trim(fld.value);                        // value of field with whitespace trimmed off
    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/ ;
    var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/ ;

    if (fld.value == "") {
        fld.style.background = 'Yellow';
        alert('You didn\'t enter an email address.\n');
    } else if (!emailFilter.test(tfld)) {              //test email for illegal characters
        fld.style.background = 'Yellow';
        alert('Please enter a valid email address.\n');fld.value='';
    } else if (fld.value.match(illegalChars)) {
        fld.style.background = 'Yellow';
        alert('The email address contains illegal characters.\n');
    } else {
        fld.style.background = 'White';
    }

}

function newCaseVal()
{

    if ($('fname').value == '')
{alert ('First Name is required.');$('fname').style.background = 'yellow';return false;}

    if ($('lname').value == '')
{alert ('Last Name is required.');$('lname').style.background = 'yellow';return false;}

    if ($('ssn').value !== '')
    {
        var stripped = $('ssn').value.replace(/[\(\)\.\-\ ]/g, '');
        if (isNaN(parseInt(stripped))) {
        alert("Social Security Numbers must contain numbers only.\n");
        $('ssn').style.background = 'Yellow';
        return false;
    }
        else if (!(stripped.length == 9)) {
        alert("This SSN appears to be invalid.  Please check it.\n");
        $('ssn').style.background = 'Yellow';
        return false;
        }
    }
    if($('DOB').value !== '')
    {
        var dob = $('DOB').value;
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        if (dob.charAt(2) !== '/' || dob.charAt(5) !== '/')
        {alert('DOB must be in the mm/dd/yyyy format');return false;}

        var parts = new Array();
        parts = dob.split('/');

        if (parseInt(parts[1]) > 31 || parseInt(parts[2] < 1))
        {alert('Day must be between 1 and 31');$('DOB').style.background = 'yellow';return false;}

        if (parts[2] >  year || parseInt(parts[2]) < 1899)
        {alert('Year must be between 1899 and ' + year);$('DOB').style.background = 'yellow';return false;}

        var okMonths = new Array("01","02","03","04","05","06","07","08","09","10","11","12");

        var checker = false;
        for(var i=0;i < okMonths.length;i++){
          if(parts[0] == okMonths[i]){
            checker = true;
            break;


          }
        }
            if (checker == false)
                {alert('Months must be in the mm format, e.g 01,02,03 etc.');$('DOB').style.background = 'yellow';return false;
                }

return true;
}

        return true;

}

//Validations for add document by url
function isUrl(url)
{

	if (url.indexOf('http:\/\/') == -1)
	{
		$('url').style.background='yellow';
		alert('URL must be a valid http link: \n http:\/\/example.com');
		return false;}
	else
	{return true;}


}
function isTitle(title)
{

	if (title == '')
	{
		$('title').style.background='yellow';
		alert('You must supply a title.');
		return false;}
	else
	{return true;}


}

function isAlphaNum(str)
{
	
	if (str.match(/^[a-zA-Z0-9_\s]+$/))
	{
		return true;
	}
	else
	{
		alert('Folder name may only contain letters,numbers,spaces, and underscores.');return false;
	}
	
	
}
