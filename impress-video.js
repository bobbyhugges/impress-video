/*

*/

(function(document, $, undefined)
{
	'use strict';

	var isPlaying,
		video,
		impressObj = impress(),
		impressGoto = impressObj.goto;

	$(document).on('impress:stepenter', function(event,f)
	{
		var $currSlide = $(event.target);
		if(video)
		{
			video.pause();
		}
		video = $currSlide.find('video')[0];
		if(video)
		{
			video.play();
			if(isPlaying && $currSlide[0] != $currSlide.parent().children().last()[0])
			{
				video.addEventListener('ended',function() {
					impressObj.goto($currSlide.next());
					video.removeEventListener('ended');
				});
			}
			else
			{
				isPlaying = false;
			}
			
		}
	});

	impressObj.play = function()
	{
		isPlaying = true;
		this.goto(0);
	};

	impressObj.goto = function($el)
	{
		if(isNaN($el))
		{
			impressGoto($el.parent().children().index($el), $el.data('transition-duration'));
		}
		else
		{
			impressGoto($el);			
		}
	}


})(document, jQuery);
