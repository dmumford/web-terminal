// wait for DOM to be ready
$( document ).ready(function() {

    const terminal_version = "1.0";

    var commands = [
        ["clear", "clears the terminal window"],
        ["default", "resets terminal style to default setting"],
        ["help", "shows a list of commands"],
        ["invert", "inverts the terminal's background and text colors"],
        ["large", "sets terminal font size to large"],
        ["huge", "sets terminal font size to huge"],
        ["ip", "shows user's ip address"],
        ["tiny", "sets terminal font size to tiny"],
        ["set name", "changes name from `user` to specified name"],
        ["set password", "set a password for user"],
        ["small", "sets terminal font size to small"],
        ["version", "shows terminal version"]
    ];

    var using_password = false;

    var box = $('.console');
    var msg = $('#raw');
    var user_name = "user";

    var invert = false;

    // get ip address set in <script> tag
    var user_ip = document.querySelector("#terminal-script").getAttribute('ip');

    // gets client ip address


    // sanitise user input
    function sanitize(string) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return string.replace(reg, (match)=>(map[match]));
    }

    // reverses bg and text color
    function invertTerminal() {

        if ( invert === false ) {
            invert = true;
            $('*').css('backgroundColor', '#33FF33');
            $('*').css('color', 'black');
        }
        else {
            invert = false;
            $('*').css('backgroundColor', 'black');
            $('*').css('color', '#33FF33');
        }

    }

    // add user input to box on enter key press
    $(document).keypress(function(event){

        var keycode = (event.keyCode ? event.keyCode : event.which);

        if(keycode == '13') {

            message = "<br/>" + user_name + "> " + sanitize(msg.val()) + "<br/>";

            switch (sanitize(msg.val()).toLowerCase()) {

                case 'help':
                    box.append( message + "<br/>");
                    // loop through commands
                    for (var i in commands) {
                        // prints list of commands and descriptions
                        box.append( (commands[i][0]) + " >> " + (commands[i][1]) + "<br/>") ;
                    }
                    msg.val('');
                    break;

                case 'invert':
                    box.append( message );
                    invertTerminal();
                    msg.val('');
                    break;                    

                case 'clear':
                    box.html('');
                    msg.val('');
                    break;

                case 'version':
                    box.append( message );
                    box.append( "<br/>>>" + terminal_version + "<br/><br/>" );
                    msg.val('');
                    break;

                case 'small':
                    box.append( message ); 
                    msg.val('');
                    $('*').css("fontSize", "0.9em");
                    break;

                case 'large':
                    box.append( message ); 
                    msg.val('');
                    $('*').css("fontSize", "1.1em");
                    break;

                case 'tiny':
                    box.append(message);
                    msg.val('');
                    $('*').css("fontSize", "0.75em");
                    break;
                    
                case 'huge':
                    box.append(message);
                    msg.val('');
                    $('*').css("fontSize", "1.2em");
                    break;

                case 'default':
                    box.append( message ); 
                    msg.val('');
                    $('*').css("fontSize", "1em");
                    invert = true;
                    invertTerminal();
                    break;
                    
                case '':
                    box.append(message);
                    msg.val('');
                    break;
                    
                case 'ip':
                    box.append(message);
                    msg.val('');
                    box.append("<br/>>>" + user_name + "'s ip is " + user_ip + "<br/>");
                    break;                   

                // command not recognised
                default:
                    // check if set name has been called
                    if (sanitize(msg.val()).toLowerCase().startsWith("set name ")) {
                        var new_name = sanitize(msg.val()).toLowerCase().replace("set name ", "");
                        user_name = new_name;
                        box.append( message );
                        box.append("<br/>Terminal > new name `" + user_name + "` has been set<br/></br/>");
                        msg.val('');
                        return;
                    }
                    // check if password is being set
                    if (sanitize(msg.val()).toLowerCase().startsWith("set password ") && using_password === false) {
                        var new_password = sanitize(msg.val()).toLowerCase().replace("set password ", "");
                        user_password = new_password;
                        // password length
                        var password_length = user_password.length;
                        // replace password with * before outputting
                        box.append("set password " + "*".repeat(password_length) );
                        box.append("<br/>Terminal > new password `" + "*".repeat(password_length) + "` has been set<br/></br/>");
                        msg.val('');   
                        using_password = true;
                        return;                 
                    }
                    else {
                        // add sanitised string to box
                        box.append( message );
                        // output error message
                        box.append("<br/>>>\""+sanitize(msg.val()) + "\" is not a recognized command. Use `help` to view the list of commands. <br/>");
                        // clear user input
                        msg.val('');
                        return;
                    }
                    break;

            }


            // scroll to bottom of box
            document.querySelector('.console').scrollTop = document.querySelector('.console').scrollHeight;


        }

    });


});