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
    
    // Path and name of xml file
    var language_path = 'languages.xml';
    
    // Name of attribute 
    var attribute_name = 'lang';
    
    // Name of cookie
    var cookie_name = 'site-language'; 
    
    // Number of days before cookie expires
    var cookie_expire = 7
    
    $.setLanguagePath = function setLanguagePath(path) {
        language_path = path;
    }
    
    $.setAttributeName = function setAttributeName(name) {
        attribute_name = name;
    }
    
    $.setCookieName = function setCookieName(name) {
        cookie_name = name;
    }
    
    $.setCookieExpire = function setCookieExpire(numDays) {
        cookie_expire = numDays
    }
    
    $.loadLanguage = function loadLanguage() {
        var language = $.cookie(cookie_name);
        if (language.length === 0) {
            language = 'ENG';
        }
        $.ajax({
            url: language_path,
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
        var language = $(this).attr(attribute_name);
        $.cookie(cookie_name, language, { expires: cookie_expire, path: '/' });
        $.ajax({
            url: language_path,
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
