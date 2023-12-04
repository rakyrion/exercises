import got from 'got'

// Call web service and return total vehicles, (got is library to call url)

// WE COULD ADD THE TRY/CATCH AND DIRECTLY RETURN THE BODY AS IN EXERCISE 1, BUT I KEEP IT THIS WAY TO KEEP IT AS SIMPLE AS POSSIBLE BASED ON THE EXERCISE.
async function getTotalVehicles() {
	return await got.get('https://my-webservice.moveecar.com/vehicles/total');
}

// THE CODE PROVIDED ON EXERCISE WILL EXECUTE THE IF STATEMENTS AND RETURN THE VALUE BEFORE THE PROMISE GETTOTALVEHICLES IS RESOLVED, SO "TOTAL" WILL BE UNDEFINED. WE HAVE 2 WAYS TO SOLVE THIS: EITHER PLACE THE CODE INSIDE THE .THEN CALLBACK, OR USE ASYNC/AWAIT.

// ALSO, THE VALUE OF THE RESPONSE SHOULD BE FOUND IN THE BODY (r.body).

async function getPlurial() {
	let total;
	const result = getTotalVehicles().then(r => {
		total = r.body

		if (total <= 0) {
			return 'none';
		}
		if (total <= 10) {
			return 'few';
		}
		return 'many';
	});

	return result

}

// IF WE PREFER TO USE ASYNC/AWAIT, THE CODE WOULD BE:

async function getPlurial2() {
	let total;
	const response = await getTotalVehicles()

	total = response.body

	if (total <= 0) {
		return 'none';
	}
	if (total <= 10) {
		return 'few';
	}
	return 'many';
}
