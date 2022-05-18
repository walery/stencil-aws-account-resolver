let id = null;

module.exports.resolve = ({slsHelper}) => {
  if (id !== null) {
    return id;
  }

  id = new Promise(async (resolve, reject) => {
    try {
      const {Account} = await slsHelper.sendAwsRequest('STS', 'getCallerIdentity');
      resolve(Account);
    } catch (error) {
      reject(error);
    }
  });
  return id;
};
