// random function returns an integer from "fromInt" to "toInt"
function rand(fromInt, toInt) {
    var range = toInt - fromInt + 1;
    return parseInt(Math.random() * range + fromInt);
}
$(document).ready(function() {
    var lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec maximus sapien, vel molestie erat. Nullam non sodales sapien. Praesent sit amet accumsan quam, vitae pulvinar sapien. Cras non leo sapien. Curabitur mollis tortor non cursus vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat purus eget lacus convallis, sit amet vulputate felis dignissim. Praesent sed tortor tellus. Sed id auctor arcu, sit amet fermentum neque. Nulla at odio eget tortor euismod cursus. Sed lacinia arcu eu est malesuada, eget venenatis metus luctus. Vestibulum bibendum massa non blandit tempor. Proin justo odio, vestibulum sed est nec, placerat facilisis diam. Sed hendrerit tincidunt faucibus. Donec at bibendum ligula, eget interdum dui. Nullam ultricies urna eu pretium egestas. Fusce vel scelerisque orci. Mauris vitae vehicula elit. Donec tempus neque ut elit cursus, at ullamcorper enim convallis. Sed sed libero blandit, malesuada purus nec, commodo sem. Mauris eleifend velit quis ex rutrum dictum. Aenean in odio rhoncus ante ornare consequat. Nullam eu iaculis ipsum. Sed molestie sem quis elit molestie suscipit. Maecenas fringilla, tellus eu efficitur suscipit, eros neque placerat neque, sed pulvinar elit nibh vel nisl. Nam dictum leo at maximus malesuada. Donec gravida lacus ac molestie venenatis. Donec congue non dolor eu sollicitudin. In id rutrum leo, ut cursus est. Proin nulla mi, molestie a malesuada quis, accumsan eget leo. Suspendisse luctus lectus a libero consequat, ac tincidunt erat efficitur. Morbi rutrum vehicula urna, vel imperdiet arcu dapibus eget. Donec sed est turpis. Nulla efficitur sit amet nulla sit amet imperdiet. Sed porta orci vel urna porttitor, a interdum ante commodo. Etiam eu sem dapibus, ultrices libero vitae, ultrices nisi. Cras sit amet sem et justo sodales gravida. Aenean ac nisi ac tortor viverra lobortis. Ut feugiat ac odio eget pulvinar. Vivamus congue justo eu justo accumsan mollis. Morbi convallis dapibus maximus. Fusce sollicitudin consequat posuere. Fusce posuere turpis vel augue bibendum suscipit. Nunc pulvinar ipsum vitae leo ornare, eget tincidunt nibh ornare. Sed mattis aliquet ipsum sit amet laoreet. Donec porta sodales risus eu euismod. Aliquam eros metus, aliquam sed pretium id, congue dictum sem. Donec in massa mauris. Curabitur consequat egestas leo semper ornare. Etiam bibendum neque quis quam imperdiet efficitur. Vestibulum sed odio eros. Nunc maximus dignissim dui et rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse finibus porttitor ligula et malesuada. Nullam enim leo, vehicula in eleifend ac, tempus quis neque. Nunc a turpis cursus, sagittis erat non, porta purus. Vestibulum nibh urna, vulputate quis magna vel, facilisis consectetur arcu. Duis eget tellus commodo, tincidunt diam sed, aliquam justo.';
    var words = lipsum.split(' ');
    var len = words.length;
    var half = parseInt(len / 2);
    var $content = $('div.content');
    var $hidden = $('div.hidden');
    var fonts = ['"Times New Roman", Times, serif', 'Arial, Helvetica, sans-serif', '"Comic Sans MS", cursive, sans-serif', 'Impact, Charcoal, sans-serif', '"Courier New", Courier, monospace'];
    $content.each(function() {
        var $this = $(this);
        var w = rand(200, 500);
        var h = rand(100, 500);
        var fs = rand(5, 50) + 'px';
        var font = rand(0, 4);
        var fontName = fonts[font];
        /*
        w = 200; // DEBUG
        h = 550; // DEBUG
        fs = '40px'; // DEBUG
        fontName = 'Impact, Charcoal, sans-serif'; // DEBUG
        */
        $this.width(w);
        $this.height(h);
        $this.css({'font-size': fs});
        $this.css({'font-family': fontName});
    });
    $content.each(function() {
        var $this = $(this);
        var initWidth = $this.innerWidth();
        var initHeight = $this.innerHeight();
        var fontSize = $this.css('font-size');
        var fontFamily = $this.css('font-family');
        var start = rand(0, half - 5);
        var end = rand(half + 5, len - 1);
        /*
        start = 0; // DEBUG
        end = len - 1; // DEBUG
        */
        var sub = words.slice(start, end); // get a slice of words array
        var text = sub.join(' ');
        var min = 0;
        var max = sub.length - 1;
        $hidden.innerWidth(initWidth); // the hidden div is given a fixed width but not height, so it can change its height based on the text
        $hidden.css({'font-size': fontSize}); // set to same font-size as target div
        $hidden.css({'font-family': fontFamily}); // set to same font-family as target div
        var ellipsis = false;
        while (min <= max) {
            var mid = (min + max) >> 1;
            var subSub = sub.slice(0, mid);
            var subText = subSub.join(' ') + ' ...'; // include the ellipsis in the height test
            $hidden.text(subText);
            var newHeight = $hidden.innerHeight();
            console.log(initHeight, newHeight, subText);
            if (newHeight > initHeight) {
                max = mid - 1;
                ellipsis = true; // text will be cropped and needs an ellipsis
            } else {
                min = mid + 1;
                var newText = subText; // keep the last sentence that fit
            }
        }
        if (ellipsis) {
            $this.text(newText);
        } else {
            $this.text(text); // if not ellipsis needed, use the original text
        }
        
    });
});
