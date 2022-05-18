let accountDomain = null;

module.exports.resolve = ({variableUtils}) => {
  if (accountDomain !== null) {
    return accountDomain;
  }

  accountDomain = new Promise(async (resolve, reject) => {
    try {
      // TODO resolve in parallel
      const accountUnit = await variableUtils.resolveVariable('stencil(account):unit');
      const companyDomain = await variableUtils.resolveVariable('stencil(account):companyDomain');

      resolve(`${accountUnit}.${companyDomain}`);
    } catch (error) {
      reject(error);
    }
  });
  return accountDomain;
};
