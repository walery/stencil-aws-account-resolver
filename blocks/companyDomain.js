let companyDomain = null;

module.exports.resolve = ({variableUtils}) => {
  if (companyDomain !== null) {
    return companyDomain;
  }

  companyDomain = new Promise(async (resolve, reject) => {
    try {
      // TODO resolve in parallel
      const companyName = await variableUtils.resolveVariable('stencil(account):companyName');
      const companyTld = await variableUtils.resolveVariable('stencil(account):companyTld');

      resolve(`${companyName}.${companyTld}`);
    } catch (error) {
      reject(error);
    }
  });
  return companyDomain;
};

