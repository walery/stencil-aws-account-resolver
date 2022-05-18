let alias = null;

module.exports.resolve = ({slsHelper}) => {
  if (alias !== null) {
    return alias;
  }

  alias = new Promise(async (resolve, reject) => {
    try {
      const {AccountAliases} = await slsHelper.sendAwsRequest('IAM', 'listAccountAliases');
      resolve(AccountAliases[0]);
    } catch (error) {
      reject(error);
    }
  });
  return alias;
};
