// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
	//get form values 
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	/*
	//Local Storage Test
	localStorage.setItem('test', 'Hello World'); // stores it on clients machine
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/

	//Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		//Init array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);
		//set to LocalSotrage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // stringify transforms JSON objects into string
	} else {
		//Get bookmarks from LocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(bookmark);
		//re-set back to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//clear form
	document.getElementById('myForm').reset();

	//fetch bookmarks
	fetchBookmarks();

	//Prevent form from submitting
	e.preventDefault(); 
}

//Delete bookmark
function deleteBookmark(url, event){
	//Get bookmarks from LocalStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//Loop throught bookmarks
	for(var i=0; i < bookmarks.length;i++){
		if(bookmarks[i].url == url){
			//remove from array
			bookmarks.splice(i,1);
		}
	}
	//re-set back to LocalStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//fetch bookmarks
	fetchBookmarks();


	event.preventDefault();
}
//Fetch bookmarks
function fetchBookmarks(){
	//Get bookmarks from LocalStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//get ouput id
	var bookmarksResults = document.getElementById("bookmarksResults");

	//build output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length;i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		bookmarksResults.innerHTML += '<div class="card card-body bg-light">'+
										'<h3>' + name+
										' <a class="btn btn-secondary" target="_blank" href="'+url+'">Visit</a>'+
										' <a onclick="deleteBookmark(\''+url+'\', event)" class="btn btn-danger" href="#">Delete</a>'+
										'</h3>'+
										'</div>'+
										'</br>';
	}

}

//validate Form
function validateForm(siteName, siteUrl){
	if(!siteUrl || !siteName){
		alert('Please set the form');
		return false;
	} 

	var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}

	return true;
}