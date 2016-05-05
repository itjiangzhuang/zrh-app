function isNullOrEmpty(strVal) {
	if ($.trim(strVal) == '' || strVal == null || strVal == undefined) {
	   return true;
	} else {
	   return false;
	}
}