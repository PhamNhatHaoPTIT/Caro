export const  addToLocalStorageObject = function (name, key, value) {

	// Get the existing data
	var existing = localStorage.getItem(name);

	// If no existing data, create an array
	// Otherwise, convert the localStorage string to an array
	existing = existing ? JSON.parse(existing) : {};

	// Add new data to localStorage Array
	existing[key] = value;

	// Save back to localStorage
	localStorage.setItem(name, JSON.stringify(existing));

};