let unit = null;

module.exports.resolve = ({variableUtils}) => {
  if (unit !== null) {
    return unit;
  }

  unit = new Promise(async (resolve, reject) => {
    try {
      const accountName = await variableUtils.resolveVariable('stencil(account):name');
      let accountUnit = accountName.split('-').slice(1).join('-');

      if (accountUnit === '') {
        accountUnit = 'master';
      }

      resolve(accountUnit);
    } catch (error) {
      reject(error);
    }
  });
  return unit;
};

