function checkrequired(which) {
	var pass = true;
	
	if (document.images) {		
		for (i = 0; i < which.length; i++) {		
			var tempobj = which.elements[i];
			if (tempobj.name.substring(0,8) === "required") {		
				if (((tempobj.type === "text" || tempobj.type=="textarea") && tempobj.value === '') || (tempobj.type.toString().charAt(0) === "s" && tempobj.selectedIndex === -1)) {
					pass = false;
					break;
				}
			}
		}
	}

	if (!pass)	{
		alert("Tous les champs de ce formulaire sont obligatoires, merci de bien vouloir les renseigner");
		return false;

	} else {
		ajaxPost(which);
	}
}