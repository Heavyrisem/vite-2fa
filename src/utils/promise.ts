const wrapPromise = (promise: Promise<any>) => {
  let status = 'pending';
  let response: any;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      response = res;
    },
    (err) => {
      status = 'error';
      response = err;
    },
  );

  const read = () => {
    switch (status) {
      case 'pending':
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw suspender;
      case 'error':
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

export default wrapPromise;
