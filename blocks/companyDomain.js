let companyDomain = null;

module.exports.resolve = ({variableUtils}) => {
  if (companyDomain !== null) {
    return companyDomain;
  }

  companyDomain = new Promise((resolve, reject) => {
    const companyName = variableUtils.resolveVariable('stencil(account):companyName');
    const companyTld = variableUtils.resolveVariable('stencil(account):companyTld');

    Promise.all([companyName, companyTld])
      .then(values => {
        resolve(`${values[0]}.${values[1]}`);
      })
      .catch(error => {
        reject(error);
      });
  });
  return companyDomain;
};

