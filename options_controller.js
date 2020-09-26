// var studentDistributionFiles = [];


// Saves options to chrome.storage
function saveOptions() {
	var semesterSeason = document.getElementById('semester_season').value;
	var year = document.getElementById('year').value;
	// var projectDistribution = document.getElementById('project_distribution').value;
	var submitServerProjectName = document.getElementById('submit_server_project_name').value;
	
	var filesToCheck = document.getElementById('files_to_check').value.split(/\s*,\s*/);
	var ignoredNames = document.getElementById('names_to_ignore').value.split(/\s*,\s*/);

	chrome.storage.sync.set({
		semesterSeason: semesterSeason,
		year: year,
		// studentDistributionFiles: studentDistributionFiles,
		submitServerProjectName: submitServerProjectName,
		filesToCheck: filesToCheck,
		ignoredNames: ignoredNames
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

function compileLoadedFileDescription(){
	loadedFileDescription = "";
	for(const item of studentDistributionFiles){
		loadedFileDescription += (item.name + ",");
	}
	loadedFileDescription = loadedFileDescription.substring(0,loadedFileDescription.length -1);
	return loadedFileDescription;
}

// Restores options based on values stored in chrome.storage.
function restoreOptionsLocal() {
	restoreOptions(
		function(items) {
			document.getElementById('semester_season').value = items.semesterSeason;
			document.getElementById('year').value = items.year;
			// studentDistributionFiles = items.studentDistributionFiles;
			// $("#loaded_files")[0].value = compileLoadedFileDescription();
			document.getElementById('submit_server_project_name').value = items.submitServerProjectName;
			document.getElementById('files_to_check').value = items.filesToCheck.join(", ");
			document.getElementById('names_to_ignore').value = items.ignoredNames.join(", ");
		}
	);
}

document.addEventListener('DOMContentLoaded', restoreOptionsLocal);
document.getElementById('save').addEventListener('click', saveOptions);

// $('#project_distribution').change( function(event) {
// 	studentDistributionFiles = [];
// 	for (const file of event.target.files){
// 		url = URL.createObjectURL(file);
// 		studentDistributionFiles.push({'url':url, 'name':file.name});
// 	}
// 	$("#loaded_files")[0].value = compileLoadedFileDescription();
// });