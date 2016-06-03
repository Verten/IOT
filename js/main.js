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
			 	
			 	//Select
			 	$('.ebDropdown-header').click(function(){
			 	    $(this).next('.ebComponentList').css('display','block');
			 	});
			 	
			 	//Add Custom Attribute
			 	$('.addAttributesButton').click(function(){
			 		
			 	    $(this).next('.elLayouts-addAttributes').slideDown(300);
			 	    $('.addAttributesButton').hide();
			 	    
			 	});
			 	
			 	//Display Custom Attribute
			 	$('.ebLayout-SectionCustomAttributes .ebLayout-SectionTitle').click(function(){
			 		
			 	    $(this).next('.ebLayout-formSection').slideToggle(300);
			 	    $(this).children(".ebIcon").toggleClass('ebIcon_upArrow_10px');
			 	    
			 	});
			 	
			 	//Add a thing tab
			 	$('.addThingLink').click(function(){
			 		$(this).parent().parent().addClass('eaContainer-addThingSectionPressed').siblings(".eaContainer-addThingSection").removeClass('eaContainer-addThingSectionPressed');	 	    
			 	});
			 	$('.createDeviceTypeLink').click(function(){
			 		$('.addDeviceTypeSection').addClass('eaContainer-addThingSectionPressed').siblings(".eaContainer-addThingSection").removeClass('eaContainer-addThingSectionPressed');	 	    
			 	});
			 })