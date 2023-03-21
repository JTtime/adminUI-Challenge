Keep Following assumptions in Mind before reading the code

1) User interface should be intact and should be treated as priority and then user Experience should be given priority. as and when user inconvenience is spotted, new feature additon should happen to web app while making sure that user interface should not crash
2) Data and FilteredData are two different entities and both will be updated in CRUD operation
3) Array Index is the localised property and should not be used to refer outside the loop. ID is unique to each element so use ID to access element by element.
4) While accessing element by ID inside iteration loop, remember that ID starts from 1 and Array Index starts from zero. so, in few places, index number is accessed as (id - 1) inside the loop
5) 