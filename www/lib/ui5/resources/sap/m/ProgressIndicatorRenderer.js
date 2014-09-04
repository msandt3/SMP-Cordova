/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.ProgressIndicatorRenderer");sap.m.ProgressIndicatorRenderer={};
sap.m.ProgressIndicatorRenderer.render=function(r,c){if(!c.getVisible()){return}var w=c.getPercentValue();var W=c.getWidth();var t=c.getDisplayValue();var s=c.getShowValue();var b=c.getBarColor();r.write("<div");r.writeControlData(c);r.addClass("sapMPI");if(w>50){r.addClass("sapMPIValueGreaterHalf")}r.writeAttribute("style","width:"+W);if(c.getEnabled()){r.writeAttribute('tabIndex','0')}else{r.addClass("sapMPIBarDisabled")}r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMPIBar");switch(b){case"CRITICAL":r.addClass("sapMPIBarCritical");break;case"NEGATIVE":r.addClass("sapMPIBarNegative");break;case"POSITIVE":r.addClass("sapMPIBarPositive");break;case"NEUTRAL":r.addClass("sapMPIBarNeutral");break;default:r.addClass("sapMPIBarNeutral");break}r.writeClasses();r.writeAttribute("id",c.getId()+"-bar");r.writeAttribute("style","width:"+w+"%");r.write(">");r.write("<span class='sapMPIText sapMPITextLeft' id='"+c.getId()+"-textLeft'>");if(s){r.writeEscaped(t)}r.write("</span>");r.write("</div>");r.write("<span class='sapMPIText sapMPITextRight' id='"+c.getId()+"-textRight'>");if(s){r.writeEscaped(t)}r.write("</span>");r.write("</div>")};
