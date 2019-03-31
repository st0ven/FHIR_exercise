import moment from 'moment';

/* Given a name as a string, will return a capitalized version of the name */
function capitalizeName( nameString ) {
  return nameString
    .charAt(0)
    .toUpperCase()
    .concat(
      nameString
        .toLowerCase()
        .slice(1)
    );
}
/* Takes a name object from an API response and returns a string version of the patient's first name */
export function extractFirstName( nameObject = [] ){
  const patientName = nameObject[0] || {};
  const givenName = ( patientName.given instanceof Array )
    ? patientName.given[0].split()[0]
    : '';
  return givenName;
}
/* Takes a name object from an API response and returns a string version of the patient's last name*/
export function extractLastName( nameObject = [] ){
  const patientName = nameObject[0] || {};
  const lastName = ( patientName.family instanceof Array )
    ? patientName.family[0]
    : patientName.family;
  return lastName;
}
/* Takes a name object from an API response and returns a string version of the patient's combined middle name*/
export function extractMiddleName( nameObject = [] ){
  const patientName = nameObject[0] || {};
  const middleName = ( patientName.given instanceof Array )
    ? patientName.given.slice(1).join(' ')
    : ''
  return middleName;
}
/* transforms an item in the API response, provided as an object with a set schema,
return a set of table-supported schema to represent the patient */
export function populatePatientListTableData( item = {} ) {
  return {
    age: (
      item.resource.birthDate
        ? new Date().getFullYear() - item.resource.birthDate.split('-')[0]
        : 'unknown'
    ),
    gender: item.resource.gender,
    resourceId: item.resource.id,
    family: capitalizeName(
      extractLastName( item.resource.name )
    ),
    given: capitalizeName(
      extractFirstName( item.resource.name ).toLowerCase()
    ),
    'middle name': capitalizeName(
      extractMiddleName( item.resource.name ).toLowerCase()
    )
  }
}
/* transforms an item in the API response, provided as an object with a set schema,
returns a set of table-supported schema to represent a patient record in the list*/
export function populatePatientRecordsTableData( item = {} ){
  return {
    resourceId: item.resource.id,
    onset: moment(item.resource.onsetDateTime).format('LLL') || 'unknown',
    condition: {
      link: `https://www.ncbi.nlm.nih.gov/pubmed/?term=${item.resource.code.text}`,
      value: item.resource.code.text
    },
    notes: item.resource.notes || ''
  }
}