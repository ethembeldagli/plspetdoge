     var doge = (function($){
                'use strict';
                var app = {
                    colors: [ "309", "3CC", "6F3", "3C3", "03F", "F0C", "C03", "FA4" ],
                    sizes: [ "64", "48", "36", "30", "28" ],
                    sayings: [
                        "wow",              "such hand",
                        "so touch",         "v nice pat",
                        "y u touch me",     "so soft",
                        "hi human",         "many pats",
                        "v fluffy",         "such sit",
                        "very friednly",    "o wow",
                        "go away",          "so fat",
                        "much reward",      "much loyalty",
                        "good doge",        "so scare",
                        "so hungrie",       "pls feed",
                        "Wow",              "treat pls",
                        "wof wof",          "Confuse"
                    ],
                    chinLevel: 190,
                    init: function(){
                        $(document).on("mousedown touchstart", "#doge", function(e){
                            app.moveHand(e);
                            app.say();
                            if (app.getYpos(e) > app.chinLevel) {
                                $(this).addClass("up");
                                $("#hand").addClass("down");
                            } else {
                                $(this).addClass("down");
                                $("#hand").addClass("up");
                            }
                        }).on("mouseup touchend", "#doge", function(){
                            $(this).removeClass("up down");
                            $("#hand").removeClass("up down");
                        });
                        $(document).on("mousemove touchmove", "#doge", function(e){
                            app.moveHand(e);
                            var ypos = app.getYpos(e);
                            if ($(this).hasClass("down")) {
                                if (ypos > app.chinLevel) {
                                    app.say();
                                    $(this).removeClass("down").addClass("up");
                                    $("#hand").removeClass("up").addClass("down");
                                }
                            } else if ($(this).hasClass("up")) {
                                if (ypos <= app.chinLevel) {
                                    app.say();
                                    $(this).removeClass("up").addClass("down");
                                    $("#hand").removeClass("down").addClass("up");
                                }
                            }
                        });
                        window.addEventListener("touchmove", function(event) {
                            if ($(event.target).attr("id") == "doge") {
                                event.preventDefault();
                            }
                        }, false);
                    },
                    getXpos: function(e){
                        var xpos = e.originalEvent.pageX - $(e.target).offset().left;
                        return xpos;
                    },
                    getYpos: function(e){
                        var ypos = e.originalEvent.pageY - $(e.target).offset().top;
                        if ('ontouchstart' in window || 'onmsgesturechange' in window) {
                            ypos -= 75;
                        }
                        return ypos;
                    },
                    moveHand: function(e){
                        var t, l;
                        t = app.getYpos(e) - ($("#hand").height()/2);
                        l = app.getXpos(e) - ($("#hand").width()/2);
                        $("#hand").css({
                            top: t + "px",
                            left: l + "px"
                        });
                    },
                    say: function(){
                        var num, cnum, snum, d, timestamp, t, l;
                        num = Math.floor( ( Math.random() * app.sayings.length-1 ) + 1 );
                        cnum = Math.floor( ( Math.random() * app.colors.length-1 ) + 1 );
                        snum = Math.floor( ( Math.random() * app.sizes.length-1 ) + 1 );
                        d = new Date();
                        timestamp = d.getTime();
                        t = Math.floor( ( Math.random() * ($(window).height()-100) ) + 1 );
                        l = Math.floor( ( Math.random() * ($(window).width()-100) ) + 1 );
                        $("<p>").addClass("saying " + timestamp).html(app.sayings[num]).appendTo($("body")).css({
                            top: t + "px",
                            left: l + "px",
                            color: "#" + app.colors[cnum],
                            fontSize: app.sizes[snum] + "px"
                        });
                        window.setTimeout(function(){
                            $("p.saying."+timestamp).remove();
                        }, 1000);
                    }
                }
                $(function(){
                    app.init();
                });
                return app;
            }(jQuery));
