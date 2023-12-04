import got from 'got'
// Call web service and return count user, (got is library to call url)
async function getCountUsers() {
	try {
		const response = await got.get('https://my-webservice.moveecar.com/users/count')
		return { total: response.body }
	} catch (e) {
		if (e instanceof Error) {
			console.error('Error fetching total users: ', e.message)
			throw e
		}
		console.error('Unknown error while fetching total users: ', e)
	}
}

// Add total from service with 20
async function computeResult() {
	const result = await getCountUsers();
	return result.total + 20;
}

// IN THE EXAMPLE CODE, WE WERE DIRECTLY RETURNING THE RESPONSE OF THE PROMISE FROM THE GOT LIBRARY. HOWEVER, THE CONTENT WE ARE INTERESTED IN FROM THE RESPONSE SHOULD BE FOUND IN THE BODY (RESPONSE.BODY).

// IN ADDITION, WE ADDED A TRY/CATCH TO HANDLE POSSIBLE ERRORS THAT MAY OCCUR. I ADDED AN ASSERTION TO VERIFY THAT WHAT I RECEIVE IN THE CATCH IS AN INSTANCE OF ERROR, I DISPLAY IT ON THE CONSOLE, AND THROW IT.

// IN THE FUNCTION CALL, WE WERE MISSING THE AWAIT TO WAIT FOR THE RESOLUTION OF THE PROMISE FROM THE GETCOUNTUSERS FUNCTION. OTHERWISE, RESULT WOULD NOT CONTAIN THE VALUE OF USERS, BUT THE PROMISE ITSELF, AND THUS RESULT.TOTAL WOULD BE UNDEFINED, RESULTING IN NAN (UNDEFINED + 20).
