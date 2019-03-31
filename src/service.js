// base url to reach the API including the unique API key
const base_uri = 'https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca';
// define headers expected by the endpoint from provided source
const headers = {
  headers: {
    Accept: 'application/json+fhir'
  }
}

/* 
PRIVATE METHODS
----------------------------
These methods are not exposed to components to shield from
attempting to make direct contact to the API, but rather through
a series of exposed JS APIs
----------------------------

Accepts a supported endpoint object (a) and any additional query details (b),
wraps them in a valid endpoint link and shuffles call to generic async call to
process the query/request.
*/
function asyncGet(a, b = {}) {
  return asyncGetViaURL(
    `${base_uri}/${a}?${stringifyObjectAsUrlArgs(b)}`
  )
}
/*
Provides a templated manner to reach FHIR endpoints by either pre-constructing
an end point and passing that as a url, or by passing in a 'NEXT' url, required
to fetch additional results for pagination support.
*/
async function asyncGetViaURL( url ) {
  return await fetch(
    url,
    headers
  ).then(
    handleAsyncResponse
  ).catch(
    error => ({
      error
    })
  )
}
/*
generic response handler which will parse the response and convert the JSON to
an object literal to be otherwise handled by controller logic, or otherwise
throw some sort of error if the status was not a successful code.
*/
function handleAsyncResponse( response ){
  if( response.status === 200 ){
    return response.json();
  } else {
    throw 'Server returned an invalid response';
  }
}
/* 
Helper function which takes an object with any number of member properties
and creates out of them a concatenated string representation that is ready
to be appended to an endpoint within an API call.
*/
function stringifyObjectAsUrlArgs( objectToConvert = {} ) {
  return Object
    .keys(objectToConvert)
    .reduce(
      (
        accum = '', 
        key,
        index
      ) => (
        `${accum}${index ? '&' : ''}${key}=${objectToConvert[key]}`
      ),
      ''
    )
}


/* 
PUBLIC FUNCTIONS
-------------------------
API Functions for the app 
-------------------------

Search for a series of patients against a provided string representing
a fragment or whole match to a patient's name
*/
export function searchForPatients(byName) {
  return asyncGet(
    'Patient',
    { 
      name: byName,
      _count: 25
    }
  );
}
/*
Search for a given patient's relevant medical records given the
patient's unique ID as provided as a response to the initial patient query
*/
export function getHealthRecordsOfPatient(patientId) {
  return asyncGet(
    'Condition',
    { patient: patientId }
  );
}

export function getNextResultsPage( url ){
  return asyncGetViaURL ( url );
}