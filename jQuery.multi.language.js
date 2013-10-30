/*!
 * jQuery Multi Language v1.0.0
 * https://github.com/K-Software/jquery-multi-language
 *
 * Copyright 2013 Simone Cappabianca - K-Software
 * Released under the MIT license
 */
 (function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function($) {
   
    $.loadLanguage = function loadLanguage() {
        var language = $.cookie('site-language');
        if (language.length == 0) {
            language = 'ENG';
        }
        $.ajax({
            url: 'languages.xml',
            success: function(xml) {
                $(xml).find('translation').each(function(){
                    var id = $(this).attr('id');
                    var text = $(this).find(language).text();
                    $("." + id).html(text);
                });
            }
        });
    }
    
    $.changeLanguage = function changeLanguage() {
        var language = $(this).attr('lang');
        $.cookie('site-language', language, { expires: 7, path: '/' });
        $.ajax({
            url: 'languages.xml',
            success: function(xml) {
                $(xml).find('translation').each(function(){
                    var id = $(this).attr('id');
                    var text = $(this).find(language).text();
                    $("." + id).html(text);
                });
            }
        });
    }
    
}));
