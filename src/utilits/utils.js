export const compose = ([...funcs], anyData) => funcs.reduceRight((memo, fns) => fns(memo), anyData);
  
export const filterAge = (ageStart, ageEnd) => usersArray  => {
  return usersArray.filter(person => {
    return person.age >= ageStart && person.age <= ageEnd;
      })
  };

export const filterGender = gender => usersArray  => {
  return usersArray.filter(person => {
    return (gender === "male" || gender === "female") ? person.gender === gender : person.gender;
      })
  };

export const filterName = name => usersArray  => {
  const str = name.toUpperCase();
  return usersArray.filter(name => {
    name = name.name.toUpperCase();
      let surname = " " + str;
      return (name.indexOf(str) === 0) || (name.indexOf(surname) !== -1 );
  })
};

export const filterWorkFor = company => usersArray  => {
  const str = company.toUpperCase();
    return usersArray.filter(name => {
      name = name.company.toUpperCase();
      return (name.indexOf(str) === 0);
  })
};