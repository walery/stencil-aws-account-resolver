let companyName = null;

module.exports.resolve = ({variableUtils}) => {
  if (companyName !== null) {
    return companyName;
  }

  companyName = new Promise(async (resolve, reject) => {
    try {
      const accountName = await variableUtils.resolveVariable('stencil(account):name');
      resolve(accountName.split('-')[0]);
    } catch (error) {
      reject(error);
    }
  });
  return companyName;
};

