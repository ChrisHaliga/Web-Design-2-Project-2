onresize="myFunction()"
{
	size = (get($("body"),"width") - get($("#background"),"width"))
}
function soundHandler()
{
	$("#playButtonIcon").toggleClass("fas fa-play");
	$("#playButtonIcon").toggleClass("fas fa-pause");
	
	var music = $("audio#music")[0];
	if(music.paused)
		music.play();
	else
		music.pause();
}

function musicChoice(choice)
{
	if(!$("audio#music")[0].paused)
		soundHandler();
	song_name = $("#playlist li").eq(choice).text();
	$("#music").attr("src", "music/" + song_name.replace(":","").replace(" ","_") + ".mp3");
	$("#playlist li").eq(choice).text($("#now_playing").text().replace("ASIAN KUNG-FU GENERATION - ",""));
	$("#now_playing").text("ASIAN KUNG-FU GENERATION - " + song_name);

	for (var i = choice; i < $("#playlist li").length-1; i++) {
		tmp = $("#playlist li").eq(i).text();
		$("#playlist li").eq(i).text($("#playlist li").eq(i+1).text());
		$("#playlist li").eq(i+1).text(tmp);
	}

}

$("audio#music")[0].onended = function() {
    musicChoice(0);
    $("audio#music")[0].pause();
    $("#playButtonIcon").toggleClass("fas fa-play");
	$("#playButtonIcon").toggleClass("fas fa-pause");
    soundHandler();
};

function get(element,property)
{
	return parseInt(element.css(property).replace("px", ""));
}

function change(element, property, modifier = 0)
{
	new_val = get(element, property) + modifier + "px";
	element.css(property, new_val);
}

function pauseNavs()
{
	$('.nav').prop('disabled', true);
	$(".nav").toggleClass("paused");
	setTimeout(() => {
		$('.nav').prop('disabled', false);
		$(".nav").toggleClass("paused");
	}, 2000);
}

function pageHandler(dir)
{
	$("#soundBar").toggleClass("right");
	$("#soundBar").toggleClass("left");
	$("#background").toggleClass("right");
	$("#background").toggleClass("left");

	// discography = -1, info = 2 
	if(dir == 1)
	{
		change($("#home"), "left", -size);
		change($("#disc"), "left", -size);
		setTimeout(() => {$('#content_disc').css("display", "inline-block");}, 2000);
		pauseNavs();
	}
	else if(dir == 2)
	{
		change($("#home"), "left", -size);
		change($("#info"), "left", -size);
		setTimeout(() => {$('#content_info').css("display", "inline-block");}, 2000);
		pauseNavs();
	}
	else if(dir == -1)
	{
		change($("#home"), "left", size);
		change($("#disc"), "left", size);
		$('#content_disc').css("display", "none");
		pauseNavs();
	}
	else if(dir == -2)
	{
		change($("#home"), "left", size);
		change($("#info"), "left", size);
		$('#content_info').css("display", "none");
		pauseNavs();
	}
}