$(function(){
    //Device Info
    $('.ebTable-contentColumn').click(function(){
        $('.elLayouts-Wrapper').addClass('elLayouts-Wrapper-showInfo');
        $('.elLayouts-deviceInfo').addClass('elLayouts-deviceInfo-show');
    });
    $('.ebLayout-HeadingCommands').click(function(){
        $('.elLayouts-Wrapper').removeClass('elLayouts-Wrapper-showInfo');
        $('.elLayouts-deviceInfo').removeClass('elLayouts-deviceInfo-show');
    });

    //Table
    $('.ebTableRow').click(function(){
        $(this).addClass('ebTableRow_highlighted').siblings(".ebTableRow").removeClass('ebTableRow_highlighted');
    });
 });