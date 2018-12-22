const base_uri = 'https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca';
/* 
  Our app connects to a single source for a select number of GET requests.
  All that should be required is a base function that can asyncronously
  handle each endpoint, of which have a flat structure.
*/
async function asyncGet(a, b = {}) {
  // define headers expected by the endpoint from provided source
  const headers = {
    headers: {
      Accept: 'application/json+fhir'
    }
  }
  return await fetch(
    `${base_uri}/${a}?${stringifyObjectAsUrlArgs(b)}`,
    headers
  ).then(
    response => {
      if( response.status === 200 ){
        return response.json();
      } else {
        throw 'Server returned an invalid response';
      }
    }
  ).catch(
    error => error
  )
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


/* API Functions for the app */
/*****************************/

export function searchPatients(byName) {
  return asyncGet(
    'Patient',
    { 
      name: byName,
      _count: 25
    }
  );
}

export function getHealthRecordsOfPatient(patientId) {
  return asyncGet(
    'Condition',
    { patient: patientId }
  );
}