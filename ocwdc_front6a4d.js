jQuery(document).ready(function() {

    var loading;
    var results;
    var display;

    jQuery("#ocwdc-domain-form").on("submit", function() {
        var form = this;

        var gcapt_enable = ocwdc_options.ocwdc_google_captcha_enable;
        var gcapt_dmnempty = ocwdc_options.ocwdc_domain_empty_text;
        var gcapt_vrfycptcha = ocwdc_options.ocwdc_verfy_rcpcha_text;
        var gcapt_fntsize = ocwdc_options.ocwdc_srchreset_font_size;
        var gcapt_bgclr = ocwdc_options.ocwdc_domain_ext_req_bg_color;
        var gcapt_clr = ocwdc_options.ocwdc_domain_ext_req_color;

        if(jQuery("#ocwdc-domain").val() == "") {
            var display = '<div class="ocwdc-not-available" style="background-color: ' + gcapt_bgclr + ';"><p style="font-size: ' + gcapt_fntsize + '; color: ' + gcapt_clr + ';">' + gcapt_dmnempty + '</p></div>';
            jQuery("#ocwdc-results").html(display);
            return false;
        }

        if(gcapt_enable == 'enable' ) {
            var captchResponse = jQuery('#g-recaptcha-response').val();

            if(captchResponse == "" || captchResponse == undefined) {
                var display = '<div class="ocwdc-not-available" style="background-color: ' + gcapt_bgclr + ';"><p style="font-size: ' + gcapt_fntsize + '; color: ' + gcapt_clr + ';">' + gcapt_vrfycptcha + '</p></div>';
                jQuery("#ocwdc-results").html(display);
                return false;
            }
        }

        var domain = jQuery("#ocwdc-domain").val();
        domain = domain.replace("www.", "");
        domain = domain.replace("http://", "");
        domain = domain.replace("https://", "");
        domain = domain.replace(/[^-a-zA-Z0-9.]+/g, '-');

        jQuery("#ocwdc-domain").val(domain);

        if(jQuery("#ocwdc-domain-tld").length) {
        	var domain_tld = jQuery("#ocwdc-domain-tld").val();
        	domain = domain.replace(/[^-a-zA-Z0-9]+/g, '-');
		} else {
			var domain_tld = 'not_dropdown';
		}

		jQuery("#ocwdc-domain").val(domain);
        jQuery("#ocwdc-results").css('display','none');
        jQuery("#ocwdc-results").html('');
        jQuery("#ocwdc-loading").css('display','block');

        jQuery.ajax({
            url:ocwdc_ajax.ajaxurl,
            type:'POST',
            data:'action=ocwdc_display&domain=' + domain + '&domain_tld=' + domain_tld,
            success : function(response) {
                var x = JSON.parse(response);
                if(x.status == 1) {
                    var display = x.content;
                } else {
                    var display = "Error occured.";
                }

                jQuery("#ocwdc-results").css('display','block');
                jQuery("#ocwdc-loading").css('display','none');
                jQuery("#ocwdc-results").html(display);

                if(gcapt_enable == 'enable' ) {
                    grecaptcha.reset();
                }
            },
            error: function() {
                alert('Error occured');
            }
        });
        return false;
    });
});