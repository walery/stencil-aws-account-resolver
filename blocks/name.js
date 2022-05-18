let name = null;

module.exports.resolve = ({variableUtils, slsHelper}) => {
  if (name !== null) {
    return name;
  }

  name = new Promise(async (resolve, reject) => {
    try {
      const accountId = await variableUtils.resolveVariable('stencil(account):id');
      const {Account} = await slsHelper.sendAwsRequest('Organizations', 'describeAccount', {AccountId: accountId});
      resolve(Account.Name);
    } catch (error) {
      reject(error);
    }
  });
  return name;
};
